class Filter
{
	constructor(ctx, osc, noise, f1, f2, out)
	{
		this.unvoiced = null;
		this.str = null;

		this.ctx = ctx;
		this.osc = osc;
		this.noise = noise;
		this.f1 = f1;
		this.f2 = f2;
		this.out = out;
		this.long_unvoiced = false;

		this.init = false;
	}

	CreateFilter(str)
	{
		this.str = str;
		switch (str)
		{
			case "a":
				this.CreateObjects(true, false);

				this.unvoiced.type = "bandpass";
				this.unvoiced.frequency.value = 8000;
				this.unvoiced.Q.value = 5;
				this.unvoiced_vca_t=[0, 0.1];
				this.unvoiced_vca_a=[0,   0];
				this.unvoiced_level.gain.value = 0;

				this.voiced_vca_t=[0, 0.1];
				this.voiced_vca_a=[0,   1];
				this.voiced_level.gain.value = 1;
				break;

			case "s":
				this.CreateObjects(true, false);

				this.unvoiced.type = "bandpass";
				this.unvoiced.frequency.value = 8000;
				this.unvoiced.Q.value = 5;
				this.unvoiced_vca_t=[0, 0.05, 0.20, 0.3];
				this.unvoiced_vca_a=[0, 0,    1,    1];
				this.unvoiced_level.gain.value = 0.1;

				this.voiced_vca_t=[0, 0.2];
				this.voiced_vca_a=[0, 1  ];
				this.voiced_level.gain.value = 1;

				this.long_unvoiced = true;
				break;

			case "sy":
				this.CreateObjects(true, false);

				this.unvoiced.type = "bandpass";
				this.unvoiced.frequency.value = 4000;
				this.unvoiced.Q.value = 5;
				this.unvoiced_vca_t=[0, 0.05, 0.20, 0.3];
				this.unvoiced_vca_a=[0, 0,    1,    1];
				this.unvoiced_level.gain.value = 0.1;

				this.voiced_vca_t=[0, 0.2];
				this.voiced_vca_a=[0, 1  ];
				this.voiced_level.gain.value = 1;

				this.long_unvoiced = true;

				break;

			case "h":
				this.CreateObjects(false, true);

				this.unvoiced_vca_t=[0, 0.05, 0.1, 0.15];
				this.unvoiced_vca_a=[0,    1,    1,   0];
				this.unvoiced_level.gain.value = 0.7;

				this.voiced_vca_t=[0, 0.1, 0.15];
				this.voiced_vca_a=[0, 0,   1   ];
				this.unvoiced_level.gain.value = 0.3;

				break;

			case "p":
				this.CreateObjects(true, false);

				this.unvoiced.type = "bandpass";
				this.unvoiced.frequency.value = 500;
				this.unvoiced.Q.value = 2;
				this.unvoiced_vca_t=[0, 0.01, 0.02];
				this.unvoiced_vca_a=[0,    1,    0];
				this.unvoiced_level.gain.value = 1.0;

				this.voiced_vca_t=[0, 0.03, 0.23];
				this.voiced_vca_a=[0,    0,    1];
				this.unvoiced_level.gain.value = 0.9;

				break;
		}
	}


	play_unvoiced()
	{
		var t0 = this.ctx.currentTime;

		for (let i = 0; i < this.unvoiced_vca_t.length - 1; i++) {
			this.unvoiced_vca.gain.setTargetAtTime(
				this.unvoiced_vca_a[i + 1],
				t0 + this.unvoiced_vca_t[i],
				(this.unvoiced_vca_t[i + 1] - this.unvoiced_vca_t[i]) / 30);
			//console.log(' >>> ' + 
			//	this.unvoiced_vca_a[i] + ' ' +
			//	this.unvoiced_vca_t[i] + ' ' +
			//	(this.unvoiced_vca_t[i + 1] - this.unvoiced_vca_t[i]));
		}
	}

