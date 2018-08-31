window.AudioContext = window.webkitAudioContext || window.AudioContext;
var audioctx = new AudioContext();

class Voice
{
  constructor(s)
  {
    this.init = false;

    var f0 = 125;
    this.osc = audioctx.createOscillator();
    this.osc.type = "sawtooth";

    switch (s)
    {
      case "a":
        this.osc.frequency.value = f0;
        break;
      case "h":
        this.osc.frequency.value = 800;
        break;
      case "s":
        this.osc.frequency.value = 1000;
        break;
      case "sh":
        this.osc.frequency.value = 1500;
        break;
      case "ts":
        this.osc.frequency.value = 2000;
        break;
      case "k":
        this.osc.frequency.value = 3000;
        break;
      case "p":
        this.osc.frequency.value = 4000;
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


