window.AudioContext = window.webkitAudioContext || window.AudioContext;
var audioctx = new AudioContext();
var synthesizer;
var trailer;

class Synthesizer
{
  constructor(element)
  {
    this.ox = 80;
    this.oy = 30;

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

    //this.osc.start();

    this.index = 0;
    this.lastindex = 0;
    this.last_f1 = 0;
    this.last_f2 = 0;

    this.playing = false;
  }

  start(x, y) {
      var self = this;

      if (x > 340) return;
      if (y > 340) return;

      this.move(x, y);

      if (!this.playing) {
        this.volume.gain.value = 0.001;
        this.osc.start();
        this.playing = true;
        setTimeout(function() {
          self.volume.gain.value = 1;
        }, 100);
      } else {
        this.volume.gain.value = 1;        
      }
  }

  move(x, y) {
      if (x < 0)
      {
        x = 0;
      }
      else if (x > 300)
      {
        x = 300;
      }
      if (y < 0)
      {
        y = 0;
      }
      else if (y > 300)
      {
        y = 300;
      }
      this.F1.frequency.value = x / 300 * 1000;
      this.F2.frequency.value = (300 - y) / 300 * 3000;    
  }

  stop() {
      this.volume.gain.value = 0.0001;
  }

  set_event()
  {
    var self = this;
    this.element.addEventListener('mousemove', function(ev)
    {
      var rect = ev.target.getBoundingClientRect();
      var x = ev.clientX - rect.left - self.ox;
      var y = ev.clientY - rect.top - self.oy;
      self.move(x, y);      
    });

    this.element.addEventListener('mousedown', function(ev)
    {
      var rect = ev.target.getBoundingClientRect();
      var x = ev.clientX - rect.left - self.ox;
      var y = ev.clientY - rect.top - self.oy;
      self.start(x, y);
    });

    this.element.addEventListener('mouseup', function(ev)
    {
      self.stop();
    });

    this.element.addEventListener('touchmove', function(ev)
    {
      var rect = ev.target.getBoundingClientRect();
      var x = ev.changedTouches[0].clientX - rect.left - self.ox;
      var y = ev.changedTouches[0].clientY - rect.top - self.oy;
      self.move(x, y);
    });

    this.element.addEventListener('touchstart', function(ev)
    {
      var rect = ev.target.getBoundingClientRect();
      var x = ev.changedTouches[0].clientX - rect.left - self.ox;
      var y = ev.changedTouches[0].clientY - rect.top - self.oy;
      self.start(x, y);
    });

    this.element.addEventListener('touchend', function(ev)
    {
      self.stop();
    });
  }

}

window.addEventListener("load", function()
{
  var element1 = document.getElementById('canvas1');
  var element2 = document.getElementById('canvas2');

  synthesizer = new Synthesizer(element1);
  synthesizer.set_event();

  var background = new Background(element1);
  background.draw();

  trailer = new Trailer(element2, 20);
});
