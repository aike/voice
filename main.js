var ui;
var canvas1;
var canvas2;
var app;
var init = false;
var isTouchDevice = false;

class App {
	setEvent(elem)
	{
		elem.addEventListener('mousemove', ev =>
		{
			if (isTouchDevice) return;
			this.moveCallback(ev, ev.clientX, ev.clientY);
		});
		elem.addEventListener('touchmove', ev =>
		{
			// loop
			this.moveCallback(ev, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
		});

		elem.addEventListener('mousedown', ev =>
		{
			if (isTouchDevice) return;
			this.downCallback(ev, ev.clientX, ev.clientY);
		});
		elem.addEventListener('touchstart', ev =>
		{
			isTouchDevice = true;
			this.downCallback(ev, ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
		});

		elem.addEventListener('mouseup', ev =>
		{
			if (isTouchDevice) return;
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
		if (ui.checkPad(x, y)) {
			x -= ui.ox;
			y -= ui.oy;
			var px = x / ui.xlen;
			var py = 1.0 - y / ui.ylen;
			ui.vowel.down(px, py);
			return;
		}

		var conso = ui.checkButton(x, y);
		if (conso != null) {
			conso.voice.down();
		}

	}

	upCallback(ev, cx, cy)
	{
		ev.preventDefault();
		var rect = ev.target.getBoundingClientRect();
		var x = cx - rect.left;
		var y = cy - rect.top;

		var conso = ui.checkButton(x, y);
		if (conso != null) {
			conso.voice.up();
			return;
		}

		ui.vowel.up();

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
		if (ui.checkPad(x, y)) {
			x -= ui.ox;
			y -= ui.oy;
			var px = x / ui.xlen;
			var py = 1.0 - y / ui.ylen;
			ui.vowel.move(px, py);
		}
	}

}


document.addEventListener('touchstart', ev =>
{
	touchToStart();
});

document.addEventListener('mousedown', ev =>
{
	touchToStart();
});

function touchToStart()
{
	if (!init)
	{
		init = true;

		document.getElementById('init').style.display = 'none';

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

		window.onresize();
	}
};


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


