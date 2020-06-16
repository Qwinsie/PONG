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
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.spawnObject(name);
    }
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () {
            return this.div.clientWidth * this.scaleX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () {
            return this.div.clientHeight * this.scaleY;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.spawnObject = function (name) {
        this.div = document.createElement("" + name);
        document.body.appendChild(this.div);
    };
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(" + this.scaleX + ") scaleY(" + this.scaleY + ") rotate(" + this.rotation + "turn)";
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(direction) {
        var _this = _super.call(this, "ball") || this;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.speedR = 0;
        _this.setToStartPos(direction);
        return _this;
    }
    Ball.prototype.setToStartPos = function (direction) {
        this.x = window.innerWidth / 2;
        this.y = Math.random() * (window.innerHeight - 100);
        this.speedX = direction * (Math.random() * 6);
        this.speedY = Math.random() * 6;
        this.speedR = 0.001;
    };
    Ball.prototype.hitPaddle = function () {
        this.speedX *= -1;
        this.goFaster();
    };
    Ball.prototype.getFutureRectangle = function () {
        var rect = this.div.getBoundingClientRect();
        rect.x += this.speedX;
        return rect;
    };
    Ball.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.speedR;
        if (this.y + this.div.clientHeight > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        _super.prototype.update.call(this);
    };
    Ball.prototype.goFaster = function () {
        this.speedX *= 1.2;
        this.speedY *= 1.2;
    };
    return Ball;
}(GameObject));
var Game = (function () {
    function Game() {
        this.gameobjects = [];
        this.score1 = 0;
        this.score2 = 0;
        this.gameobjects.push(new Paddle(87, 83, 1));
        this.gameobjects.push(new Paddle(38, 40, 2));
        this.gameobjects.push(new PaddleUpgrade());
        for (var i = 0; i < 1; i++) {
            this.gameobjects.push(new Ball(1));
        }
        this.update();
    }
    Game.prototype.update = function () {
        var _this = this;
        for (var _i = 0, _a = this.gameobjects; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.update();
            if (ball instanceof Ball) {
                if (ball.getRectangle().left > innerWidth) {
                    ball.setToStartPos(-1);
                    this.addScore(1);
                    this.updateScore();
                }
                if (ball.getRectangle().right < 0) {
                    ball.setToStartPos(1);
                    this.addScore(2);
                    this.updateScore();
                }
                for (var _b = 0, _c = this.gameobjects; _b < _c.length; _b++) {
                    var paddle = _c[_b];
                    if (paddle instanceof Paddle) {
                        if (this.checkCollision(ball.getFutureRectangle(), paddle.getRectangle())) {
                            ball.hitPaddle();
                        }
                        for (var _d = 0, _e = this.gameobjects; _d < _e.length; _d++) {
                            var paddleupgrade = _e[_d];
                            if (paddleupgrade instanceof PaddleUpgrade) {
                                if (this.checkCollision(ball.getFutureRectangle(), paddleupgrade.getRectangle())) {
                                    paddleupgrade.hitByBall();
                                    paddle.paddleGrow();
                                }
                            }
                        }
                    }
                }
            }
        }
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
        _this.y = (0.5 * window.innerHeight) - (0.5 * _this.height);
        if (player == 1) {
            _this.x = -33;
        }
        else if (player == 2) {
            _this.x = (window.innerWidth - _this.width) + 33;
        }
        _this.scaleX = 0.5;
        _this.scaleY = 0.5;
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
    Paddle.prototype.paddleGrow = function () {
        this.scaleY = 1;
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > (0 - 70) && newY + this.height < window.innerHeight - 60)
            this.y = newY;
        _super.prototype.update.call(this);
    };
    return Paddle;
}(GameObject));
var PaddleUpgrade = (function (_super) {
    __extends(PaddleUpgrade, _super);
    function PaddleUpgrade() {
        var _this = _super.call(this, "paddleupgrade") || this;
        _this.x = 600;
        _this.y = 600;
        return _this;
    }
    PaddleUpgrade.prototype.hitByBall = function () {
    };
    PaddleUpgrade.prototype.update = function () {
    };
    return PaddleUpgrade;
}(GameObject));
//# sourceMappingURL=main.js.map