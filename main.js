var ui;
var canvas1;
var canvas2;
var app;

class App {
	setEvent(elem)
	{
		elem.addEventListener('mousemove', ev =>
		{
			this.moveCallback(ev, ev.clientX, ev.clientY);
		});
		elem.addEventListener('touchmove', ev =>
		{
			// loop
			this.moveCallback(ev, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
		});

		elem.addEventListener('mousedown', ev =>
		{
			this.downCallback(ev, ev.clientX, ev.clientY);
		});
		elem.addEventListener('touchstart', ev =>
		{
			this.downCallback(ev, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
		});

		elem.addEventListener('mouseup', ev =>
		{
			this.upCallback(ev, ev.clientX, ev.clientY);
		});
		elem.addEventListener('touchend', ev =>
		{
			this.upCallback(ev, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
		});
	}

	downCallback(ev, cx, cy)
	{
		ev.preventDefault();
		var rect = ev.target.getBoundingClientRect();
		var x = cx - rect.left;
		var y = cy - rect.top;

		console.log("xy");
		console.log(x + " " + y);
		console.log(ui.ox + " " + ui.oy);

		if (ui.checkPad(x, y)) {
			var px = (x - ui.x0) / ui.xlen;
			var py = 1.0 - (y - ui.y0) / ui.ylen;
			console.log("pxy");
			console.log(px + " " + py);
			ui.vowel.down(px, py);
			return;
		}

		var conso = ui.checkButton(x, y);
		console.log(conso);
		if (conso != null) {
			console.log("pushed:[" + conso.char + "]");
			conso.voice.down();
		}

	}

	upCallback(ev, cx, cy)
	{
		ev.preventDefault();
		var rect = ev.target.getBoundingClientRect();
		var x = cx - rect.left;
		var y = cy - rect.top;
		var px = (x - ui.x0) / ui.xlen;
		var py = (y - ui.y0) / ui.ylen;
		if (ui.checkPad(x, y)) {
			ui.vowel.up(px, py);
			return;
		}

		var conso = ui.checkButton(x, y);
		if (conso != null) {
			console.log("pushed:[" + conso.char + "]");
			conso.voice.up();
		}
	}

	moveCallback(ev, cx, cy)
	{
		if (!ui.vowel.isDown()) {
			return;
		}

		ev.preventDefault();
		var rect = ev.target.getBoundingClientRect();
		var x = cx - rect.left;
		var y = cy - rect.top;
		var px = (x - ui.x0) / ui.xlen;
		var py = 1.0 - (y - ui.y0) / ui.ylen;
		if (ui.checkPad(x, y)) {
			ui.vowel.move(px, py);
		}
	}

}

window.addEventListener("load", () =>
{
	canvas1 = document.getElementById('canvas1');
	canvas2 = document.getElementById('canvas2');

	var scaleX = window.innerWidth / 800;
	var scaleY = window.innerHeight / 500;
	var scale = Math.min(scaleX, scaleY);

	ui = new UI(canvas1);
	ui.setScale(scale)
	ui.draw();

	app = new App();
	app.setEvent(canvas1);
});


var timer;
window.onresize = () =>
{
	if (timer > 0) {
		clearTimeout(timer);
	}

	timer = setTimeout(() =>
	{
		var scaleX = window.innerWidth / 800;
		var scaleY = window.innerHeight / 500;
		var scale = Math.min(scaleX, scaleY);

		canvas1.setAttribute("width", window.innerWidth.toString());
		canvas1.setAttribute("height", window.innerHeight.toString());
		canvas2.setAttribute("width", window.innerWidth.toString());
		canvas2.setAttribute("height", window.innerHeight.toString());

		if (ui != null)
		{
			ui.setScale(scale);
			ui.draw();
		}
	}, 200);
};


