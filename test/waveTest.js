var assert = chai.assert;
mocha.timeout(15000);

function createDownloadLink(blob) {
 
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var div = document.createElement('div');
    var link = document.createElement('a');
 
    //add controls to the <audio> element
    au.controls = true;
    au.src = url;
 
    //link the a element to the blob
    link.href = url;
    link.download = 'aiueo.wav';
    link.innerHTML = link.download;
 
    //add the new audio and a elements to the li element
//    div.appendChild(au);
    div.appendChild(link);
 
    //add the li element to the ordered list
    document.querySelector('#wavlink').appendChild(div);
}

function drawWave(buf) {
	var ch = buf[0];

	var canvas = document.querySelector('#wavecanvas');
	var canvasContext = canvas.getContext('2d');
	canvasContext.fillStyle = 'rgb(20, 20, 100)';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	canvasContext.strokeStyle = 'rgb(230, 230, 255)';
    canvasContext.beginPath();
    for (var i = 0, len = ch.length; i < len; i++) {
        var x = (i / len) * canvas.width;
        var y = (1 - ch[i] * 1.5) * canvas.height - canvas.height / 2;
        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }
    }
    canvasContext.stroke();	
}


describe('出力波形チェック', ()=> {
	var v,h,s,sh,ts,k,p;
	var seq;
	var rec;

	before(()=> {
		rec = new Recorder(master_out,{numChannels:1})
		rec.clear();
		rec.record();

		v = new VoicePad(new Voice("a"));
		h = new Htype_VoiceButton("h", new Voice("h"));
		v.addConso(h);
		h.addVowel(v);
		s = new Stype_VoiceButton("s", new Voice("s"));
		v.addConso(s);
		s.addVowel(v);
		sh = new Stype_VoiceButton("sy", new Voice("sy"));
		v.addConso(sh);
		sh.addVowel(v);
		ts = new Ptype_VoiceButton("t", new Voice("t"));
		v.addConso(ts);
		ts.addVowel(v);
		k = new Ptype_VoiceButton("k", new Voice("k"));
		v.addConso(k);
		k.addVowel(v);
		p = new Ptype_VoiceButton("p", new Voice("p"));
		v.addConso(p);
		p.addVowel(v);

		seq = new InputSequence();
	});

	after(()=> {
		rec.stop();
		rec.getBuffer((buf)=>{ drawWave(buf); });
	    rec.exportWAV(createDownloadLink);
	});


	// describe('母音を都度切って発音', ()=> {
	// 	it ('h', (done)=> {
	// 		seq.aiueoStaccato(h,  v, done);
	// 	});
	// 	it ('s', (done)=> {
	// 		seq.aiueoStaccato(s,  v, done);
	// 	});
	// 	it ('sh', (done)=> {
	// 		seq.aiueoStaccato(sh, v, done);
	// 	});
	// 	it ('ts', (done)=> {
	// 		seq.aiueoStaccato(ts, v, done);
	// 	});
	// 	it ('k', (done)=> {
	// 		seq.aiueoStaccato(k,  v, done);
	// 	});
	// 	it ('p', (done)=> {
	// 		seq.aiueoStaccato(p,  v, done);
	// 	});
	// });

	describe('母音を切らずに発音', ()=> {
		// it ('h', (done)=> {
		// 	seq.aiueoTenuto(h,  v, done);
		// });
		// it ('s', (done)=> {
		// 	seq.aiueoTenuto(s,  v, done);
		// });
		it ('sh', (done)=> {
			seq.aiueoTenuto(sh, v, done);
		});
		// it ('ts', (done)=> {
		// 	seq.aiueoTenuto(ts, v, done);
		// });
		// it ('k', (done)=> {
		// 	seq.aiueoTenuto(k,  v, done);
		// });
		// it ('p', (done)=> {
		// 	seq.aiueoTenuto(p,  v, done);
		// });
	});

});


class InputSequence
{
	constructor() {
		this.consoTime = 100;
		this.holdTime = 200;
		this.interval = 100;
		this.endInterval = 200;
	}

	// 母音を都度切って発音
	aiueoStaccato(c, v, done) {
		console.log('AIUEO start ' + c.char);
		c.init();
		v.init();

		c.down();
		v.downFreq(800, 1200);	// a
		setTimeout(()=>{
			c.up();
			setTimeout(()=>{
				v.up();
				setTimeout(()=>{
					c.down();
					v.downFreq(250, 2300);	// i
					setTimeout(()=>{
						c.up();
						setTimeout(()=>{
							v.up();
							setTimeout(()=>{
								c.down();
								v.downFreq(250, 1200);	// u
								setTimeout(()=>{
									c.up();
									setTimeout(()=>{
										v.up();
										setTimeout(()=>{
											c.down();
											v.downFreq(500, 1900);	// e
											setTimeout(()=>{
												c.up();
												setTimeout(()=>{
													v.up();
													setTimeout(()=>{
														c.down();
														v.downFreq(500, 800);	// o
														setTimeout(()=>{
															c.up();
															setTimeout(()=>{
																v.up();
																console.log('AIUEO done ' + c.char);
																setTimeout(()=>{done();}, this.endInterval);
															}, this.holdTime);
														}, this.consoTime);
													}, this.interval);
												}, this.holdTime);
											}, this.consoTime);
										}, this.interval);
									}, this.holdTime);
								}, this.consoTime);
							}, this.interval);
						}, this.holdTime);
					}, this.consoTime);
				}, this.interval);
			}, this.holdTime);
		}, this.consoTime);
	}

	// 母音を切らずに発音
	aiueoTenuto(c, v, done) {
		console.log('AIUEO start ' + c.char);
		c.init();
		v.init();

		c.down();
		v.downFreq(800, 1200);	// a
		setTimeout(()=>{
			c.up();
			setTimeout(()=>{
				c.down();
				v.downFreq(250, 2300);	// i
				setTimeout(()=>{
					c.up();
					setTimeout(()=>{
						c.down();
						v.downFreq(250, 1200);	// u
						setTimeout(()=>{
							c.up();
							setTimeout(()=>{
								c.down();
								v.downFreq(500, 1900);	// e
								setTimeout(()=>{
									c.up();
									setTimeout(()=>{
										c.down();
										v.downFreq(500, 800);	// o
										setTimeout(()=>{
											c.up();
											v.up();
											console.log('AIUEO done ' + c.char);
											setTimeout(()=>{done();}, this.endInterval);
										}, this.holdTime);
									}, this.interval);
								}, this.holdTime);
							}, this.interval);
						}, this.holdTime);
					}, this.interval);
				}, this.holdTime);
			}, this.interval);
		}, this.holdTime);
	}

}

