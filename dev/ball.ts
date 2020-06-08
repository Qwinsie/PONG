/// <reference path="gameobject.ts"/>

class Ball extends GameObject{
    
    private speedX: number = 0
    private speedY: number = 0
    private speedR: number = 0

    private r: number = 0
    
    constructor() {
        super("ball")
        
        this.x = window.innerWidth/2
        this.y = Math.random() * (window.innerHeight - 100)

        this.speedX = - (Math.random() * 6)
        this.speedY = Math.random() * 6 - 3
        this.speedR = 0.001
    }
    
    public hitPaddle(){
        this.speedX *= -1
        console.log(this.speedX)
    }

    public removeBall(){
        this.div.remove()
    }

    public getFutureRectangle(){
        let rect = this.div.getBoundingClientRect()
        rect.x += this.speedX
        return rect
    }

    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        this.r += this.speedR
        
        if( this.y + this.div.clientHeight > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }
            
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.r}turn)` 
    }
}