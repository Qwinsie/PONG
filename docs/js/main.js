"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(name) {
        this.spawnObject(name);
    }
    GameObject.prototype.spawnObject = function (name) {
        this.div = document.createElement("" + name);
        document.body.appendChild(this.div);
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        console.log("Gameobject is updating");
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this, "ball") || this;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.speedR = 0;
        _this.r = 0;
        _this.x = window.innerWidth / 2;
        _this.y = Math.random() * (window.innerHeight - 100);
        _this.speedX = -(Math.random() * 6);
        _this.speedY = Math.random() * 6 - 3;
        _this.speedR = 0.001;
        return _this;
    }
    Ball.prototype.hitPaddle = function () {
        this.speedX *= -1;
        console.log(this.speedX);
    };
    Ball.prototype.removeBall = function () {
        this.div.remove();
    };
    Ball.prototype.getFutureRectangle = function () {
        var rect = this.div.getBoundingClientRect();
        rect.x += this.speedX;
        return rect;
    };
    Ball.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.r += this.speedR;
        if (this.y + this.div.clientHeight > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.r + "turn)";
    };
    return Ball;
}(GameObject));
var Game = (function () {
    function Game() {
        this.balls = [];
        this.score1 = 0;
        this.score2 = 0;
        for (var i = 0; i < 1; i++) {
            this.balls.push(new Ball());
        }
        this.paddle1 = new Paddle(87, 83, 1);
        this.paddle2 = new Paddle(38, 40, 2);
        this.update();
    }
    Game.prototype.update = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            if (this.checkCollision(b.getFutureRectangle(), this.paddle1.getRectangle())) {
                b.hitPaddle();
            }
            if (this.checkCollision(b.getFutureRectangle(), this.paddle2.getRectangle())) {
                b.hitPaddle();
            }
            if (b.getRectangle().left > innerWidth) {
                this.addScore(1);
                this.updateScore();
                b.removeBall();
                this.reset();
            }
            if (b.getRectangle().right < 0) {
                this.addScore(2);
                this.updateScore();
                b.removeBall();
                this.reset();
            }
            b.update();
        }
        this.paddle1.update();
        this.paddle2.update();
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.addScore = function (player) {
        if (player == 1) {
            this.score1 += 1;
        }
        else if (player == 2) {
            this.score2 += 1;
        }
    };
    Game.prototype.updateScore = function () {
        var scorediv = document.getElementsByTagName("splash")[0];
        scorediv.innerHTML = this.score1 + ":" + this.score2;
        document.body.appendChild(scorediv);
    };
    Game.prototype.reset = function () {
        this.balls.splice(0, 1);
        this.balls.push(new Ball());
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(up, down, player) {
        var _this = _super.call(this, "paddle") || this;
        _this.downkey = 0;
        _this.upkey = 0;
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.upkey = up;
        _this.downkey = down;
        _this.y = 200;
        if (player == 1) {
            _this.x = 20;
        }
        else if (player == 2) {
            _this.x = window.innerWidth - _this.div.clientWidth;
        }
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + this.div.clientHeight < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(0.6) scaleY(0.6)";
    };
    return Paddle;
}(GameObject));
//# sourceMappingURL=main.js.map