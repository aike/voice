window.AudioContext = window.webkitAudioContext || window.AudioContext;
var audioctx = new AudioContext();
var synthesizer;
var trailer;
var background;
var canvas1;
var canvas2;

class Synthesizer
{
  constructor(element)
  {
    this.element = element;

    var f0 = 125;
    this.osc = audioctx.createOscillator();
    this.osc.frequency.value = f0;
    this.osc.type = "sawtooth";

    this.volume = audioctx.createGain();
    this.volume.gain.value = 0.0001;

    this.F1 = audioctx.createBiquadFilter();
    this.F1.type = "bandpass";
    this.F1.frequency.value = 500;
    this.F1.Q.value = 10;

    this.F2 = audioctx.createBiquadFilter();
    this.F2.type = "bandpass";
    this.F2.frequency.value = 1500;
    this.F2.Q.value = 10;

    this.osc.connect(this.volume);
    this.volume.connect(this.F1);
    this.F1.connect(audioctx.destination);

    this.volume.connect(this.F2);
    this.F2.connect(audioctx.destination);

    this.switch = false;

    this.index = 0;
    this.lastindex = 0;
    this.last_f1 = 0;
    this.last_f2 = 0;
  }

  setScale(scale)
  {
    this.scale = scale;

    this.ox = 250 * this.scale;
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
        if (!this.switch) {
          this.osc.start();
          this.switch = true;
        }
      var rect = ev.target.getBoundingClientRect();
      var x = ev.clientX - rect.left - this.ox;
      var y = ev.clientY - rect.top - this.oy;
      if (x > this.size2) return;
      if (y > this.size2) return;

      setTimeout(() => { this.volume.gain.value = 1;}, 100);
    });

    this.element.addEventListener('mouseup', ev =>
    {
      ev.preventDefault(); // Prevent Default Actions
      setTimeout(() => { this.volume.gain.value = 0.0001;}, 100);
    });

    this.element.addEventListener('touchmove', ev =>
    {
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

      this.volume.gain.value = 0.001;
      const self = this;
      setTimeout(() => { self.volume.gain.value = 1;}, 100);
    });

    this.element.addEventListener('touchend', ev =>
    {
      ev.preventDefault(); // Prevent Default Actions
      setTimeout(() => { this.volume.gain.value = 0.0001;}, 100);
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

