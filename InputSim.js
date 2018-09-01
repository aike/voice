var assert = chai.assert;

describe('Conso/Vowel', ()=> {
	var v,h,s,sh,ts,k,p;
	var sim;

	before(()=> {
		v = new Pad(new Voice("a"));
		h = new Htype_Button("h", new Voice("h"));
		v.addConso(h);
		h.addVowel(v);
		s = new Stype_Button("s", new Voice("s"));
		v.addConso(s);
		s.addVowel(v);
		sh = new Stype_Button("sh", new Voice("sh"));
		v.addConso(sh);
		sh.addVowel(v);
		ts = new Ptype_Button("ts", new Voice("ts"));
		v.addConso(ts);
		ts.addVowel(v);
		k = new Ptype_Button("k", new Voice("k"));
		v.addConso(k);
		k.addVowel(v);
		p = new Ptype_Button("p", new Voice("p"));
		v.addConso(p);
		p.addVowel(v);

		sim = new InputSim();
	});

	// describe('子音をDown/Up→母音をDown/Up', ()=> {
	// 	it ('h', (done)=> {
	// 		sim.CD_CU_VD_VU(h,  v, false, false, false, true, false, true, false, done);
	// 	});
	// 	it ('s', (done)=> {
	// 		sim.CD_CU_VD_VU(s,  v,  true, false, false, true, false, true, false, done);
	// 	});
	// 	it ('sh', (done)=> {
	// 		sim.CD_CU_VD_VU(sh, v,  true, false, false, true, false, true, false, done);
	// 	});
	// 	it ('ts', (done)=> {
	// 		sim.CD_CU_VD_VU(ts, v, false, false, false, true, false, true, false, done);
	// 	});
	// 	it ('k', (done)=> {
	// 		sim.CD_CU_VD_VU(k,  v, false, false, false, true, false, true, false, done);
	// 	});
	// 	it ('p', (done)=> {
	// 		sim.CD_CU_VD_VU(p,  v, false, false, false, true, false, true, false, done);
	// 	});
	// });

	describe('子音Down→母音Down→子音Up→母音Up', ()=> {
		                  //c,  v, cdownc,vdownc,vdownv,vtimec,vtimev,cupc, vupv, done
		it ('h', (done)=> {
			sim.CD_VD_CU_VU(h,  v, false,  true,  true,  true, true, false, false, done);
		});
		it ('s', (done)=> {
			sim.CD_VD_CU_VU(s,  v, true,  false,  true, false, true, false, false, done);
		});
		it ('sh', (done)=> {
			sim.CD_VD_CU_VU(sh, v, true,  false,  true, false, true, false, false, done);
		});
		it ('ts', (done)=> {
			sim.CD_VD_CU_VU(ts, v, false,  true,  false, false, true, false, false, done);
		});
		it ('k', (done)=> {
			sim.CD_VD_CU_VU(k, v, false,  true,  false, false, true, false, false, done);
		});
		it ('p', (done)=> {
			sim.CD_VD_CU_VU(p, v, false,  true,  false, false, true, false, false, done);
		});
	});

	// describe('母音Down→子音Down→子音Up→母音Up', ()=> {
	// 	it ('h', (done)=> {     //vdownv,cdownc,cdownv,ctimec,ctimev,cupc, vupv
	// 		sim.VD_CD_CU_VU(h,  v, true,  true,  true, true, true, false, false, done);
	// 	});
	// 	it ('s', (done)=> {
	// 		sim.VD_CD_CU_VU(s,  v, true,  true, false, true, false, false, false, done);
	// 	});
	// 	it ('sh', (done)=> {
	// 		sim.VD_CD_CU_VU(sh, v, true,  true, false, true, false, false, false, done);
	// 	});
	// 	it ('ts', (done)=> {
	// 		sim.VD_CD_CU_VU(ts, v, true,  true, false, false, true, false, false, done);
	// 	});
	// 	it ('k', (done)=> {
	// 		sim.VD_CD_CU_VU(k,  v, true,  true, false, false, true, false, false, done);
	// 	});
	// 	it ('p', (done)=> {
	// 		sim.VD_CD_CU_VU(p,  v, true,  true, false, false, true, false, false, done);
	// 	});
	// });


	after(()=> {

	});
});


class InputSim
{
	constructor() {
		this.holdTime = 300;
		this.endInterval = 400;
	}

	// 子音をDown/Up→母音をDown/Up （子音の影響は受けない）
	CD_CU_VD_VU(c, v, cdownc, cupc, vdownc, vdownv, vtimec, vtimev, vupv, done) {
		console.log('CD_CU_VD_VU start ' + c.char);
		c.init();
		v.init();
		c.down();
		assert.equal(cdownc, c.isPlaying());
		c.up();
		assert.equal(cupc, c.isPlaying());
		v.down(10,10);
		assert.equal(vdownc, c.isPlaying());
		assert.equal(vdownv, v.isPlaying());
		setTimeout(()=>{
			assert.equal(vtimec, c.isPlaying());
			assert.equal(vtimev, v.isPlaying());
			v.up();
			assert.equal(vupv, v.isPlaying());
			console.log('CD_CU_VD_VU done ' + c.char);
			setTimeout(()=> {done();}, this.endInterval);
		}, this.holdTime);
	}

	// 子音Down中に母音をDown→子音Up、母音Up （通常の子音→母音連鎖）
	CD_VD_CU_VU(c, v, cdownc, vdownc, vdownv, vtimec, vtimev, cupc, vupv, done) {
		console.log('CD_VD_CU_VU start ' + c.char);
		c.init();
		v.init();
		c.down();
		assert.equal(cdownc, c.isPlaying());
		setTimeout(()=>{
			v.down(10, 10);
			assert.equal(vdownc, c.isPlaying());
			assert.equal(vdownv, v.isPlaying());
			setTimeout(()=>{
				assert.equal(vtimec, c.isPlaying());
				assert.equal(vtimev, v.isPlaying());
				c.up();
				assert.equal(cupc, c.isPlaying());
				setTimeout(()=>{
					v.up();
					assert.equal(vupv, v.isPlaying());
					console.log('CD_VD_CU_VU done ' + c.char);
					setTimeout(()=> {done();}, this.endInterval);
				}, this.holdTime);
			}, this.holdTime);
		}, this.holdTime);
	}

	// 母音Down中に子音をDown/Up （オハヨウのハ発音して母音に戻る）
	VD_CD_CU_VU(c, v, vdownv, cdownc, cdownv, ctimec, ctimev, cupc, vupv, done) {
		console.log('VD_CD_CU_VU start ' + c.char);
		c.init();
		v.init();
		v.down();
		assert.equal(v.isPlaying(), vdownv);
		setTimeout(()=>{
			c.down(10, 10);
			assert.equal(c.isPlaying(), cdownc);
			assert.equal(v.isPlaying(), cdownv);
			setTimeout(()=>{
				assert.equal(c.isPlaying(), ctimec);
				assert.equal(v.isPlaying(), ctimev);
				c.up();
				assert.equal(c.isPlaying(), cupc);
				setTimeout(()=>{
					v.up();
					assert.equal(v.isPlaying(), vupv);
					console.log('VD_CD_CU_VU done ' + c.char);
					setTimeout(()=> {done();}, this.endInterval);
				}, this.holdTime);
			}, this.holdTime);
		}, this.holdTime);
	}
}

