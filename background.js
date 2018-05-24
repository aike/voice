class Background {

	constructor(element)
	{
		this.scale = 1.5;

		this.element = element;
		this.context = element.getContext('2d');
	}

	setScale(scale)
	{
		this.scale = scale;
	}

	draw() {
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

		this.y0 = this.gridy * 0;
		this.y1 = this.gridy * 1;
		this.y2 = this.gridy * 2;
		this.y3 = this.gridy * 3;
		this.y4 = this.gridy * 4;
		this.y5 = this.gridy * 5;
		this.y6 = this.gridy * 6;

		this.context.clearRect(0, 0, this.element.width, this.element.height);
		// this.context.fillStyle = 'rgb(0, 0, 0)';

		// var leftX = 30 * this.scale;

	 //    this.context.font = "24px 'Times New Roman'";

	 //    var rsize = 30 * this.scale;
	 //    this.context.fillText("T/D", leftX + (30-15) * this.scale,  220 * this.scale + this.oy);
	 //    this.context.beginPath();
	 //    this.context.arc(leftX + 30 * this.scale, 220 * this.scale + this.oy, rsize, 0, 2 * Math.PI);
	 //    this.context.stroke();

	 //    this.context.fillText("K/G", leftX + (80-15) * this.scale,  150 * this.scale + this.oy);
	 //    this.context.beginPath();
	 //    this.context.arc(leftX + 80 * this.scale, 150 * this.scale + this.oy, rsize, 0, 2 * Math.PI);
	 //    this.context.stroke();

	 //    this.context.fillText("P/B", leftX + (155-15) * this.scale,  200 * this.scale + this.oy);
	 //    this.context.beginPath();
	 //    this.context.arc(leftX + 155 * this.scale, 200 * this.scale + this.oy, rsize, 0, 2 * Math.PI);
	 //    this.context.stroke();

	 //    this.context.fillText("S/Z", leftX + (200-15) * this.scale,  270 * this.scale + this.oy);
	 //    this.context.beginPath();
	 //    this.context.arc(leftX + 200 * this.scale, 270 * this.scale + this.oy, rsize, 0, 2 * Math.PI);
	 //    this.context.stroke();

	 //    this.context.fillText("Unvoice", leftX + (80-30) * this.scale,  330 * this.scale + this.oy);
	 //    this.context.beginPath();
	 //    this.context.arc(leftX + 80 * this.scale, 330 * this.scale + this.oy, 60 * this.scale, 0, 2 * Math.PI);
	 //    this.context.stroke();


	    ///////////////////////////////////////////////////////////////////
	    // スライダ



	 //    this.context.font = "16px 'Times New Roman'";
	 //    this.context.fillText("Pitch", 35 * this.scale,  -10 * this.scale + this.oy);
	 //    this.context.fillText("Level", 100 * this.scale,  -10 * this.scale + this.oy);

	 //    var leftX = 30 * this.scale;
	 //    var sliderWidth = 35 * this.scale;
	 //    var sliderGap = 30 * this.scale;
	 //    this.context.beginPath();
	 //    this.context.moveTo(leftX, this.y0 + this.oy);
	 //    this.context.lineTo(leftX + sliderWidth, this.y0 + this.oy);
	 //    this.context.lineTo(leftX + sliderWidth, this.y6 + this.oy);
	 //    this.context.lineTo(leftX, this.y6 + this.oy);
	 //    this.context.lineTo(leftX, this.y0 + this.oy);
	 //    this.context.stroke();
		// this.context.fillStyle = 'rgb(128, 128, 128)';
	 //    this.context.fillRect(leftX + 1, this.y3 + this.oy, sliderWidth - 2, 10 * this.scale);
		// this.context.fillStyle = 'rgb(0, 0, 0)';

	 //    leftX += sliderWidth + sliderGap;
	 //    this.context.beginPath();
	 //    this.context.moveTo(leftX, this.y0 + this.oy);
	 //    this.context.lineTo(leftX + sliderWidth, this.y0 + this.oy);
	 //    this.context.lineTo(leftX + sliderWidth, this.y6 + this.oy);
	 //    this.context.lineTo(leftX, this.y6 + this.oy);
	 //    this.context.lineTo(leftX, this.y0 + this.oy);
	 //    this.context.stroke();
		// this.context.fillStyle = 'rgb(128, 128, 128)';
	 //    this.context.fillRect(leftX + 1, this.y3 + this.oy, sliderWidth - 2, 10 * this.scale);
		// this.context.fillStyle = 'rgb(0, 0, 0)';


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
	    this.context.font = "16px 'Times New Roman'";
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

	    var l1 = document.getElementById("l1");
	    var l2 = document.getElementById("l2");
	    var l3 = document.getElementById("l3");
	    var r1 = document.getElementById("r1");
	    var s1 = document.getElementById("s1");
	    l1.style.left  = Math.floor(this.ox + 385 * this.scale) + "px";
	    l1.style.top   = Math.floor(this.oy + 275 * this.scale) + "px";
	    l1.style.width = Math.floor(100 * this.scale) + "px";
	    l2.style.left  = Math.floor(this.ox + 350 * this.scale) + "px";
	    l2.style.top   = Math.floor(this.oy + 290 * this.scale) + "px";
	    l2.style.width = Math.floor(100 * this.scale) + "px";
	    l3.style.left  = Math.floor(this.ox + 440 * this.scale) + "px";
	    l3.style.top   = Math.floor(this.oy + 290 * this.scale) + "px";
	    l3.style.width = Math.floor(100 * this.scale) + "px";
	    r1.style.left  = Math.floor(this.ox + 350 * this.scale) + "px";
	    r1.style.top   = Math.floor(this.oy + 310 * this.scale) + "px";
	    r1.style.width = Math.floor(100 * this.scale) + "px";
	    s1.style.left  = Math.floor(this.ox + 350 * this.scale) + "px";
	    s1.style.top   = Math.floor(this.oy +   0 * this.scale) + "px";
	    s1.style.width = Math.floor(130 * this.scale) + "px";

		background.addButton(30, 220, " s");
		background.addButton(130, 240, "sh");
	}

	addButton(x, y, char)
	{
		this.context.fillStyle = 'rgb(0, 0, 0)';

		var leftX = 30 * this.scale;

	    this.context.font = "24px 'Times New Roman'";

	    var rsize = 30 * this.scale;
	    this.context.fillText(char, leftX + (x - 10) * this.scale,  (y + 5) * this.scale + this.oy);
	    this.context.beginPath();
	    this.context.arc(leftX + x * this.scale, y * this.scale + this.oy, rsize, 0, 2 * Math.PI);
	    this.context.stroke();
	}
}