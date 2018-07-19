window.AudioContext = window.webkitAudioContext || window.AudioContext;
var audioctx = new AudioContext();
var synthesizer;
var trailer;
var background;
var canvas1;
var canvas2;
var consonant;

class Noise
{
  constructor(ctx)
  {
    this.ctx = ctx;

    this.buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var data = this.buf.getChannelData(0);
    for (var i = 0; i < this.buf.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.osc = ctx.createBufferSource();
    this.osc.buffer = this.buf;
    this.osc.loop = true;

    this.init = false;
  }

  connect(dest)
  {
    this.osc.connect(dest);
  }

  start()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
  }

  play(time)
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    //this.gain.gain.value = 0.5;
    //setTimeout(() => { this.gain.gain.value = 0; }, time);
  }

};


const XYpad = 0;
const Button = 1;
const OtherUI = 2;

class Synthesizer
{
  constructor(element)
  {
    this.element = element;

    var f0 = 125;

    this.osc = audioctx.createOscillator();
    this.osc.frequency.value = f0;
    this.osc.type = "sawtooth";

    this.noise = new Noise(audioctx);

    this.voicedGain = audioctx.createGain();
    this.voicedGain.gain.value = 0.0001;

    // this.h_Gain = audioctx.createGain();
    // this.h_Gain.gain.value = 0.0001;

    this.F1 = audioctx.createBiquadFilter();
    this.F1.type = "bandpass";
    this.F1.frequency.value = 500;
    this.F1.Q.value = 10;

    this.F2 = audioctx.createBiquadFilter();
    this.F2.type = "bandpass";
    this.F2.frequency.value = 1500;
    this.F2.Q.value = 10;

    this.consonant = new FilterManager(audioctx, this.noise, this.F1, this.F2, audioctx.destination);

    // this.s_Filter = audioctx.createBiquadFilter();
    // this.s_Filter.type = "bandpass";
    // this.s_Filter.frequency.value = 8000;
    // this.s_Filter.Q.value = 8;

    // this.sh_Filter = audioctx.createBiquadFilter();
    // this.sh_Filter.type = "bandpass";
    // this.sh_Filter.frequency.value = 4000;
    // this.sh_Filter.Q.value = 12;

    // this.s_Gain = audioctx.createGain();
    // this.s_Gain.gain.value = 0.0001;

    // this.sh_Gain = audioctx.createGain();
    // this.sh_Gain.gain.value = 0.0001;


    // this.t_Filter = audioctx.createBiquadFilter();
    // this.t_Filter.type = "bandpass";
    // this.t_Filter.frequency.value = 3000;
    // this.t_Filter.Q.value = 8;

    // this.t_Gain = audioctx.createGain();
    // this.t_Gain.gain.value = 0.0001;



    //////////////////////////////////////////////////

    // this.noise.connect(this.s_Filter);
    // this.s_Filter.connect(this.s_Gain);
    // this.s_Gain.connect(audioctx.destination);

    // this.noise.connect(this.sh_Filter);
    // this.sh_Filter.connect(this.sh_Gain);
    // this.sh_Gain.connect(audioctx.destination);

    // this.noise.connect(this.t_Filter);
    // this.t_Filter.connect(this.t_Gain);
    // this.t_Gain.connect(audioctx.destination);



    // this.noise.connect(this.h_Gain);
    // this.h_Gain.connect(this.F1);
    // this.h_Gain.connect(this.F2);

    this.osc.connect(this.voicedGain);

    this.voicedGain.connect(this.F1);
    this.voicedGain.connect(this.F2);

    this.F1.connect(audioctx.destination);
    this.F2.connect(audioctx.destination);

    this.switch = false;
    this.index = 0;
    this.lastindex = 0;
    this.last_f1 = 0;
    this.last_f2 = 0;

    this.reserved_consonant = "";
  }

