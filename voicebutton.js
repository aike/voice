class VoicePad
{
	constructor(voice) {
		this.voice = voice;
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
console.log('pad down');		
		this.downing = true;
		this.downtime = audioctx.currentTime;
		this.posx = Math.min(Math.max(x, 0.0), 1.0);
		this.posy = Math.min(Math.max(y, 0.0), 1.0);
		this.voice.filter.F1.frequency.value = this.posx * 1000;
		this.voice.filter.F2.frequency.value = this.posy * 3000;

		console.log("in = " + x + " " + y);
		console.log("freq = " + (this.posx * 1000.0) + " " + (this.posy * 3000.0));

		for (var i = 0; i < this.consos.length; i++) {
			if (this.consos[i].isDown()) {
				this.consos[i].onVowelDown();
				return;
			}
		}
		this.play();
	}

	move(x, y) {
		setTimeout(()=>{
			this.posx = Math.min(Math.max(x, 0), 1);
			this.posy = Math.min(Math.max(y, 0), 1);
			this.voice.filter.F1.frequency.value = this.posx * 1000;
			this.voice.filter.F2.frequency.value = this.posy * 3000;
		},100);
	}

	downFreq(f1, f2)
	{
		this.down(f1 / 1000, f2 / 3000);
	}

	moveFreq(f1, f2)
	{
		this.move(f1 / 1000, f2 / 3000);
	}


	up() {
console.log('pad up');		
		this.downing = false;
		this.stop();
	}

	play() {
		this.playing = true;
		this.voice.play_eg();
	}

	stop() {
		this.playing = false;
		this.voice.stop();
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

class VoiceButton
{
	constructor(s, voice) {
		this.char = s;
		this.vowel = null;
		this.downing = false;
		this.playing = false;
		this.consotime = 100;
		this.voice = voice;
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
		this.voice.play_eg();
	}

	stop() {
		this.playing = false;
		this.voice.stop();
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

class Htype_VoiceButton extends VoiceButton
{
	constructor(s, voice) {
		super(s, voice);
	}

	down() {
		this.downing = true;
		this.downtime = audioctx.currentTime;
		if (this.vowel.isDown()) {
			this.play();
		}
	}

	up() {
		this.downing = false;
		this.stop();
	}

	onVowelDown() {
		this.play();
	}

	play() {
		this.playing = true;
		this.voice.play_eg();
		if (!this.vowel.isPlaying()) {
			this.vowel.play();
		}
	}
}

class Ptype_VoiceButton extends VoiceButton
{
	constructor(s, voice) {
		super(s, voice);
	}

	down() {
		this.downing = true;
		this.downtime = audioctx.currentTime;
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
		this.voice.play_eg();
		setTimeout(()=> {
			this.stop();
			this.vowel.play();
		}, this.consotime);
	}
}

class Stype_VoiceButton extends VoiceButton
{
	constructor(s, voice) {
		super(s, voice);
	}

	down() {
console.log('S down');
		this.downing = true;
		this.downtime = audioctx.currentTime;
		if (this.vowel.isDown()) {
			this.vowel.stop();
		}
		this.play();
	}

	up() {
console.log('S up');
		this.downing = false;
		this.stop();
		if (this.vowel.isDown()) {
			this.vowel.play();
		}
	}

	onVowelDown() {
console.log('S onVowelDown');
		if (Math.abs(this.vowel.downtime - this.downtime) < 0.005) {
			setTimeout(()=> {
				this.stop();
				this.vowel.play();
			}, this.consotime);
		} else {
				console.log('here 1');
			setTimeout(()=>{
				console.log('here 2');
				this.stop();
			}, 300);
			this.vowel.play();			
		}
	}

	play() {
console.log('S play');
console.log(this.voice.consoFilter.frequency.value);
		this.playing = true;
		this.voice.play_eg();
		if (this.vowel.isDown()
			&& Math.abs(this.vowel.downtime - this.downtime) < 0.005) {
			setTimeout(()=> {
				setTimeout(()=>{
					this.stop();
				}, 300);
				this.vowel.play();
			}, this.consotime);
		}
	}
}

