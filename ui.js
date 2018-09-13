class UI {

	constructor(element)
	{
		this.scale = 1.5;

		this.element = element;
		this.context = element.getContext('2d');

		this.vowel = new VoicePad(new Voice("a"));
		this.conso = {};
		this.conso["h" ] = new Htype_VoiceButton("h" , new Voice("h" ));
		this.conso["s" ] = new Stype_VoiceButton("s" , new Voice("s" ));
		this.conso["sy"] = new Stype_VoiceButton("sy", new Voice("sy"));
		this.conso["t" ] = new Ptype_VoiceButton("t" , new Voice("t" ));
		this.conso["k" ] = new Ptype_VoiceButton("k" , new Voice("k" ));
		this.conso["p" ] = new Ptype_VoiceButton("p" , new Voice("p" ));

		for (var c in this.conso) {
			this.vowel.addConso(this.conso[c]);
			this.conso[c].addVowel(this.vowel);
		}
	}

	setScale(scale)
	{
		this.scale = scale;
	}

	draw()
	{
		this.buttons = [];

		this.ox = 350 * this.scale;
		this.oy = 80 * this.scale;
		this.gridx = 60 * this.scale;
		this.gridy = 50 * this.scale;

		this.x0 = this.gridx * 0;
		this.x1 = this.gridx * 1;
		this.x2 = this.gridx * 2;
		this.x3 = this.gridx * 3;
		this.x4 = this.gridx * 4;
		this.x5 = this.gridx * 5;
		this.xlen = this.x5 - this.x0;

		this.y0 = this.gridy * 0;
		this.y1 = this.gridy * 1;
		this.y2 = this.gridy * 2;
		this.y3 = this.gridy * 3;
		this.y4 = this.gridy * 4;
		this.y5 = this.gridy * 5;
		this.y6 = this.gridy * 6;
		this.ylen = this.y6 - this.y0;

		this.context.clearRect(0, 0, this.element.width, this.element.height);

		// 縦軸
		this.context.beginPath();
		this.context.moveTo(this.x0 + this.ox, this.y0 + this.oy);
		this.context.lineTo(this.x0 + this.ox, this.y6 + this.oy);
		this.context.moveTo(this.x1 + this.ox, this.y0 + this.oy);
		this.context.lineTo(this.x1 + this.ox, this.y6 + this.oy);
		this.context.moveTo(this.x2 + this.ox, this.y0 + this.oy);
		this.context.lineTo(this.x2 + this.ox, this.y6 + this.oy);
		this.context.moveTo(this.x3 + this.ox, this.y0 + this.oy);
		this.context.lineTo(this.x3 + this.ox, this.y6 + this.oy);
		this.context.moveTo(this.x4 + this.ox, this.y0 + this.oy);
		this.context.lineTo(this.x4 + this.ox, this.y6 + this.oy);
		this.context.moveTo(this.x5 + this.ox, this.y0 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.y6 + this.oy);
		this.context.stroke();

		// 横軸
		this.context.beginPath();
		this.context.moveTo(this.x0 + this.ox, this.y0 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.y0 + this.oy);
		this.context.moveTo(this.x0 + this.ox, this.y1 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.y1 + this.oy);
		this.context.moveTo(this.x0 + this.ox, this.y2 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.y2 + this.oy);
		this.context.moveTo(this.x0 + this.ox, this.y3 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.y3 + this.oy);
		this.context.moveTo(this.x0 + this.ox, this.y4 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.y4 + this.oy);
		this.context.moveTo(this.x0 + this.ox, this.y5 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.y5 + this.oy);
		this.context.moveTo(this.x0 + this.ox, this.x5 + this.oy);
		this.context.lineTo(this.x5 + this.ox, this.x5 + this.oy);
		this.context.stroke();

		// ラベル
		var fontsize = String(Math.floor(14 * this.scale));
		this.context.font = fontsize + "px 'Times New Roman'";
		this.context.fillText("a", 250 * this.scale + this.ox,  184 * this.scale + this.oy);
		this.context.fillText("i",  75 * this.scale + this.ox,   73 * this.scale + this.oy);
		this.context.fillText("u",  71 * this.scale + this.ox,  184 * this.scale + this.oy);
		this.context.fillText("e", 160 * this.scale + this.ox,  113 * this.scale + this.oy);
		this.context.fillText("o", 160 * this.scale + this.ox,  224 * this.scale + this.oy);
		this.context.fillText("F1 [Hz]", 125 * this.scale + this.ox,  350 * this.scale + this.oy);
		this.context.save();
		this.context.rotate(-Math.PI / 2);
		this.context.fillText("F2 [Hz]", -165 * this.scale - this.oy,  -40 * this.scale + this.ox);
		this.context.restore();

		// X軸
		this.context.fillText(   "0",  -4 * this.scale + this.ox, 320 * this.scale + this.oy);
		this.context.fillText( "200",  48 * this.scale + this.ox, 320 * this.scale + this.oy);
		this.context.fillText( "400", 108 * this.scale + this.ox, 320 * this.scale + this.oy);
		this.context.fillText( "600", 168 * this.scale + this.ox, 320 * this.scale + this.oy);
		this.context.fillText( "800", 228 * this.scale + this.ox, 320 * this.scale + this.oy);
		this.context.fillText("1000", 284 * this.scale + this.ox, 320 * this.scale + this.oy);

		// Y軸
		this.context.fillText("3000", -30 * this.scale + this.ox,   6 * this.scale + this.oy);
		this.context.fillText("2500", -30 * this.scale + this.ox,  56 * this.scale + this.oy);
		this.context.fillText("2000", -30 * this.scale + this.ox, 106 * this.scale + this.oy);
		this.context.fillText("1500", -30 * this.scale + this.ox, 156 * this.scale + this.oy);
		this.context.fillText("1000", -30 * this.scale + this.ox, 206 * this.scale + this.oy);
		this.context.fillText( "500", -23 * this.scale + this.ox, 256 * this.scale + this.oy);
		this.context.fillText(   "0", -17 * this.scale + this.ox, 306 * this.scale + this.oy);

		// 母音
		this.context.fillStyle = 'rgb(20, 20, 255)';
		this.context.beginPath();
		var size = 4 * this.scale;
		this.context.arc((800 / 1000 * 300) * this.scale + this.ox, (300 - 1200 / 3000 * 300) * this.scale + this.oy, size, 0, 2 * Math.PI);
		this.context.fill();
		this.context.beginPath();
		this.context.arc((500 / 1000 * 300) * this.scale + this.ox, (300 - 1900 / 3000 * 300) * this.scale + this.oy, size, 0, 2 * Math.PI);
		this.context.fill();
		this.context.beginPath();
		this.context.arc((300 / 1000 * 300) * this.scale + this.ox, (300 - 2300 / 3000 * 300) * this.scale + this.oy, size, 0, 2 * Math.PI);
		this.context.fill();
		this.context.beginPath();
		this.context.arc((300 / 1000 * 300) * this.scale + this.ox, (300 - 1200 / 3000 * 300) * this.scale + this.oy, size, 0, 2 * Math.PI);
		this.context.fill();
		this.context.beginPath();
		this.context.arc((500 / 1000 * 300) * this.scale + this.ox, (300 -  800 / 3000 * 300) * this.scale + this.oy, size, 0, 2 * Math.PI);
		this.context.fill();

		this.addButton( 110,  20, "k");
		this.addButton( 110,  90, "s");
		this.addButton( 180,  90, "sy");
		this.addButton( 110, 160, "t");
		this.addButton( 110, 230, "h");
		this.addButton( 110, 300, "p");
	}

	checkPad(x, y)
	{
		x -= this.ox;
		y -= this.oy;
		if ((x >= this.x0) && (x <= this.x5)
		&&  (y >= this.y0) && (y <= this.y6)) {
			return true;
		}
		return false;
	}

	checkButton(x, y)
	{
		var found = -1;

		var rsize = 30 * this.scale;
		for (var i in this.buttons)
		{
			if ((x > this.buttons[i].x - rsize) && (x < this.buttons[i].x + rsize)
			 && (y > this.buttons[i].y - rsize) && (y < this.buttons[i].y + rsize)) {
				if (found >= 0) {
					if (this.buttons[i].x < this.buttons[found].x) {
						found = i;
					}
				} else {
					found = i;
				}
			}
		}
		if (found >= 0) {
			return this.buttons[found];
		}

		return null;
	}

	addButton(x, y, char)
	{
		this.context.fillStyle = 'rgb(0, 0, 0)';
		var leftX = 30 * this.scale;
		var charX = x - char.length * 6;

		this.context.font = (24 * this.scale) + "px 'Times New Roman'";
		var rsize = 30 * this.scale;
		this.context.fillText(char, leftX + charX * this.scale,  (y + 5) * this.scale + this.oy);
		this.context.beginPath();
		this.context.arc(leftX + x * this.scale, y * this.scale + this.oy, rsize, 0, 2 * Math.PI);
		this.context.stroke();

		this.buttons.push(
			{x:leftX + x * this.scale, y:this.oy + (y-10) * this.scale, char:char, voice:this.conso[char]});
	}

}
