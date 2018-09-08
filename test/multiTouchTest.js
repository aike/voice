var assert = chai.assert;
mocha.timeout(15000);

describe('母音と子音の同時押しテスト', ()=> {
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

	describe('子音をDown/Up→母音をDown/Up', ()=> {
						  //c,  v, cdownc, cupc,vdownc,vdownv,vtimec,vtimev,vupv, done) {
		it ('h', (done)=> {
			seq.CD_CU_VD_VU(h,  v, false, false, false, true, false, true, false, done);
		});
		it ('s', (done)=> {
			seq.CD_CU_VD_VU(s,  v,  true, false, false, true, false, true, false, done);
		});
		it ('sh', (done)=> {
			seq.CD_CU_VD_VU(sh, v,  true, false, false, true, false, true, false, done);
		});
		it ('ts', (done)=> {
			seq.CD_CU_VD_VU(ts, v, false, false, false, true, false, true, false, done);
		});
		it ('k', (done)=> {
			seq.CD_CU_VD_VU(k,  v, false, false, false, true, false, true, false, done);
		});
		it ('p', (done)=> {
			seq.CD_CU_VD_VU(p,  v, false, false, false, true, false, true, false, done);
		});
	});

	describe('子音Down→母音Down→子音Up→母音Up', ()=> {
		                  //c,  v, cdownc,vdownc,vdownv,vtimec,vtimev,cupc, vupv, done
		it ('h', (done)=> {
			seq.CD_VD_CU_VU(h,  v, false,  true,  true,  true, true, false, false, done);
		});
		it ('s', (done)=> {
			seq.CD_VD_CU_VU(s,  v, true,  false,  true, false, true, false, false, done);
		});
		it ('sh', (done)=> {
			seq.CD_VD_CU_VU(sh, v, true,  false,  true, false, true, false, false, done);
		});
		it ('ts', (done)=> {
			seq.CD_VD_CU_VU(ts, v, false,  true,  false, false, true, false, false, done);
		});
		it ('k', (done)=> {
			seq.CD_VD_CU_VU(k, v, false,  true,  false, false, true, false, false, done);
		});
		it ('p', (done)=> {
			seq.CD_VD_CU_VU(p, v, false,  true,  false, false, true, false, false, done);
		});
	});

	describe('母音Down→子音Down→子音Up→母音Up', ()=> {
							 //   vdownv,cdownc,cdownv,ctimec,ctimev,cupc, vupv
		it ('h', (done)=> {
			seq.VD_CD_CU_VU(h,  v, true,  true,  true, true, true, false, false, done);
		});
		it ('s', (done)=> {
			seq.VD_CD_CU_VU(s,  v, true,  true, false, true, false, false, false, done);
		});
		it ('sh', (done)=> {
			seq.VD_CD_CU_VU(sh, v, true,  true, false, true, false, false, false, done);
		});
		it ('ts', (done)=> {
			seq.VD_CD_CU_VU(ts, v, true,  true, false, false, true, false, false, done);
		});
		it ('k', (done)=> {
			seq.VD_CD_CU_VU(k,  v, true,  true, false, false, true, false, false, done);
		});
		it ('p', (done)=> {
			seq.VD_CD_CU_VU(p,  v, true,  true, false, false, true, false, false, done);
		});
	});


	after(()=> {

	});
});


class InputSequence
{
	constructor() {
		this.holdTime = 200;
		this.endInterval = 200;
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
		v.down(0.5,0.5);
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
			v.down(0.5, 0.5);
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
		v.down(0.5, 0.5);
		assert.equal(v.isPlaying(), vdownv);
		setTimeout(()=>{
			c.down();
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

