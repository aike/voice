class TrailObject {
  constructor()
  {
    this.context = null;
    this.alpha = 0.5;
    this.f1 = 0;
    this.f2 = 0;
    this.wait = 0;
    this.show = true;
    this.parent = null;
    this.ox = 0;
    this.oy = 0;
    this.x = 0;
    this.y = 0;
  }

  calc_xy(f1_to, f2_to, ratio) {
    var f1 = this.f1 * (1 - ratio) + f1_to * ratio;
    var f2 = this.f2 * (1 - ratio) + f2_to * ratio;

    this.x = f1 / 1000 * 300 + this.ox;
    this.y = 300 - f2 / 3000 * 300 + this.oy;
  }

  draw() {
    this.context.fillStyle = 'rgba(70, 200, 255, ' + this.alpha + ')';
    this.context.beginPath();
    this.context.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    this.context.fill();
  }

}

class Trailer {
  constructor(element, trailSize) {
    this.context = element.getContext('2d');

    this.ox = 80;
    this.oy = 30;

    this.playing = false;

    this.rate = 5;
    this.interval = 20 * this.rate;
    this.data_time = 0;

    this.ringBuffer_x = new Array(100);
    this.ringBuffer_y = new Array(100);
    this.bufferIndex = 0;

    this.elapsedTime = 0;
    this.lastTime = -99999;
    this.currentDataTime = 0;

    this.trail = new Array(trailSize);
    for (var i = 0; i < this.trail.length; i++) {      
      this.trail[i] = new TrailObject();
      this.trail[i].context = this.context;
      this.trail[i].alpha = 1.0 * (this.trail.length - i) / this.trail.length;
      this.trail[i].speed = 1;
      this.trail[i].f1 = 0;
      this.trail[i].f2 = 0;
      if (i > 0) {
        this.trail[i].parent = this.trail[i - 1];
      }
      this.trail[i].ox = this.ox;
      this.trail[i].oy = this.oy;
      this.trail[i].wait = i * 1;
    }


  }

  change_data(num) {
    switch (num) {
      case 0:
        this.clear();
        this.playing = false;
        break;
      case 1:
        this.set_data(data_arigatoo_f1, data_arigatoo_f2);
        break;
      case 2:
        this.set_data(data_hai_f1, data_hai_f2);
        break;
      case 3:
        this.set_data(data_iie_f1, data_iie_f2);
        break;
      case 4:
        this.set_data(data_konbanwa_f1, data_konbanwa_f2);
        break;
      case 5:
        this.set_data(data_konnichiwa_f1, data_konnichiwa_f2);
        break;
      case 6:
        this.set_data(data_ohayoo_f1, data_ohayoo_f2);
        break;
      case 7:
        this.set_data(data_sayoonara_f1, data_sayoonara_f2);
        break;
      case 8:
        this.set_data(data_sumimasen_f1, data_sumimasen_f2);
        break;
    }
  }

  set_data(data_f1, data_f2) {
    this.f1data = data_f1;
    this.f2data = data_f2;
    this.ringBuffer_x = new Array(100);
    this.ringBuffer_y = new Array(100);
    this.bufferIndex = 0;
    this.index = 0;
    this.lastindex = 0;
    this.elapsedTime = 0;
    this.lastTime = -99999;
    this.currentDataTime = 0;
    this.reset_history(0);
    this.set_rate(this.rate);

    if (!this.playing) {
      this.playAnimation();
    }
  }

  reset_history(idx) {
    this.trail[0].f1 = this.f1data[idx];
    this.trail[0].f2 = this.f2data[idx];
    this.trail[0].calc_xy(this.f1data[idx], this.f2data[idx], 1);
    for (var i = 0; i < this.ringBuffer_x.length; i++) {
      this.ringBuffer_x[i] = this.trail[0].x;
      this.ringBuffer_y[i] = this.trail[0].y;
    }
    this.bufferIndex = 0;
  }

  set_rate(val) {
    this.rate = val;
    this.interval = 20 * this.rate;
    this.data_time = this.interval * this.f1data.length;
  }

  clear() {
      // 前の描画を消す。
      this.context.clearRect(0, 0, 600, 500);    
  }


  loop(timestamp) {
      var self = this;

      this.clear();

      if (!this.playing) {
        return;
      }

      // 前フレームからの経過時間
      var frameTime = timestamp - this.lastTime;
      // this.data_time内での経過時間(msec)
      this.elapsedTime += frameTime;
      this.lastTime = timestamp;
      if (this.elapsedTime > this.data_time) {
        // 時間的にデータの最後まで到達したら、1000msec待って最初から再生
        this.elapsedTime = 0;
        this.currentDataTime = 0;
        this.reset_history(0);
        setTimeout(function() {
          window.requestAnimationFrame(function(ts) {
            self.lastTime = ts;
            self.loop(ts)
          });
        }, 1000);
        return;
      }

      // this.interval内での再生位置(msec)
      this.currentDataTime += frameTime;
      if (this.currentDataTime > this.interval) {
        this.currentDataTime -= this.interval;
      }
      // this.interval内での再生位置(0.0〜1.0)
      var ratio = this.currentDataTime / this.interval;

      // 再生データ位置
      this.index = Math.floor(this.f1data.length * this.elapsedTime / this.data_time);

      var flag = false;

      for (var i = 0; i < this.trail.length; i++) {
        // 次のデータを読む
        if (this.index != this.lastindex) {
          if (i == 0) {
            // 前回のデータがゼロの場合、軌跡を抑制するためフラグを立てる
            if ((this.index == 0) || (this.f1data[this.lastindex] == 0)) {
              flag = true;
              // fromをtoと同じ値にする
              this.trail[i].f1 = this.f1data[this.index];
              this.trail[i].f2 = this.f2data[this.index];
            } else {
              // fromを前回データの値にする
              this.trail[i].f1 = this.f1data[this.lastindex];
              this.trail[i].f2 = this.f2data[this.lastindex];            
            }
          }
          this.lastindex = this.index;
        }

        if (i == 0) {
          if (flag) {
            // 前回データがゼロの場合、軌跡のヒストリーをデータの先頭の値にして軌跡を出さないようにする
            this.reset_history(this.index);
          } else {
            // 通常の軌跡計算
            this.trail[i].calc_xy(this.f1data[this.index], this.f2data[this.index], ratio);
          }
          // 軌跡をヒストリーバッファに格納
          this.ringBuffer_x[this.bufferIndex] = this.trail[i].x;
          this.ringBuffer_y[this.bufferIndex] = this.trail[i].y;
          this.bufferIndex = (this.bufferIndex + 1) % this.ringBuffer_x.length;

        } else { 
          // 先頭データ以外の場合、ヒストリーバッファから位置を決定
          var idx = this.bufferIndex - this.trail[i].wait;
          while (idx < 0) {
            // インデックスがマイナスの場合、リングバッファを循環する
            idx += this.ringBuffer_x.length;
          }
          this.trail[i].x = this.ringBuffer_x[idx];
          this.trail[i].y = this.ringBuffer_y[idx];
        }

        if ((this.f1data[this.index] != 0) || (this.f1data[this.lastindex] != 0)) {
          // fromもtoも0以外のとき
          if (this.trail[i].x > this.ox) {
            // 描画位置が0以外のとき
            this.trail[i].draw();
          }
        }

      }
      window.requestAnimationFrame(function(ts) {self.loop(ts)});    
  }

  playAnimation() {
    this.playing = true;
    var self = this;
    window.requestAnimationFrame(function(ts) {
      self.lastTime = ts;
      self.loop(ts)
    });
  }

}

