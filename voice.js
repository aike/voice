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

class VowelFilter
{
  constructor(){
    this.F1 = audioctx.createBiquadFilter();
    this.F1.type = "bandpass";
    this.F1.frequency.value = 500;
    this.F1.Q.value = 10;

    this.F2 = audioctx.createBiquadFilter();
    this.F2.type = "bandpass";
    this.F2.frequency.value = 1500;
    this.F2.Q.value = 10;

    this.F1.connect(audioctx.destination);
    this.F2.connect(audioctx.destination);
  }
}

var vowelFilter = new VowelFilter();


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
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.gain);
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.1;
        break;
      case "h":
        this.osc = noise;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.gain);
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.05;
        this.eg_t=[0, 0.05, 0.1, 0.15];
        this.eg_a=[0,    1,    1,   0];
        break;
      case "s":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 8000;
        this.consoFilter.Q.value = 5;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.gain);
        this.gain.connect(audioctx.destination);
        this.level = 0.003;
        this.eg_t=[0, 0.05, 0.20, 0.3];
        this.eg_a=[0, 0,    1,    1];
        break;
      case "sh":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 4000;
        this.consoFilter.Q.value = 5;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(audioctx.destination);
        this.level = 0.01;
        this.eg_t=[0, 0.05, 0.20, 0.3];
        this.eg_a=[0, 0,    1,    1];
        break;
      case "ts":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 500;
        this.consoFilter.Q.value = 2;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(audioctx.destination);
        this.level = 0.05;
        this.eg_t=[0, 0.01, 0.02];
        this.eg_a=[0,    1,    0];
        break;
      case "k":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 500;
        this.consoFilter.Q.value = 2;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(audioctx.destination);
        this.level = 0.05;
        this.eg_t=[0, 0.01, 0.02];
        this.eg_a=[0,    1,    0];
        break;
      case "p":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 500;
        this.consoFilter.Q.value = 2;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(audioctx.destination);
        this.level = 0.05;
        this.eg_t=[0, 0.01, 0.02];
        this.eg_a=[0,    1,    0];
        break;
    }

  }

  play()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    this.gain.gain.value = this.level;
  }

  play_eg()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    var t0 = this.ctx.currentTime;
    for (let i = 0; i < this.eg_t.length - 1; i++) {
      this.gain.gain.setTargetAtTime(
        this.eg_a[i + 1] * this.level,
        t0 + this.eg_t[i],
        (this.eg_t[i + 1] - this.eg_t[i]) / 10);
    }
  }

  stop()
  {
    this.gain.gain.value = 0.0000001;
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


