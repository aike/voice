class Filter
{
	constructor()
	{
		this.conso = null;
		this.str = null;
		this.ctx = null;
	}

	CreateFilter(ctx, str, conso_out, vowel_out)
	{
		this.ctx = ctx;
		this.str = str;
		switch (str)
		{
			case "s":
				CreateObjects(ctx, true, conso_out);

				this.conso.type = "bandpass";
				this.conso.frequency.value = 8000;
				this.conso.Q.value = 5;
				this.conso_vca_t=[0, 0.05, 0.20, 0.3, 0.32, 1];
				this.conso_vca_a=[0, 0,    1,    1,   0,    0];
				this.conso_level.gain.value = 1.0;

				this.vowel.frequency.value = 1000;
				this.vowel.type = "sawtooth";
				this.vowel_vca_t=[0, 0.3, 0.5, 0.7, 0.8, 1];
				this.vowel_vca_a=[0, 0,   1,   1,   0,   0];
				this.vowel_level.gain.value = 0.1;
				break;

			case "sy":
				CreateObjects(ctx, true, conso_out);

				this.conso.type = "bandpass";
				this.conso.frequency.value = 4000;
				this.conso.Q.value = 5;
				this.conso_vca_t=[0, 0.05, 0.20, 0.3, 0.32, 1];
				this.conso_vca_a=[0, 0,    1,    1,   0,    0];
				this.conso_level.gain.value = 1.0;

				this.vowel.frequency.value = 1000;
				this.vowel.type = "sawtooth";
				this.vowel_vca_t=[0, 0.3, 0.5, 0.7, 0.8, 1];
				this.vowel_vca_a=[0, 0,   1,   1,   0,   0];
				this.vowel_level.gain.value = 0.1;

				break;

			case "h":
				CreateObjects(ctx, false, vowel_out);

				this.conso_vca_t=[0, 0.2, 0.25, 0.3, 0.32, 1];
				this.conso_vca_a=[0, 0,   1,    1,   0,    0];
				this.conso_level.gain.value = 0.7;

				this.vowel.frequency.value = 1000;
				this.vowel.type = "sawtooth";
				this.vowel_vca_t=[0, 0.3, 0.35, 0.7, 0.8, 1];
				this.vowel_vca_a=[0, 0,   1,    1,   0,   0];
				this.conso_level.gain.value = 0.3;

				break;

			case "p":
				CreateObjects(ctx, true, conso_out);

				this.conso.type = "bandpass";
				this.conso.frequency.value = 500;
				this.conso.Q.value = 2;
				this.conso_vca_t=[0, 0.27, 0.271, 0.272, 1];
				this.conso_vca_a=[0, 0,    1,     0,    0];
				this.conso_level.gain.value = 1.0;

				this.vowel.frequency.value = 1000;
				this.vowel.type = "sawtooth";
				this.vowel_vca_t=[0, 0.3, 0.5, 0.7, 0.8, 1];
				this.vowel_vca_a=[0, 0,   1,   1,   0,   0];
				this.conso_level.gain.value = 0.9;

				break;
		}
	}

	play_s()
	{
		var t0 = this.ctx.currentTime;
		for (let i = 0; i < this.cons_vca_t.length - 1; i++) {
			this.s_Gain.gain.setTargetAtTime(
				this.conso_vca_a[i],
				t0 + this.conso_vca_t[i],
				this.conso_vca_t[i + 1] - this.conso_vca_t[i]);
		}

		for (let i = 0; i < this.cons_vca_t.length - 1; i++) {
			this.s_Gain.gain.setTargetAtTime(
				this.vowel_vca_a[i],
				t0 + this.vowel_vca_t[i],
				this.vowel_vca_t[i + 1] - this.vowel_vca_t[i]);
		}
	}



	Enable(flag)
	{
		if (flag) {
			this.sw.gain = 1;
		} else {
			this.sw.gain = 0.001;
		}
	}

	CreateObjects(ctx, use_bpf, out_node)
	{
		if (use_bpf) {
			this.conso = ctx.createBiquadFilter();
			this.conso_vca = ctx.createGain();
			this.conso.connect(this.conso_vca);
		} else {
			this.conso_vca = ctx.createGain();
			this.conso = this.conso_vca;
		}
		this.conso_level = ctx.createGain();
		this.vowel = audioctx.createOscillator();
		this.vowel_vca = ctx.createGain();
		this.vowel_level = ctx.createGain();
		this.sw = ctx.createGain();

		this.conso_vca.connect(this.conso_level);
		this.conso_level.connect(this.sw);
		this.vowel.connect(this.vowel_vca);
		this.vowel_vca.connect(this_vowel_level);
		this.vowel_level.connect(this.sw);
		this.sw.connect(out_node);
	}

}

class FilterManager
{
	constructor(ctx, conso_out, vowel_out)
	{
		this.filters = [];

		this.filter_s = new Filter();
		this.filter_s.CreateFilter(ctx, "s", conso_out, vowel_out);
		this.filters.push(this.filters_s);

		this.filter_sy = new Filter();
		this.filter_sy.CreateFilter(ctx, "sy", conso_out, vowel_out);
		this.filters.push(this.filters_sy);

		this.filter_h = new Filter();
		this.filter_h.CreateFilter(ctx, "h", conso_out, vowel_out);
		this.filters.push(this.filters_h);

		this.filter_p = new Filter();
		this.filter_p.CreateFilter(ctx, "p", conso_out, vowel_out);
		this.filters.push(this.filters_p);

		this.selected = null;
	}

	select(str)
	{
		if (this.selected != null) {
			this.selected.Enable(false);
			this.selected = null;
		}

		for (let i = 0; i < this.filters.length; i++) {
			if (this.filters[i].str == str) {
				this.selected = this.filters[i];
				this.selected.Enable(true);
				break;
			}
		}
	}

	all_off()
	{
		for (let i = 0; i < this.filters.length; i++) {
			this.filters[i].Enable(false);
		}
	}
}

