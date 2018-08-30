var assert = chai.assert;

describe('Conso/Vowel', ()=> {
	var v,h,s,sh,ts,k,p;
	var sim;

	before(()=> {
		v = new Pad();
		h = new Htype_Button("h");
		v.addConso(h);
		h.addVowel(v);
		s = new Stype_Button("s");
		v.addConso(s);
		s.addVowel(v);
		sh = new Stype_Button("sh");
		v.addConso(sh);
		sh.addVowel(v);
		ts = new Ptype_Button("ts");
		v.addConso(ts);
		ts.addVowel(v);
		k = new Ptype_Button("k");
		v.addConso(k);
		k.addVowel(v);
		p = new Ptype_Button("p");
		v.addConso(p);
		p.addVowel(v);

		sim = new InputSim();
	});

	describe('子音をDown/Up→母音をDown/Up', ()=> {
		it ('h', (done)=> {
			sim.CD_CU_VD_VU(h,  v, false, false, false, true, false, true, false, done);
		});
		it ('s', (done)=> {
			sim.CD_CU_VD_VU(s,  v,  true, false, false, true, false, true, false, done);
		});
		it ('sh', (done)=> {
			sim.CD_CU_VD_VU(sh, v,  true, false, false, true, false, true, false, done);
		});
		it ('ts', (done)=> {
			sim.CD_CU_VD_VU(ts, v, false, false, false, true, false, true, false, done);
		});
		it ('k', (done)=> {
			sim.CD_CU_VD_VU(k,  v, false, false, false, true, false, true, false, done);
		});
		it ('p', (done)=> {
			sim.CD_CU_VD_VU(p,  v, false, false, false, true, false, true, false, done);
		});
	});

	describe('子音Down→母音Down→子音Up→母音Up', ()=> {
		it ('h', (done)=> {
			sim.CD_VD_CU_VU(h,  v, false,  true,  true, false, true, false, false, done);
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

	describe('母音Down→子音Down→子音Up→母音Up', ()=> {
		it ('h', (done)=> {     //vdownv,cdownc,cdownv,ctimec,ctimev,cupc, vupv
			sim.VD_CD_CU_VU(h,  v, true,  true,  true, false, true, false, false, done);
		});
		it ('s', (done)=> {
			sim.VD_CD_CU_VU(s,  v, true,  true,  true, true, true, false, false, done);
		});
		it ('sh', (done)=> {
			sim.VD_CD_CU_VU(sh, v, true,  true,  true, true, true, false, false, done);
		});
		it ('ts', (done)=> {
			sim.VD_CD_CU_VU(ts, v, true,  true, false, false, true, false, false, done);
		});
		it ('k', (done)=> {
			sim.VD_CD_CU_VU(k,  v, true,  true, false, false, true, false, false, done);
		});
		it ('p', (done)=> {
			sim.VD_CD_CU_VU(p,  v, true,  true, false, false, true, false, false, done);
		});
	});


	after(()=> {

	});
});


class InputSim
{
	constructor() {
		this.timeout = 50;
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
			done();
		}, this.timeout);
	}

	// 子音Down中に母音をDown→子音Up、母音Up （通常の子音→母音連鎖）
	CD_VD_CU_VU(c, v, cdownc, vdownc, vdownv, vtimec, vtimev, cupc, vupv, done) {
		console.log('CD_VD_CU_VU start ' + c.char);
		c.init();
		v.init();
		c.down();
		assert.equal(cdownc, c.isPlaying());
		v.down(10, 10);
		assert.equal(vdownc, c.isPlaying());
		assert.equal(vdownv, v.isPlaying());
		setTimeout(()=>{
			assert.equal(vtimec, c.isPlaying());
			assert.equal(vtimev, v.isPlaying());
			c.up();
			assert.equal(cupc, c.isPlaying());
			v.up();
			assert.equal(vupv, v.isPlaying());
			console.log('CD_VD_CU_VU done ' + c.char);
			done();
		}, this.timeout);
	}

	// 母音Down中に子音をDown/Up （オハヨウのハ発音して母音に戻る）
	VD_CD_CU_VU(c, v, vdownv, cdownc, cdownv, ctimec, ctimev, cupc, vupv, done) {
		console.log('VD_CD_CU_VU start ' + c.char);
		c.init();
		v.init();
		v.down();
		assert.equal(v.isPlaying(), vdownv);
		c.down(10, 10);
		assert.equal(c.isPlaying(), cdownc);
		assert.equal(v.isPlaying(), cdownv);
		setTimeout(()=>{
			assert.equal(c.isPlaying(), ctimec);
			assert.equal(v.isPlaying(), ctimev);
			c.up();
			assert.equal(c.isPlaying(), cupc);
			v.up();
			assert.equal(v.isPlaying(), vupv);
			console.log('VD_CD_CU_VU done ' + c.char);
			done();
		}, this.timeout);
	}
}

class Pad
{
	constructor() {
		this.downing = false;
		this.playing = false;
		this.posx = 0;
		this.posy = 0;
		this.consos = [];
	}

	init() {
		this.stop();
		this.downing = false;
		this.playing = false;
		this.posx = 0;
		this.posy = 0;
	}

	down(x, y) {
		this.downing = true;
		this.posx = x;
		this.posy = y;

		for (var i = 0; i < this.consos.length; i++) {
			if (this.consos[i].isDown()) {
				this.consos[i].onVowelDown();
				return;
			}
		}
		this.play();
	}

	move(x, y) {
		this.posx = x;
		this.posy = y;
	}

	up() {
		this.downing = false;
		this.stop();
	}

	play() {
		this.playing = true;
	}

	stop() {
		this.playing = false;		
	}

	isDown() {
		return this.downing;
	}

	isPlaying() {
		return this.playing;
	}

	addConso(c) {
		this.consos.push(c);
	}

}

class Button
{
	constructor(s) {
		this.char = s;
		this.vowel = null;
		this.downing = false;
		this.playing = false;
		this.consotime = 10;
	}

	init() {
		this.downing = false;
		this.playing = false;
	}

	down() {
		this.downing = true;
	}

	up() {
		this.downing = false;
	}

	onVowelDown() {
	}

	play() {
		this.playing = true;
	}

	stop() {
		this.playing = false;		
	}

	isDown() {
		return this.downing;
	}

	isPlaying() {
		return this.playing;
	}

	addVowel(v) {
		this.vowel = v;
	}
}

class Htype_Button extends Button
{
	constructor(s) {
		super(s);
		this.vowel = null;
	}

	down() {
		this.downing = true;
		if (this.vowel.isDown()) {
			this.play();
		}
	}

	onVowelDown() {
		this.play();
	}

	play() {
		this.playing = true;
		if (!this.vowel.isPlaying()) {
			this.vowel.play();
		}
		setTimeout(()=> {
			this.stop();
		}, this.consotime);
	}
}

class Ptype_Button extends Button
{
	constructor(s) {
		super(s);
		this.vowel = null;
	}

	down() {
		this.downing = true;
		if (this.vowel.isDown()) {
			this.vowel.stop();
			this.play();
		}
	}

	onVowelDown() {
		this.play();
	}

	play() {
		this.playing = true;
		setTimeout(()=> {
			this.stop();
			this.vowel.play();
		}, this.consotime);
	}
}

class Stype_Button extends Button
{
	constructor(s) {
		super(s);
	}

	down() {
		this.downing = true;
		this.play();
	}

	up() {
		this.downing = false;
		this.stop();		
	}

	onVowelDown() {
		this.stop();
		this.vowel.play();
	}

	play() {
		this.playing = true;
	}
}

