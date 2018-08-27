class Button
{
	constructor(ctx, bg, x, y, char, consotype)
	{
		this.ctx = ctx;
		this.bg = bg;

		ctx.fillStyle = 'rgb(0, 0, 0)';
		var leftX = 30 * bg.scale;
	    ctx.font = "24px 'Times New Roman'";

	    var rsize = 30 * bg.scale;
	    ctx.fillText(char, leftX + (x - 10) * bg.scale,  (y + 5) * bg.scale + bg.oy);
	    ctx.beginPath();
	    ctx.arc(leftX + x * bg.scale, y * bg.scale + bg.oy, rsize, 0, 2 * Math.PI);
	    ctx.stroke();

	    //bg.buttons.push({x:leftX + x * bg.scale, y:bg.oy + (y-10) * bg.scale, char:char, consotype:consotype});
	    bg.buttons.push(this);
	    console.log(bg.buttons);
	}

	check(x, y)
	{
	}

	onDown()
	{

	}

	onUp()
	{

	}

	onConsoDownInVowel()
	{

	}

	onConsoUpInVowel()
	{
		
	}

	onVowelDownInConso()
	{

	}

	onVowelUpInConso()
	{
		
	}


}