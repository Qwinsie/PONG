class Paddle {

    private div : HTMLElement

    private _x : number = 0
    private _y : number = 0

    private upspeed : number = 0
    private downspeed : number = 0

    // Keys
    private downkey: number = 87
    private upkey: number = 83

    constructor() {
        this.div = document.createElement("paddle")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this._x = 0
        this._y = 0

        this.upkey   = 87
        this.downkey = 83

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private onKeyDown(e:KeyboardEvent): void {

        console.log(e.keyCode)

        switch (e.keyCode) {
            case this.upkey:
                this.upspeed = 5
                break;
            case this.downkey:
                this.downspeed = 5
                break;
        }
    }

    private onKeyUp(e:KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upspeed = 0
                break;
            case this.downkey:
                this.downspeed = 0
                break;
        }
    }

    public update() {
        let newY = this._y - this.upspeed + this.downspeed


        if (newY > 0 && newY + 100 < window.innerHeight) this._y = newY

        this.div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }
}