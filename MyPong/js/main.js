"use strict";

(() => {
  //ユーティリティ的な活用ができる関数
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Ball {
    constructor(canvas) {
      this.canvas = canvas; //Ballクラスの中だったらどこでも使える
      this.ctx = this.canvas.getContext("2d");
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;
      this.vx = rand(3, 5) * (Math.random() < 0.5 ? 1 : -1); //速度を調整
      this.vy = rand(3, 5);
      this.isMissed = false;
    }

    getMissedStatus() {
      return this.isMissed;
    }

    bounce() {
      this.vy *= -1;
    }

    reposition(paddleTop) {
      this.y = paddleTop - this.r;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getR() {
      return this.r;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y - this.r > this.canvas.height) {
        this.isMissed = true;
      }

      if (this.x - this.r < 0 || this.x + this.r > this.canvas.width) {
        this.vx *= -1;
      }

      if (this.y - this.r < 0) {
        //上に当たった時跳ね返る
        this.vy *= -1;
      }
    }

    draw() {
      this.ctx.beginPath(); //図を描くときに必ず書く
      this.ctx.fillStyle = "#fdfdfd"; //fillStyle:色を決める
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); //arc:円弧を描く
      this.ctx.fill(); //塗りつぶす
    }
  }

  class Paddle {
    constructor(canvas, game) {
      this.canvas = canvas;
      this.game = game;
      this.ctx = this.canvas.getContext("2d");
      this.w = 60; //幅
      this.h = 16; //高さ
      this.x = this.canvas.width / 2 - this.w / 2;
      this.y = this.canvas.height - 32; //パドル一個分上
      this.mouseX = this.x; //マウスの初期値は真ん中
      this.addHandler(); //頭にthisがついたら自分で作る変数
    }

    addHandler() {
      document.addEventListener("mousemove", (e) => {
        //画面全体でマウスが動いたとき
        this.mouseX = e.clientX;
      });
    }

    update(ball) {
      const ballBottom = ball.getY() + ball.getR();
      const paddleTop = this.y;
      const ballTop = ball.getY() - ball.getR();
      const paddleBottom = this.y + this.h;
      const ballCenter = ball.getX();
      const paddleLeft = this.x;
      const paddleRight = this.x + this.w;

      if (
        ballBottom > paddleTop &&
        ballTop < paddleBottom &&
        ballCenter > paddleLeft &&
        ballCenter < paddleRight
      ) {
        ball.bounce();
        ball.reposition(paddleTop);
        //めり込んでたボールを上に跳ね返す
        this.game.addScore();
      }

      const rect = this.canvas.getBoundingClientRect();
      this.x = this.mouseX - rect.left - this.w / 2; //マウスのX座標

      // パドルが画面から出ないようにする
      if (this.x < 0) {
        this.x = 0;
        //左端より大きくなろうとしたら止まる（this.xはcanvas内のｘ座標）
      }
      if (this.x + this.w > this.canvas.width) {
        //パドルの右端の座標が画面の幅より大きくなろうとしたら
        this.x = this.canvas.width - this.w;
        //右端で止まる
      }
    }

    draw() {
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d"); //canvasに描画する準備完了
      this.ball = new Ball(this.canvas);
      this.paddle = new Paddle(this.canvas, this);
      this.loop(); //constructorを呼び出した時点でゲームをループ
      //これでゲームがスタートできる
      this.isGameOver = false;
      this.score = 0;
    }

    addScore() {
      this.score++;
    }

    loop() {
      if (this.isGameOver) {
        return;
      }
      this.update();
      this.draw();

      requestAnimationFrame(() => {
        this.loop();
      });
      //ループを再帰的に読み込む
      //requestAnimationFrameの（）にthisは使えない（falseになってしまう）
      //繰り返し処理する時に関数を使うときはアロー関数を使う
    }

    update() {
      this.ball.update();
      this.paddle.update(this.ball); //パドルにボールの情報を渡す

      if (this.ball.getMissedStatus()) {
        this.isGameOver = true;
      }
    }

    draw() {
      if (this.isGameOver) {
        this.drawGameOver();
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //毎回毎回クリア⇒drawする
      this.ball.draw();
      this.paddle.draw();
      this.drawScore();
    }
    //■ゲームループ■
    //①位置情報の更新⇒update()
    //・ボールの位置・パドルの位置
    //②描画⇒draw()

    drawGameOver() {
      this.ctx.font = '28px "Arial Black"';
      this.ctx.fillStyle = "tomato";
      this.ctx.fillText("GAME OVER", 50, 150);
    }

    drawScore() {
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.fillText(this.score, 10, 25);
    }
  }

  //即時関数
  const canvas = document.querySelector("canvas");
  //canvasを読み込む
  if (typeof canvas.getContext === "undefined") {
    return;
    // ブラウザが<canvas>に対応しているか
    // 対応していなければreturnで終了。
    // returnは関数内でしか使えないので即時関数で囲むなどする必要がある。
  }

  new Game(canvas); //インスタンス名は使わない⇒constructor()を実行するとゲームがスタートする（canvasを操作していく）
})();