	play_voiced()
	{
		var t0 = this.ctx.currentTime;

		for (let i = 0; i < this.voiced_vca_t.length - 1; i++) {
			this.voiced_vca.gain.setTargetAtTime(
				this.voiced_vca_a[i + 1],
				t0 + this.voiced_vca_t[i],
				(this.voiced_vca_t[i + 1] - this.voiced_vca_t[i]) / 30);
		}		
	}


	play()
	{
		if (this.long_unvoiced) {
			setTimeout(() => {
				this.stop_unvoiced();
			}, 300);
		} else {
			this.play_unvoiced();
		}
		this.play_voiced();
	}


	stop_unvoiced()
	{
		var t0 = this.ctx.currentTime;
		this.unvoiced_vca.gain.setTargetAtTime(0.001, t0 + 0.02, 0.02 / 30);		
	}


	stop_voiced()
	{
		var t0 = this.ctx.currentTime;
		this.voiced_vca.gain.setTargetAtTime(0.001, t0 + 0.1, 0.1 / 30);
	}


	Enable(flag)
	{
		if (flag) {
			this.unvoiced_vca.gain.value = 0.001;
			this.voiced_vca.gain.value = 0.001;
			this.unvoiced_sw.gain.value = 1;
			this.voiced_sw.gain.value = 1;
			//console.log(' select "' + this.str + '"');
			if (this.long_unvoiced) {
				this.play_unvoiced();
			}

		} else {
			this.unvoiced_sw.gain.value = 0.001;
			this.voiced_sw.gain.value = 0.001;
			//console.log(' off ' + this.str);
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
		this.unvoiced_sw = this.ctx.createGain();
		this.voiced = this.osc;
		this.voiced_vca = this.ctx.createGain();
		this.voiced_level = this.ctx.createGain();
		this.voiced_sw = this.ctx.createGain();

		this.noise.connect(this.unvoiced);
		this.unvoiced_vca.connect(this.unvoiced_level);
		this.unvoiced_level.connect(this.unvoiced_sw);
		this.voiced.connect(this.voiced_vca);
		this.voiced_vca.connect(this.voiced_level);
		this.voiced_level.connect(this.voiced_sw);

		if (use_f1f2) {
			this.unvoiced_sw.connect(this.f1);
			this.unvoiced_sw.connect(this.f2);
		} else {
			this.unvoiced_sw.connect(this.out);
		}
		this.voiced_sw.connect(this.f1);
		this.voiced_sw.connect(this.f2);

		this.Enable(false);
	}

}

class FilterManager
{
	constructor(ctx, osc, noise, f1, f2, out)
	{
		this.filters = [];

		this.filter_a = new Filter(ctx, osc, noise, f1, f2, out);
		this.filter_a.CreateFilter("a");
		this.filters.push(this.filter_a);

		this.filter_s = new Filter(ctx, osc, noise, f1, f2, out);
		this.filter_s.CreateFilter("s");
		this.filters.push(this.filter_s);

		this.filter_sy = new Filter(ctx, osc, noise, f1, f2, out);
		this.filter_sy.CreateFilter("sy");
		this.filters.push(this.filter_sy);

		this.filter_h = new Filter(ctx, osc, noise, f1, f2, out);
		this.filter_h.CreateFilter("h");
		this.filters.push(this.filter_h);

		this.filter_p = new Filter(ctx, osc, noise, f1, f2, out);
		this.filter_p.CreateFilter("p");
		this.filters.push(this.filter_p);

		this.selected = null;
	}

	select(str)
	{
		for (let i = 0; i < this.filters.length; i++) {
			if (this.filters[i].str == str) {
				//console.log(this.filters[i].str + ':' + str)
				if (this.selected != null) {
					this.selected.Enable(false);
					this.selected = null;
				}
				this.selected = this.filters[i];
				this.selected.Enable(true);
				break;
			}
		}
	}

	play()
	{
		if (this.selected != null) {
			this.selected.play();
		}
	}

	stop()
	{
		if (this.selected != null) {
			this.selected.stop_voiced();
		}
	}


	all_off()
	{
		for (let i = 0; i < this.filters.length; i++) {
			this.filters[i].Enable(false);
		}
	}
}

