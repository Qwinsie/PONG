class Game {

    private balls : Ball[] = []
    private paddle : Paddle

    constructor() {
        this.balls.push(new Ball())
        this.paddle = new Paddle()

        this.gameLoop()
    }

    private gameLoop() {
        for(let ball of this.balls) {
            ball.update()
        }

        this.paddle.update()

        requestAnimationFrame(()=>this.gameLoop())
    }

}

window.addEventListener("load", () => new Game())