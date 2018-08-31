window.AudioContext = window.webkitAudioContext || window.AudioContext;
var audioctx = new AudioContext();

class Noise
{
  constructor()
  {
    this.buf = audioctx.createBuffer(1, audioctx.sampleRate, audioctx.sampleRate);
    var data = this.buf.getChannelData(0);
    for (var i = 0; i < this.buf.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.osc = audioctx.createBufferSource();
    this.osc.buffer = this.buf;
    this.osc.loop = true;
    this.init = false;
  }

  connect(dest)
  {
    this.osc.connect(dest);
  }

  start(time)
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
  }
}

var noise = new Noise();


class Voice
{
  constructor(s)
  {
    this.init = false;

    var f0 = 125;

    switch (s)
    {
      case "a":
        this.osc = audioctx.createOscillator();
        this.osc.type = "sawtooth";
        this.osc.frequency.value = f0;
        break;
      case "h":
        this.osc = noise;
        break;
      case "s":
        this.osc = noise;
        break;
      case "sh":
        this.osc = noise;
        break;
      case "ts":
        this.osc = noise;
        break;
      case "k":
        this.osc = noise;
        break;
      case "p":
        this.osc = noise;
        break;
    }

    this.gain = audioctx.createGain();
    this.gain.gain.value = 0.0001;

    this.osc.connect(this.gain);
    this.gain.connect(audioctx.destination);
  }

  play()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    this.gain.gain.value = 0.01;
  }

  stop()
  {
    this.gain.gain.value = 0.0001;
  }
}


window.addEventListener("load", () =>
{

  synthesizer = new Synthesizer(canvas1);
  synthesizer.setScale(scale);
//  synthesizer.set_event();

  background = new Background(canvas1);
  background.setScale(scale)
  background.draw();

  trailer = new Trailer(canvas2, 20);
  trailer.setScale(scale);
});


