var assert = chai.assert;
mocha.timeout(5000);

describe('母音テストプレイ', ()=> {
	var v,h,s,sh,ts,k,p;
	var seq;

	before(()=> {
		v = new Pad(new Voice("a"));
		h = new Htype_Button("h", new Voice("h"));
		v.addConso(h);
		h.addVowel(v);
		s = new Stype_Button("s", new Voice("s"));
		v.addConso(s);
		s.addVowel(v);
		sh = new Stype_Button("sy", new Voice("sy"));
		v.addConso(sh);
		sh.addVowel(v);
		ts = new Ptype_Button("t", new Voice("t"));
		v.addConso(ts);
		ts.addVowel(v);
		k = new Ptype_Button("k", new Voice("k"));
		v.addConso(k);
		k.addVowel(v);
		p = new Ptype_Button("p", new Voice("p"));
		v.addConso(p);
		p.addVowel(v);

		seq = new InputSequence();
	});

	describe('母音を都度切って発音', ()=> {
		it ('h', (done)=> {
			seq.aiueoStaccato(h,  v, done);
		});
		it ('s', (done)=> {
			seq.aiueoStaccato(s,  v, done);
		});
		it ('sh', (done)=> {
			seq.aiueoStaccato(sh, v, done);
		});
		it ('ts', (done)=> {
			seq.aiueoStaccato(ts, v, done);
		});
		it ('k', (done)=> {
			seq.aiueoStaccato(k,  v, done);
		});
		it ('p', (done)=> {
			seq.aiueoStaccato(p,  v, done);
		});
	});

	describe('母音を切らずに発音', ()=> {
		it ('h', (done)=> {
			seq.aiueoTenuto(h,  v, done);
		});
		it ('s', (done)=> {
			seq.aiueoTenuto(s,  v, done);
		});
		it ('sh', (done)=> {
			seq.aiueoTenuto(sh, v, done);
		});
		it ('ts', (done)=> {
			seq.aiueoTenuto(ts, v, done);
		});
		it ('k', (done)=> {
			seq.aiueoTenuto(k,  v, done);
		});
		it ('p', (done)=> {
			seq.aiueoTenuto(p,  v, done);
		});
	});


	after(()=> {

	});
});


class InputSequence
{
	constructor() {
		this.holdTime = 200;
		this.interval = 200;
		this.endInterval = 500;
	}

	// 母音を都度切って発音
	aiueoStaccato(c, v, done) {
		console.log('AIUEO start ' + c.char);
		c.init();
		v.init();

		c.down();
		v.downFreq(800, 1200);	// a
		setTimeout(()=>{
			c.up();
			v.up();
			setTimeout(()=>{
				c.down();
				v.downFreq(250, 2300);	// i
				setTimeout(()=>{
					c.up();
					v.up();
					setTimeout(()=>{
						c.down();
						v.downFreq(250, 1200);	// u
						setTimeout(()=>{
							c.up();
							v.up();
							setTimeout(()=>{
								c.down();
								v.downFreq(500, 1900);	// e
								setTimeout(()=>{
									c.up();
									v.up();
									setTimeout(()=>{
										c.down();
										v.downFreq(500, 800);	// o
										setTimeout(()=>{
											c.up();
											v.up();
											console.log('AIUEO done ' + c.char);
											setTimeout(()=>{done();}, this.endInterval);
										}, this.holdTime);
									}, this.interval);
								}, this.holdTime);
							}, this.interval);
						}, this.holdTime);
					}, this.interval);
				}, this.holdTime);
			}, this.interval);
		}, this.holdTime);
	}

	// 母音を切らずに発音
	aiueoTenuto(c, v, done) {
		console.log('AIUEO start ' + c.char);
		c.init();
		v.init();

		c.down();
		v.downFreq(800, 1200);	// a
		setTimeout(()=>{
			c.up();
			setTimeout(()=>{
				c.down();
				v.downFreq(250, 2300);	// i
				setTimeout(()=>{
					c.up();
					setTimeout(()=>{
						c.down();
						v.downFreq(250, 1200);	// u
						setTimeout(()=>{
							c.up();
							setTimeout(()=>{
								c.down();
								v.downFreq(500, 1900);	// e
								setTimeout(()=>{
									c.up();
									setTimeout(()=>{
										c.down();
										v.downFreq(500, 800);	// o
										setTimeout(()=>{
											c.up();
											v.up();
											console.log('AIUEO done ' + c.char);
											setTimeout(()=>{done();}, this.endInterval);
										}, this.holdTime);
									}, this.interval);
								}, this.holdTime);
							}, this.interval);
						}, this.holdTime);
					}, this.interval);
				}, this.holdTime);
			}, this.interval);
		}, this.holdTime);
	}

}

