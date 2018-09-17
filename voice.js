window.AudioContext = window.webkitAudioContext || window.AudioContext;
var audioctx = new AudioContext();

var master_out = audioctx.createGain();
master_out.gain.value = 1.0;
master_out.connect(audioctx.destination);


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

class LPFNoise extends Noise
{
  constructor()
  {
    super();
    this.buf = audioctx.createBuffer(1, audioctx.sampleRate, audioctx.sampleRate);
    var data = this.buf.getChannelData(0);
    data[0] = Math.random() * 2 - 1;
    for (var i = 1; i < this.buf.length; i++) {
      data[i] = ((Math.random() * 2 - 1) + 0.98 * data[i - 1]) * 0.5;
    }
    this.osc = audioctx.createBufferSource();
    this.osc.buffer = this.buf;
    this.osc.loop = true;
    this.init = false;
  }
}

var lpf_noise = new LPFNoise();


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

    this.F1.connect(master_out);
    this.F2.connect(master_out);
  }
}

var vowelFilter = new VowelFilter();


class Voice
{
  constructor(s)
  {
    this.init = false;
    this.filter = null;

    var f0 = 125;

    this.char = s;

    switch (s)
    {
      case "a":
        this.osc = audioctx.createOscillator();
        this.osc.type = "sawtooth";
        this.osc.frequency.value = f0;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.gain);
        this.filter = vowelFilter;
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.5;
        this.eg_t=[0, 0.09, 0.1];
        this.eg_a=[0, 0,      1];
        break;
      case "h":
        this.osc = lpf_noise;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.gain);
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.4;
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
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(master_out);
        this.level = 0.03;
        this.eg_t=[0, 0.05, 0.20, 0.3];
        this.eg_a=[0, 0,    1,    1];
        break;
      case "sy":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 4000;
        this.consoFilter.Q.value = 5;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(master_out);
        this.level = 0.03;
        this.eg_t=[0, 0.05, 0.20, 0.3];
        this.eg_a=[0, 0,    1,    1];
        break;
      case "t":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 200;
        this.consoFilter.Q.value = 5;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(master_out);
        this.level = 0.8;
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
        this.gain.connect(master_out);
        this.level = 0.5;
        this.eg_t=[0, 0.01, 0.02];
        this.eg_a=[0,    1,    0];
        break;
      case "p":
        this.osc = noise;
        this.consoFilter = audioctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 200;
        this.consoFilter.Q.value = 5;
        this.gain = audioctx.createGain();
        this.gain.gain.value = 0.0001;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(master_out);
        this.level = 0.8;
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
    this.gain.gain.setValueAtTime(this.level, audioctx.currentTime);
  }

  play_eg()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    var t0 = audioctx.currentTime;
    this.gain.gain.setValueAtTime(0.0000001, audioctx.currentTime);
    for (let i = 0; i < this.eg_t.length - 1; i++) {
      this.gain.gain.setTargetAtTime(
        this.eg_a[i + 1] * this.level,
        t0 + this.eg_t[i],
        (this.eg_t[i + 1] - this.eg_t[i]) / 10);
    }
  }

  stop()
  {
    this.gain.gain.cancelScheduledValues(audioctx.currentTime);
    this.gain.gain.setValueAtTime(0.0000001, audioctx.currentTime);
  }

  stop_eg()
  {
    var t0 = audioctx.currentTime;
    this.gain.gain.setValueAtTime(this.level, audioctx.currentTime);
    for (let i = 0; i < this.eg_t.length - 1; i++) {
      this.gain.gain.setTargetAtTime(
        this.eg_a[i + 1] * this.level + 0.0000001,
        t0 + this.eg_t[i],
        (this.eg_t[i + 1] - this.eg_t[i]) / 10);
    }    
  }
}