  play()
  {
    this.consonant.play();
    var t0 = audioctx.currentTime;
    this.voicedGain.gain.setValueAtTime(0, t0);
    this.voicedGain.gain.setTargetAtTime(0.8, t0 + 0.001, 0.02);
  }

  stop_vowel()
  {
    var t0 = audioctx.currentTime;
    this.voicedGain.gain.setTargetAtTime(0.0, t0 + 0.001, 0.02);    
  }


  setScale(scale)
  {
    this.scale = scale;

    //                    |
    //     ox             | oy
    //<----------->□□□□□□
    //          |  □□□□□□
    //     size |  □□□□□□
    //          |  □□□□□□
    //          |  □□□□□□
    //             <-------> --> UI
    //               size   size2
    //

    this.ox = 350 * this.scale;
    this.oy = 80 * this.scale;
    this.size = 300 * this.scale;
    this.size2 = 340 * this.scale;
  }

  set_event()
  {
    this.element.addEventListener('mousemove', ev =>
    {
      ev.preventDefault(); // Prevent Default Actions
      var rect = ev.target.getBoundingClientRect();
      var x = ev.clientX - rect.left - this.ox;
      var y = ev.clientY - rect.top - this.oy;
      if (x < 0)
      {
        x = 0;
      }
      else if (x > this.size)
      {
        x = this.size;
      }
      if (y < 0)
      {
        y = 0;
      }
      else if (y > this.size)
      {
        y = this.size;
      }
      this.F1.frequency.value = x / this.size * 1000;
      this.F2.frequency.value = (this.size - y) / this.size * 3000;
    });

    this.element.addEventListener('mousedown', ev =>
    {
      ev.preventDefault(); // Prevent Default Actions

      var ch = background.checkButton(ev.clientX, ev.clientY)
      console.log("pushed:[" + ch + "]");
      this.consonant.select(ch);

      // if (ch == " s") {
      //     this.play_s();
      //     return;
      // }
      // if (ch == "sh") {
      //     this.play_sh();
      //     return;
      // }

      if (!this.switch) {
        this.osc.start();
        this.noise.start();
        this.switch = true;
      }
      var rect = ev.target.getBoundingClientRect();
      var x = ev.clientX - rect.left - this.ox;
      var y = ev.clientY - rect.top - this.oy;
      if (x < 0) return;
      if (y < 0) return;
      if (x > this.size2) return;
      if (y > this.size2) return;


      setTimeout(() => {
        //this.stop_consonant();
        this.play();
      }, 100);
      //setTimeout(() => { this.voicedGain.gain.value = 1;}, 200);
    });

    this.element.addEventListener('mouseup', ev =>
    {
      ev.preventDefault(); // Prevent Default Actions
      this.stop_vowel();
//      this.testClose();
//      setTimeout(() => { this.voicedGain.gain.value = 0.0001;}, 100);
    });

    this.element.addEventListener('touchmove', ev =>
    {
      var pos = checkFinger(XYpad);

      ev.preventDefault(); // Prevent Default Actions
      var rect = ev.target.getBoundingClientRect();
      var x = ev.changedTouches[0].clientX - rect.left - this.ox;
      var y = ev.changedTouches[0].clientY - rect.top - this.oy;
      if (x < 0)
      {
        x = 0;
      }
      else if (x > this.size)
      {
        x = this.size;
      }
      if (y < 0)
      {
        y = 0;
      }
      else if (y > this.size)
      {
        y = this.size;
      }
      this.F1.frequency.value = x / this.size * 1000;
      this.F2.frequency.value = (this.size - y) / this.size * 3000;
    });

    this.element.addEventListener('touchstart', ev =>
    {
      ev.preventDefault(); // Prevent Default Actions
        if (!this.switch) {
          this.osc.start();
          this.switch = true;
        }
      let rect = ev.target.getBoundingClientRect();
      let x = ev.changedTouches[0].clientX - rect.left - this.ox;
      let y = ev.changedTouches[0].clientY - rect.top - this.oy;
      if (x > this.size2) return;
      if (y > this.size2) return;

      if (x < 0)
      {
        x = 0;
      }
      else if (x > this.size)
      {
        x = this.size;
      }
      if (y < 0)
      {
        y = 0;
      }
      else if (y > this.size)
      {
        y = this.size;
      }
      this.F1.frequency.value = x / this.size * 1000;
      this.F2.frequency.value = (this.size - y) / this.size * 3000;

      this.voicedGain.gain.value = 0.001;
      const self = this;
      setTimeout(() => { this.noise.play(100);}, 100);
      setTimeout(() => { this.voicedGain.gain.value = 1;}, 200);
    });

    this.element.addEventListener('touchend', ev =>
    {
      ev.preventDefault(); // Prevent Default Actions
      setTimeout(() => { this.voicedGain.gain.value = 0.0001;}, 100);
    });
  }

