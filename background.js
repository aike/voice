class Background {
	
	constructor(element)
	{
		this.ox = 80;
		this.oy = 30;

		this.element = element;
		this.context = element.getContext('2d');
	}


	draw() {
	    ///////////////////////////////////////////////////////////////////
	    // 縦軸
	    this.context.beginPath();
	    this.context.moveTo(  0 + this.ox,   0 + this.oy);
	    this.context.lineTo(  0 + this.ox, 300 + this.oy);
	    this.context.moveTo( 60 + this.ox,   0 + this.oy);
	    this.context.lineTo( 60 + this.ox, 300 + this.oy);
	    this.context.moveTo(120 + this.ox,   0 + this.oy);
	    this.context.lineTo(120 + this.ox, 300 + this.oy);
	    this.context.moveTo(180 + this.ox,   0 + this.oy);
	    this.context.lineTo(180 + this.ox, 300 + this.oy);
	    this.context.moveTo(240 + this.ox,   0 + this.oy);
	    this.context.lineTo(240 + this.ox, 300 + this.oy);
	    this.context.moveTo(300 + this.ox,   0 + this.oy);
	    this.context.lineTo(300 + this.ox, 300 + this.oy);
	    this.context.stroke();

	    // 横軸
	    this.context.beginPath();
	    this.context.moveTo(  0 + this.ox,   0 + this.oy);
	    this.context.lineTo(300 + this.ox,   0 + this.oy);
	    this.context.moveTo(  0 + this.ox,  50 + this.oy);
	    this.context.lineTo(300 + this.ox,  50 + this.oy);
	    this.context.moveTo(  0 + this.ox, 100 + this.oy);
	    this.context.lineTo(300 + this.ox, 100 + this.oy);
	    this.context.moveTo(  0 + this.ox, 150 + this.oy);
	    this.context.lineTo(300 + this.ox, 150 + this.oy);
	    this.context.moveTo(  0 + this.ox, 200 + this.oy);
	    this.context.lineTo(300 + this.ox, 200 + this.oy);
	    this.context.moveTo(  0 + this.ox, 250 + this.oy);
	    this.context.lineTo(300 + this.ox, 250 + this.oy);
	    this.context.moveTo(  0 + this.ox, 300 + this.oy);
	    this.context.lineTo(300 + this.ox, 300 + this.oy);
	    this.context.stroke();
	    
	    // ラベル
	    this.context.font = "16px 'Times New Roman'";
	    this.context.fillText("a", 250 + this.ox,  184 + this.oy);
	    this.context.fillText("i",  75 + this.ox,   73 + this.oy);
	    this.context.fillText("u",  71 + this.ox,  184 + this.oy);
	    this.context.fillText("e", 160 + this.ox,  113 + this.oy);
	    this.context.fillText("o", 160 + this.ox,  224 + this.oy);
	    this.context.fillText("F1 [Hz]", 125 + this.ox,  350 + this.oy);
	    this.context.save();
	    this.context.rotate(-Math.PI / 2);
	    this.context.fillText("F2 [Hz]", -205,  15);
	    this.context.restore();

	    // X軸
	    this.context.fillText(   "0",  -4 + this.ox, 320 + this.oy);
	    this.context.fillText( "200",  48 + this.ox, 320 + this.oy);
	    this.context.fillText( "400", 108 + this.ox, 320 + this.oy);
	    this.context.fillText( "600", 168 + this.ox, 320 + this.oy);
	    this.context.fillText( "800", 228 + this.ox, 320 + this.oy);
	    this.context.fillText("1000", 284 + this.ox, 320 + this.oy);

	    // Y軸
	    this.context.fillText("3000", 40,   6 + this.oy);
	    this.context.fillText("2500", 40,  56 + this.oy);
	    this.context.fillText("2000", 40, 106 + this.oy);
	    this.context.fillText("1500", 40, 156 + this.oy);
	    this.context.fillText("1000", 40, 206 + this.oy);
	    this.context.fillText( "500", 47, 256 + this.oy);
	    this.context.fillText(   "0", 63, 306 + this.oy);

	    // 母音
	    this.context.fillStyle = 'rgb(20, 20, 255)';
	    this.context.beginPath();
	    this.context.arc(800 / 1000 * 300 + this.ox, 300 - 1200 / 3000 * 300 + this.oy, 4, 0, 2 * Math.PI);
	    this.context.fill();
	    this.context.beginPath();
	    this.context.arc(500 / 1000 * 300 + this.ox, 300 - 1900 / 3000 * 300 + this.oy, 4, 0, 2 * Math.PI);
	    this.context.fill();
	    this.context.beginPath();
	    this.context.arc(300 / 1000 * 300 + this.ox, 300 - 2300 / 3000 * 300 + this.oy, 4, 0, 2 * Math.PI);
	    this.context.fill();
	    this.context.beginPath();
	    this.context.arc(300 / 1000 * 300 + this.ox, 300 - 1200 / 3000 * 300 + this.oy, 4, 0, 2 * Math.PI);
	    this.context.fill();
	    this.context.beginPath();
	    this.context.arc(500 / 1000 * 300 + this.ox, 300 -  800 / 3000 * 300 + this.oy, 4, 0, 2 * Math.PI);
	    this.context.fill();

	}
}