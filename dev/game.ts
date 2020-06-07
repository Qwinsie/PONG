class Game {

    private balls : Ball[] = []
    private paddle : Paddle

    private hit : boolean = false

    private score : number = 0

    constructor() {
        this.balls.push(new Ball())
        this.paddle = new Paddle()

        this.gameLoop()
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    private gameLoop() {
        for(let ball of this.balls) {
            ball.update()
        }

        this.hit = this.checkCollision(this.balls[0].getFutureRectangle(), this.paddle.getRectangle())
        

        this.paddle.update()

        if(this.hit) {
            this.score += 1
            let scorediv = document.getElementsByTagName("score")[0]
            scorediv.innerHTML = `Score: ${this.score}`
            let game = document.getElementsByTagName("game")[0]
            game.appendChild(scorediv)

            console.log("ball hits paddle")
            this.balls[0].hit = true
        }


        requestAnimationFrame(()=>this.gameLoop())
    }

}

window.addEventListener("load", () => new Game())