/// <reference path="gameobject.ts"/>

class Paddle extends GameObject {
    
    private downkey : number = 0
    private upkey : number = 0
    
    private downSpeed : number = 0
    private upSpeed : number = 0
    
    constructor(up:number, down:number, player:number) {
        super("paddle")
        
        this.upkey   = up
        this.downkey = down
        
        this.y = 200

        if(player == 1) {
            this.x = 20
        } else if (player == 2) {
            this.x = window.innerWidth - this.div.clientWidth
        }
        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5
                break
            case this.downkey:
                this.downSpeed = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
        }
    }

    public update() {
        let newY = this.y - this.upSpeed + this.downSpeed

        // If paddle is inside view -> update
        if (newY > 0 && newY + this.div.clientHeight < window.innerHeight ) this.y = newY

        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(0.6) scaleY(0.6)`
    }
    
}