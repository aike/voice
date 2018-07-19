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

    this.down = false;

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

    this.F1 = audioctx.createBiquadFilter();
    this.F1.type = "bandpass";
    this.F1.frequency.value = 500;
    this.F1.Q.value = 10;

    this.F2 = audioctx.createBiquadFilter();
    this.F2.type = "bandpass";
    this.F2.frequency.value = 1500;
    this.F2.Q.value = 10;

    this.consonant = new FilterManager(audioctx, this.osc, this.noise, this.F1, this.F2, audioctx.destination);
    this.consonant.select("a");

    this.F1.connect(audioctx.destination);
    this.F2.connect(audioctx.destination);

    this.switch = false;
    this.index = 0;
    this.lastindex = 0;
    this.last_f1 = 0;
    this.last_f2 = 0;

    this.ch = "";

    this.reserved_consonant = "";
  }

  play()
  {
    this.consonant.play();
  }

  stop()
  {
    this.consonant.stop();
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




  downCallback(ev, cx, cy)
  {
      ev.preventDefault(); // Prevent Default Actions

      this.ch = background.checkButton(cx, cy);
      console.log("pushed:[" + this.ch + "]");
      this.consonant.select(this.ch);
      if (this.ch != "") {
        this.down = true;
        return
      }
      this.down = false;

      if (!this.switch) {
        this.osc.start();
        this.noise.start();
        this.switch = true;
      }
      var rect = ev.target.getBoundingClientRect();
      var x = cx - rect.left - this.ox;
      var y = cy - rect.top - this.oy;
      if (x < 0) return;
      if (y < 0) return;
      if (x > this.size2) return;
      if (y > this.size2) return;

      this.F1.frequency.value = x / this.size * 1000;
      this.F2.frequency.value = (this.size - y) / this.size * 3000;

      setTimeout(() => {
        this.play();
      }, 100);
  }

  upCallback(ev)
  {
      ev.preventDefault(); // Prevent Default Actions
      this.stop();
      if (this.ch == "") {
        this.consonant.select("a");
      }
  }

  moveCallback(ev, cx, cy)
  {
      ev.preventDefault(); // Prevent Default Actions

      if (this.down) return;

      var rect = ev.target.getBoundingClientRect();
      var x = cx - rect.left - this.ox;
      var y = cy - rect.top - this.oy;
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

  }


  set_event()
  {
    this.element.addEventListener('mousemove', ev =>
    {
      this.moveCallback(ev, ev.clientX, ev.clientY);
    });

    this.element.addEventListener('touchmove', ev =>
    {
      this.moveCallback(ev, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
    });


    this.element.addEventListener('mousedown', ev =>
    {
      this.downCallback(ev, ev.clientX, ev.clientY);
    });

    this.element.addEventListener('touchstart', ev =>
    {
      this.downCallback(ev, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
    });


    this.element.addEventListener('mouseup', ev =>
    {
      this.upCallback(ev);
    });

    this.element.addEventListener('touchend', ev =>
    {
      this.upCallback(ev);
    });


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

