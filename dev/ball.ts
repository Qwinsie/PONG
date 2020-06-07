class Ball {

    private div : HTMLElement

    private _x : number = 0
    private _y : number = 0

    private xspeed : number = 1
    private yspeed : number = 1

    constructor() {
        this.div = document.createElement("ball")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this._x = Math.random() * (window.innerWidth - this.div.clientWidth)
        this._y = Math.random() * (window.innerHeight - this.div.clientHeight)
    }

    public update() {
        this._x += this.xspeed
        this._y += this.yspeed


    if(this._y > window.innerHeight - this.div.clientHeight || this._y < 0) {
        this.yspeed *= -1
    }

    if(this._x > window.innerWidth - this.div.clientWidth) {
        this.xspeed *= -1
    }

        this.div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }
}