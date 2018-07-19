class Filter
{
	constructor(ctx, noise, f1, f2, out)
	{
		this.unvoiced = null;
		this.str = null;

		this.ctx = ctx;
		this.noise = noise;
		this.f1 = f1;
		this.f2 = f2;
		this.out = out;

		this.init = false;
	}

	CreateFilter(str)
	{
		this.str = str;
		switch (str)
		{
			case "s":
				this.CreateObjects(true, true);

				this.unvoiced.type = "bandpass";
				this.unvoiced.frequency.value = 8000;
				this.unvoiced.Q.value = 5;
				this.unvoiced_vca_t=[0, 0.05, 0.20, 0.3, 0.32, 1];
				this.unvoiced_vca_a=[0, 0,    1,    1,   0,    0];
				this.unvoiced_level.gain.value = 1.0;

				this.voiced.frequency.value = 1000;
				this.voiced.type = "sawtooth";
				this.voiced_vca_t=[0, 0.3, 0.5, 0.7, 0.8, 1];
				this.voiced_vca_a=[0, 0,   1,   1,   0,   0];
				this.voiced_level.gain.value = 0.1;
				break;

			case "sy":
				this.CreateObjects(true, true);

				this.unvoiced.type = "bandpass";
				this.unvoiced.frequency.value = 4000;
				this.unvoiced.Q.value = 5;
				this.unvoiced_vca_t=[0, 0.05, 0.20, 0.3, 0.32, 1];
				this.unvoiced_vca_a=[0, 0,    1,    1,   0,    0];
				this.unvoiced_level.gain.value = 1.0;

				this.voiced.frequency.value = 1000;
				this.voiced.type = "sawtooth";
				this.voiced_vca_t=[0, 0.3, 0.5, 0.7, 0.8, 1];
				this.voiced_vca_a=[0, 0,   1,   1,   0,   0];
				this.voiced_level.gain.value = 0.1;

				break;

			case "h":
				this.CreateObjects(false, true);

				this.unvoiced_vca_t=[0, 0.2, 0.25, 0.3, 0.32, 1];
				this.unvoiced_vca_a=[0, 0,   1,    1,   0,    0];
				this.unvoiced_level.gain.value = 0.7;

				this.voiced.frequency.value = 1000;
				this.voiced.type = "sawtooth";
				this.voiced_vca_t=[0, 0.3, 0.35, 0.7, 0.8, 1];
				this.voiced_vca_a=[0, 0,   1,    1,   0,   0];
				this.unvoiced_level.gain.value = 0.3;

				break;

			case "p":
				this.CreateObjects(true, false);

				this.unvoiced.type = "bandpass";
				this.unvoiced.frequency.value = 500;
				this.unvoiced.Q.value = 2;
				this.unvoiced_vca_t=[0, 0.27, 0.271, 0.272, 1];
				this.unvoiced_vca_a=[0, 0,    1,     0,    0];
				this.unvoiced_level.gain.value = 1.0;

				this.voiced.frequency.value = 1000;
				this.voiced.type = "sawtooth";
				this.voiced_vca_t=[0, 0.3, 0.5, 0.7, 0.8, 1];
				this.voiced_vca_a=[0, 0,   1,   1,   0,   0];
				this.unvoiced_level.gain.value = 0.9;

				break;
		}
	}

	play()
	{
		if (!this.init) {
			this.voiced.start(0);
			this.init = true;
		}


		var t0 = this.ctx.currentTime;

		for (let i = 0; i < this.unvoiced_vca_t.length - 1; i++) {
			this.unvoiced_vca.gain.setTargetAtTime(
				this.unvoiced_vca_a[i],
				t0 + this.unvoiced_vca_t[i] / 10,
				(this.unvoiced_vca_t[i + 1] - this.unvoiced_vca_t[i]) / 10);
			console.log(' >>> ' + 
				this.unvoiced_vca_a[i] + ' ' +
				this.unvoiced_vca_t[i] + ' ' +
				(this.unvoiced_vca_t[i + 1] - this.unvoiced_vca_t[i]));
		}

		for (let i = 0; i < this.voiced_vca_t.length - 1; i++) {
			this.voiced_vca.gain.setTargetAtTime(
				this.voiced_vca_a[i],
				t0 + this.voiced_vca_t[i] / 10,
				(this.voiced_vca_t[i + 1] - this.voiced_vca_t[i]) / 10);
		}
	}



	Enable(flag)
	{
		if (flag) {
			this.unvoiced_vca.gain.value = 0.001;
			this.voiced_vca.gain.value = 0.001;
			this.sw.gain.value = 1;
			console.log(' on ' + this.str);
		} else {
			this.sw.gain.value = 0.001;
			console.log(' off ' + this.str);
		}
	}

	CreateObjects(use_bpf, use_f1f2)
	{
		if (use_bpf) {
			this.unvoiced = this.ctx.createBiquadFilter();
			this.unvoiced_vca = this.ctx.createGain();
			this.unvoiced.connect(this.unvoiced_vca);
		} else {
			this.unvoiced_vca = this.ctx.createGain();
			this.unvoiced = this.unvoiced_vca;
		}
		this.unvoiced_level = this.ctx.createGain();
		this.voiced = this.ctx.createOscillator();
		this.voiced_vca = this.ctx.createGain();
		this.voiced_level = this.ctx.createGain();
		this.sw = this.ctx.createGain();

		this.noise.connect(this.unvoiced);
		this.unvoiced_vca.connect(this.unvoiced_level);
		this.unvoiced_level.connect(this.sw);
		this.voiced.connect(this.voiced_vca);
		this.voiced_vca.connect(this.voiced_level);
		this.voiced_level.connect(this.sw);

		if (use_f1f2) {
			this.sw.connect(this.f1);
			this.sw.connect(this.f2);
		} else {
			this.sw.connect(this.out);
		}

		this.Enable(false);
	}

}

class FilterManager
{
	constructor(ctx, noise, f1, f2, out)
	{
		this.filters = [];

		this.filter_s = new Filter(ctx, noise, f1, f2, out);
		this.filter_s.CreateFilter("s");
		this.filters.push(this.filter_s);

		this.filter_sy = new Filter(ctx, noise, f1, f2, out);
		this.filter_sy.CreateFilter("sy");
		this.filters.push(this.filter_sy);

		this.filter_h = new Filter(ctx, noise, f1, f2, out);
		this.filter_h.CreateFilter("h");
		this.filters.push(this.filter_h);

		this.filter_p = new Filter(ctx, noise, f1, f2, out);
		this.filter_p.CreateFilter("p");
		this.filters.push(this.filter_p);

		this.selected = null;
	}

	select(str)
	{

		for (let i = 0; i < this.filters.length; i++) {
console.log(this.filters[i].str + ' ' + str);
			if (this.filters[i].str == str) {
				if (this.selected != null) {
					this.selected.Enable(false);
					this.selected = null;
				}
				this.selected = this.filters[i];
				this.selected.Enable(true);
				console.log('select ' + str);
				break;
			}
		}
//		console.log('unselect');
//		this.all_off();
	}

	play()
	{
		console.log('manager play');
		if (this.selected != null) {
			console.log('manager selected play');
			this.selected.play();
		}
	}

	all_off()
	{
		for (let i = 0; i < this.filters.length; i++) {
			this.filters[i].Enable(false);
		}
	}
}