  checkFinger(eventType, ev)
  {
    // [{ type:Button, x:0, y0}, {type:XYpad, x:0, y:0}] を返すようにする

    // https://www.html5rocks.com/ja/mobile/touch/
    ev.preventDefault(); // Prevent Default Actions
    let rect = ev.target.getBoundingClientRect();

    switch (eventType)
    {
      case XYpad:
        for (var i = 0; i < ev.changedTouches.length; i++)
        {
          let x = ev.changedTouches[i].clientX - rect.left - this.ox;
          let y = ev.changedTouches[i].clientY - rect.top - this.oy;
          if ((x >= 0) && (x <= this.size2) && (y >= 0) && (y <= this.size2))
          {
             return { result:true, x:x, y:y };
          }
        }
        return { result:false, x:0, y:0 };
        break;

      case Button:
        for (var i = 0; i < ev.changedTouches.length; i++)
        {
          let x = ev.changedTouches[i].clientX - rect.left;
          let y = ev.changedTouches[i].clientY - rect.top;
          if (x < this.ox)
          {
             return { result:true, x:x, y:y };
          }
        }
        return { result:false, x:0, y:0 };
        break;

      case OtherUI:
        break;
    }


    for (var i = 0; i < ev.changedTouches.length; i++)
    {
      let x = ev.changedTouches[i].clientX - rect.left - this.ox;
      let y = ev.changedTouches[i].clientY - rect.top - this.oy;
      // button?
      if (x < this.ox)
      {

      }
      // XYpad?
      else if ((x >= this.ox) && (x <= this.ox + this.size2)
       && (y >= this.oy) && (y <= this.oy + this.size2))
      {

      }
      // other?
      else
      {

      }

    }

    return { result:false, x:0, y:0 };
  }
}


window.addEventListener("load", () =>
{
  canvas1 = document.getElementById('canvas1'); // $('#canvas1');
  canvas2 = document.getElementById('canvas2');

  var scaleX = window.innerWidth / 800;
  var scaleY = window.innerHeight / 500;
  var scale = Math.min(scaleX, scaleY);

  synthesizer = new Synthesizer(canvas1);
  synthesizer.setScale(scale);
  synthesizer.set_event();

  background = new Background(canvas1);
  background.setScale(scale)
  background.draw();

  trailer = new Trailer(canvas2, 20);
  trailer.setScale(scale);
});

var timer;
window.onresize = () =>
{
  if (timer > 0) {
    clearTimeout(timer);
  }

  timer = setTimeout(() =>
  {
    console.log('window resized'); //ここに処理の内容が入る
    var scaleX = window.innerWidth / 800;
    var scaleY = window.innerHeight / 500;
    var scale = Math.min(scaleX, scaleY);

    canvas1.setAttribute("width", window.innerWidth.toString());
    canvas1.setAttribute("height", window.innerHeight.toString());
    canvas2.setAttribute("width", window.innerWidth.toString());
    canvas2.setAttribute("height", window.innerHeight.toString());

    synthesizer.setScale(scale);
    background.setScale(scale);
    trailer.setScale(scale);

    if (background != null)
    {
      background.draw();
    }
  }, 200);
};

