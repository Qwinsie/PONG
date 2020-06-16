/// <reference path="gameobject.ts"/>

class Ball extends GameObject{
    // Fields
    private speedX: number = 0
    private speedY: number = 0
    private speedR: number = 0
    
    constructor(direction : number) {
        super("ball")
        this.setToStartPos(direction)
    }
    
    public setToStartPos(direction : number) {
        this.x = window.innerWidth/2
        this.y = Math.random() * (window.innerHeight - 100)

        // let randomInt = Math.round(Math.random()) == 0 ? -1 : 1
        this.speedX = direction * (Math.random() * 6)
        this.speedY = Math.random() * 6
        this.speedR = 0.001
    }

    public hitPaddle(){
        this.speedX *= -1
        this.goFaster()
    }

    public getFutureRectangle(){
        let rect = this.div.getBoundingClientRect()
        rect.x += this.speedX
        return rect
    }

    public update() : void {
        
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.speedR
        
        if( this.y + this.div.clientHeight > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }

        super.update()
        }

    public goFaster() {
        this.speedX *= 1.2
        this.speedY *= 1.2
    }
}
