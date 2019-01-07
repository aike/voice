class Noise
{
  constructor(ctx)
  {
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

  start(time)
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
  }
}

class LPFNoise extends Noise
{
  constructor(ctx)
  {
    super(ctx);
    this.buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var data = this.buf.getChannelData(0);
    data[0] = Math.random() * 2 - 1;
    for (var i = 1; i < this.buf.length; i++) {
      data[i] = ((Math.random() * 2 - 1) + 0.98 * data[i - 1]) * 0.5;
    }
    this.osc = ctx.createBufferSource();
    this.osc.buffer = this.buf;
    this.osc.loop = true;
    this.init = false;
  }
}

class VowelFilter
{
  constructor(ctx, dest){
    this.F1 = ctx.createBiquadFilter();
    this.F1.type = "bandpass";
    this.F1.frequency.value = 500;
    this.F1.Q.value = 10;
    //this.F1.Q.value = this.F1.frequency.value * 0.02;

    this.F2 = ctx.createBiquadFilter();
    this.F2.type = "bandpass";
    this.F2.frequency.value = 1500;
    this.F2.Q.value = 10;
    //this.F2.Q.value = this.F2.frequency.value * 0.02;

    this.F1.connect(dest);
    this.F2.connect(dest);
  }
}

class Voice
{
  constructor(ctx, s, vowelFilter, white_noise, brown_noise, dest)
  {
    this.zero = 0.0000001;

    this.ctx = ctx;
    this.init = false;
    this.filter = null;

    var f0 = 125;

    this.char = s;

    switch (s)
    {
      case "a":
        this.osc = ctx.createOscillator();
        this.osc.type = "sawtooth";
        this.osc.frequency.value = f0;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.gain);
        this.filter = vowelFilter;
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.5;
        this.attack = 0.01;
        this.hold    = -1;
        this.release = 0.01;
        this.pre_f1 = 800;
        this.pre_f2 = 1200;
        this.pre_time = 0;
        this.f1 = 800;
        this.f2 = 1200;
        this.short_conso = false;
        break;
      case "h":
        this.osc = brown_noise;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.gain);
        this.gain.connect(vowelFilter.F1);
        this.gain.connect(vowelFilter.F2);
        this.level = 0.4;
        this.attack  = 0.05;
        this.hold    = 0.1;
        this.release = 0.05;
        this.vowel_delay = 0.01;
        this.short_conso = false;
        break;
      case "s":
        this.osc = white_noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 8000;
        this.consoFilter.Q.value = 5;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.1;
        this.attack  = 0.1;
        this.hold    = -1;
        this.release = 0.01;
        this.vowel_delay = 0.01;
        this.short_conso = false;
        break;
      case "sy":
        this.osc = white_noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 4000;
        this.consoFilter.Q.value = 5;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.1;
        this.attack  = 0.1;
        this.hold    = -1;
        this.release = 0.01;
        this.vowel_delay = 0.01;
        this.short_conso = false;
        break;
      case "k":
        this.osc = brown_noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 500;
        this.consoFilter.Q.value = 2;
        this.boost = ctx.createGain();
        this.boost.gain.value = 2.0;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.boost);
        this.boost.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.5;
        this.attack  = 0.01;
        this.hold    = 0.0;
        this.release = 0.01;
        this.vowel_delay = 0.01;
        this.short_conso = true;
        break;
      case "p":
        this.osc = brown_noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 200;
        this.consoFilter.Q.value = 5;
        this.boost = ctx.createGain();
        this.boost.gain.value = 6.0;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.boost);
        this.boost.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.8;
        this.attack  = 0.01;
        this.hold    = 0.0;
        this.release = 0.01;
        this.vowel_delay = 0.01;
        this.short_conso = true;
        break;
      case "t":
        this.osc = brown_noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 500;
        this.consoFilter.Q.value = 2;
        this.boost = ctx.createGain();
        this.boost.gain.value = 2.0;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.boost);
        this.boost.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.5;
        this.attack  = 0.01;
        this.hold    = 0.0;
        this.release = 0.01;
        this.vowel_delay = 0.01;
        this.short_conso = true;
        break;
      case "cy":
      case "ts":
        this.osc = brown_noise;
        this.consoFilter = ctx.createBiquadFilter();
        this.consoFilter.type = "bandpass";
        this.consoFilter.frequency.value = 8000;
        this.consoFilter.Q.value = 5;
        this.gain = ctx.createGain();
        this.gain.gain.value = this.zero;
        this.osc.connect(this.consoFilter);
        this.consoFilter.connect(this.gain);
        this.gain.connect(dest);
        this.level = 0.1;
        this.attack  = 0.0;
        this.hold    = -1;
        this.release = 0.01;
        this.vowel_delay = 0.01;
        this.short_conso = true;
        break;
      default:
        break;
    }

  }

  formant_move(offset)
  {
    const t0 = this.ctx.currentTime + offset;
    if ((this.pre_time1 != null) && (this.pre_time1 > 0)) {
      this.filter.F1.frequency.setValueAtTime(this.pre_f1, t0);
      //this.filter.F1.Q.setValueAtTime(this.pre_f1 * 0.02, t0);
      this.filter.F1.frequency.setTargetAtTime(this.f1, t0, this.pre_time1);
      //this.filter.F1.Q.setTargetAtTime(this.f1 * 0.02, t0, this.pre_time1);
    }
    if ((this.pre_time2 != null) && (this.pre_time2 > 0)) {
      this.filter.F2.frequency.setValueAtTime(this.pre_f2, t0);
      //this.filter.F2.Q.setValueAtTime(this.pre_f2 * 0.02, t0);
      this.filter.F2.frequency.setTargetAtTime(this.f2, t0, this.pre_time2);
      //this.filter.F2.Q.setTargetAtTime(this.f2 * 0.02, t0, this.pre_time2);
    }
  }

  play()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    this.gain.gain.setValueAtTime(this.level, this.ctx.currentTime);
  }

  play_eg()
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    var t0 = this.ctx.currentTime;
    this.gain.gain.setValueAtTime(this.zero, t0);
    this.formant_move(0);
    this.gain.gain.setTargetAtTime(this.level, t0, this.attack);
    if (this.short_conso) {
      this.gain.gain.setTargetAtTime(this.level, t0 + this.attack, this.hold);
      this.gain.gain.setTargetAtTime(this.zero, t0 + this.attack + this.hold, this.release);
    }
  }

  play_delayed_eg(delay)
  {
    if (!this.init) {
      this.osc.start(0);
      this.init = true;
    }
    var t0 = this.ctx.currentTime;
    this.gain.gain.setValueAtTime(this.zero, t0);
    this.gain.gain.setTargetAtTime(this.zero, t0, delay);
    this.formant_move(delay);
    this.gain.gain.setTargetAtTime(this.level, t0 + delay, this.attack);
    if (this.short_conso) {
      this.gain.gain.setTargetAtTime(this.level, t0 + delay + this.attack, this.hold);
      this.gain.gain.setTargetAtTime(this.zero, t0 + delay + this.attack + this.hold, this.release);
    }
  }

  stop()
  {
    this.gain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.gain.gain.setValueAtTime(this.zero, this.ctx.currentTime);
  }

  stop_eg()
  {
    this.gain.gain.cancelScheduledValues(this.ctx.currentTime);
    var t0 = this.ctx.currentTime;
    this.gain.gain.setValueAtTime(this.gain.gain.value, t0);
    this.gain.gain.setTargetAtTime(
      this.zero,
      t0,
      this.release);
  }

}

// export default Voice;
// export { Noise, LPFNoise, VowelFilter };
