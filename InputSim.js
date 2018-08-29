class InputSim
{
	constructor() {
		this.v = new Pad();
		this.h = new Button("h");
	}



	function CtoV_h() {
		this.h.down();
		assert(this.h.isNotPlaying());
		this.h.up();
		assert(this.h.isNotPlaying());
		this.v.down(10,10);
		assert(this.h.isPlaying());
		SetTimeout(()=>{
			assert(this.h.isNotPlaying());
			assert(this.v.isPlaying());
			this.v.up();
			assert(this.v.isNotPlaying());
		}, 100);
	}

	function CheckCtov() {

		// 子音をUpしちゃったら母音Down時は母音のみの方がいいか？
										   //    子Dn   子Up    母Dn子  母Dn母  母D+t子 母D+t母  母Up
		// hは子Downでは鳴らない、母Downでは母音のみ
		CD_CU_VD_VU("C->V  h", this.h,  this.v,  false, false, false,  true, false,  true, false);
		// sは子Down時に子音を鳴らす、子音は子Up時に止まる、母Downでは母音のみ
		CD_CU_VD_VU("C->V  s", this.s,  this.v,   true, false, false,  true, false,  true, false);
		CD_CU_VD_VU("C->V sh", this.sh, this.v,   true, false, false,  true, false,  true, false);
		// tsは子Downでは鳴らない、母Downでは母音のみ
		CD_CU_VD_VU("C->V ts", this.ts,  this.v, false, false, false,  true, false,  true, false);
		CD_CU_VD_VU("C->V  k", this.ts,  this.v, false, false, false,  true, false,  true, false);
		CD_CU_VD_VU("C->V  p", this.ts,  this.v, false, false, false,  true, false,  true, false);


										   //   子Dn    母Dn子  母Dn母  母D+t子 母D+t母  子Up   母Up
		// hは母Down時に子音と母音を鳴らす、子Up時に子音を止める
		CD_VD_CU_VU("C->V  h", this.h,  this.v, false,  true,  true,  true,  true, false, false);
		// sは子Down時に子音を鳴らす、母Down時に子音を止めて母音を鳴らす
		CD_VD_CU_VU("C->V  s", this.s,  this.v,  true, false,  true, false,  true, false,  false);
		CD_VD_CU_VU("C->V sh", this.sh, this.v,  true, false,  true, false,  true, false,  false);
		// tsは母Down時に子音を鳴らす、子音は時間で止まる、母音は時間で鳴らす
		CD_VD_CU_VU("C->V ts", this.ts, this.v, false,  true, false, false,  true, false,  false);
		CD_VD_CU_VU("C->V  k", this.ts, this.v, false,  true, false, false,  true, false,  false);
		CD_VD_CU_VU("C->V  p", this.ts, this.v, false,  true, false, false,  true, false,  false);
	}


	function CD_CU_VD_VU(s, c, v, cdown, cup, vdownc, vdownv, vtimec, vtimev, vup) {
		console.log(s);
		c.down();
		assertEqual(c.isPlaying(), cdown);
		c.up();
		assertEqual(c.isPlaying(), cup);
		v.down(10,10);
		assertEqual(c.isPlaying(), vdownc);
		assertEqual(v.isPlaying(), vdownv);
		SetTimeout(()=>{
			assertEqual(c.isPlaying(), vtimec);
			assertEqual(v.isPlaying(), vtimev);
			v.up();
			assertEqual(v.isNotPlaying(), vup);
		}, 300);
	}

	function CD_VD_CU_VU(s, c, v, cdown, vdownc, vdownv, vtimec, vtimev, cup, vup) {
		console.log(s);
		c.down();
		assertEqual(c.isPlaying(), cdown);
		v.down(10, 10);
		assertEqual(c.isPlaying(), vdownc);
		assertEqual(v.isPlaying(), vdownv);
		SetTimeout(()=>{
			assertEqual(c.isPlaying(), vtimec);
			assertEqual(v.isPlaying(), vtimev);
			c.up();
			assertEqual(c.isPlaying(), cup);
			v.up();
			assertEqual(v.isNotPlaying(), vup);
		}, 300);
	}

	function VD_CD_CU_VU(s, c, v, vdown, cdownc, cdownv, ctimec, ctimev, cupc, cupv, vup) {
	}


}

