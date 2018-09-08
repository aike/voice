var assert = chai.assert;
mocha.timeout(15000);

describe('母音テストプレイ', ()=> {
	var v,h,s,sh,ts,k,p;
	var seq;

	before(()=> {
		v = new VoicePad(new Voice("a"));
		h = new Htype_VoiceButton("h", new Voice("h"));
		v.addConso(h);
		h.addVowel(v);
		s = new Stype_VoiceButton("s", new Voice("s"));
		v.addConso(s);
		s.addVowel(v);
		sh = new Stype_VoiceButton("sy", new Voice("sy"));
		v.addConso(sh);
		sh.addVowel(v);
		ts = new Ptype_VoiceButton("t", new Voice("t"));
		v.addConso(ts);
		ts.addVowel(v);
		k = new Ptype_VoiceButton("k", new Voice("k"));
		v.addConso(k);
		k.addVowel(v);
		p = new Ptype_VoiceButton("p", new Voice("p"));
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

	describe('母音を切らずに発音（座標指定）', ()=> {
		it ('h', (done)=> {
			seq.aiueoTenutoPos(h,  v, done);
		});
		it ('s', (done)=> {
			seq.aiueoTenutoPos(s,  v, done);
		});
		it ('sh', (done)=> {
			seq.aiueoTenutoPos(sh, v, done);
		});
		it ('ts', (done)=> {
			seq.aiueoTenutoPos(ts, v, done);
		});
		it ('k', (done)=> {
			seq.aiueoTenutoPos(k,  v, done);
		});
		it ('p', (done)=> {
			seq.aiueoTenutoPos(p,  v, done);
		});
	});

	after(()=> {

	});
});


class InputSequence
{
	constructor() {
		this.consoTime = 100;
		this.holdTime = 200;
		this.interval = 100;
		this.endInterval = 200;
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
			setTimeout(()=>{
				v.up();
				setTimeout(()=>{
					c.down();
					v.downFreq(250, 2300);	// i
					setTimeout(()=>{
						c.up();
						setTimeout(()=>{
							v.up();
							setTimeout(()=>{
								c.down();
								v.downFreq(250, 1200);	// u
								setTimeout(()=>{
									c.up();
									setTimeout(()=>{
										v.up();
										setTimeout(()=>{
											c.down();
											v.downFreq(500, 1900);	// e
											setTimeout(()=>{
												c.up();
												setTimeout(()=>{
													v.up();
													setTimeout(()=>{
														c.down();
														v.downFreq(500, 800);	// o
														setTimeout(()=>{
															c.up();
															setTimeout(()=>{
																v.up();
																console.log('AIUEO done ' + c.char);
																setTimeout(()=>{done();}, this.endInterval);
															}, this.holdTime);
														}, this.consoTime);
													}, this.interval);
												}, this.holdTime);
											}, this.consoTime);
										}, this.interval);
									}, this.holdTime);
								}, this.consoTime);
							}, this.interval);
						}, this.holdTime);
					}, this.consoTime);
				}, this.interval);
			}, this.holdTime);
		}, this.consoTime);
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

	// 母音を切らずに発音(座標指定)
	aiueoTenutoPos(c, v, done) {
		console.log('AIUEO start ' + c.char);
		c.init();
		v.init();

		c.down();
		v.down(0.8, 0.4);	// a
		setTimeout(()=>{
			c.up();
			setTimeout(()=>{
				c.down();
				v.move(0.3, 0.8);	// i
				setTimeout(()=>{
					c.up();
					setTimeout(()=>{
						c.down();
						v.move(0.2, 0.4);	// u
						setTimeout(()=>{
							c.up();
							setTimeout(()=>{
								c.down();
								v.move(0.5, 0.7);	// e
								setTimeout(()=>{
									c.up();
									setTimeout(()=>{
										c.down();
										v.move(0.6, 0.25);	// o
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

