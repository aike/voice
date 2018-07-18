
class Filter
{
	constructor(element)
	{
		this.conso = null;
		this.str = null;

	}

	CreateFilter(ctx, str, conso_out, vowel_out)
	{
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

