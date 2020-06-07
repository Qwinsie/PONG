"use strict";
var Ball = (function () {
    function Ball() {
        this._x = 0;
        this._y = 0;
        this.xspeed = 1;
        this.yspeed = 1;
        this.div = document.createElement("ball");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this._x = Math.random() * (window.innerWidth - this.div.clientWidth);
        this._y = Math.random() * (window.innerHeight - this.div.clientHeight);
    }
    Ball.prototype.update = function () {
        this._x += this.xspeed;
        this._y += this.yspeed;
        if (this._y > window.innerHeight - this.div.clientHeight || this._y < 0) {
            this.yspeed *= -1;
        }
        if (this._x > window.innerWidth - this.div.clientWidth) {
            this.xspeed *= -1;
        }
        this.div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        this.balls.push(new Ball());
        this.paddle = new Paddle();
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.update();
        }
        this.paddle.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle = (function () {
    function Paddle() {
        var _this = this;
        this._x = 0;
        this._y = 0;
        this.upspeed = 0;
        this.downspeed = 0;
        this.downkey = 87;
        this.upkey = 83;
        this.div = document.createElement("paddle");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this._x = 0;
        this._y = 0;
        this.upkey = 87;
        this.downkey = 83;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle.prototype.onKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case this.upkey:
                this.upspeed = 5;
                break;
            case this.downkey:
                this.downspeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upspeed = 0;
                break;
            case this.downkey:
                this.downspeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this._y - this.upspeed + this.downspeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this._y = newY;
        this.div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
    };
    return Paddle;
}());
//# sourceMappingURL=main.js.map