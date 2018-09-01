class Pad
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
		this.voice.play();
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

class Button
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

class Htype_Button extends Button
{
	constructor(s, voice) {
		super(s, voice);
	}

	down() {
		this.downing = true;
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
		this.voice.play();
		if (!this.vowel.isPlaying()) {
			this.vowel.play();
		}
	}
}

class Ptype_Button extends Button
{
	constructor(s, voice) {
		super(s, voice);
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
		this.voice.play();
		setTimeout(()=> {
			this.stop();
			this.vowel.play();
		}, this.consotime);
	}
}

class Stype_Button extends Button
{
	constructor(s, voice) {
		super(s, voice);
	}

	down() {
		this.downing = true;
		if (this.vowel.isDown()) {
			this.vowel.stop();
		}
		this.play();
	}

	up() {
		this.downing = false;
		this.stop();		
		if (this.vowel.isDown()) {
			this.vowel.play();
		}
	}

	onVowelDown() {
		this.stop();
		this.vowel.play();
		console.log('stop ' + this.char)
	}

	play() {
		this.playing = true;
		this.voice.play();
		console.log('play ' + this.char)
	}
}

