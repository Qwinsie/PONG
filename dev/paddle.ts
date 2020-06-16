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
        
        this.y = (0.5 * window.innerHeight) - (0.5 * this.height)

        if(player == 1) {
            this.x = -33
        } else if (player == 2) {
            this.x = (window.innerWidth - this.width) + 33
        }
        
        this.scaleX = 0.5
        this.scaleY = 0.5
        
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

    public paddleGrow() {
        this.scaleY = 1
    }

    public update() {
        let newY = this.y - this.upSpeed + this.downSpeed

        // If paddle is inside view -> update
        if (newY > (0 - 70) && newY + this.height < window.innerHeight - 60 ) this.y = newY
        
        super.update()
    }
}