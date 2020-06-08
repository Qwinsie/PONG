class Game {
    
    private balls: Ball[] = []

    private paddle1: Paddle
    private paddle2: Paddle

    private score1: number = 0
    private score2: number = 0

    constructor() {
        for (let i = 0; i < 1; i++) {
            this.balls.push(new Ball())
        }

        this.paddle1 = new Paddle(87, 83, 1)
        this.paddle2 = new Paddle(38, 40, 2)

        this.update()        
    }

    private update(): void {
        for (let b of this.balls) {

            // ball hits left paddle
            if (this.checkCollision(b.getFutureRectangle(), this.paddle1.getRectangle())) {
                b.hitPaddle()
            }

            // ball hits right paddle
            if (this.checkCollision(b.getFutureRectangle(), this.paddle2.getRectangle())) {
                b.hitPaddle()
            }

            // ball is outside screen rightside
            if (b.getRectangle().left > innerWidth) {
                this.addScore(1)
                this.updateScore()
                b.removeBall()
                this.reset()
            }

            // ball is outside screen leftside
            if (b.getRectangle().right < 0) {
                this.addScore(2)
                this.updateScore()
                b.removeBall()
                this.reset()
            }
            
            b.update()
        }

        this.paddle1.update()
        this.paddle2.update()

        requestAnimationFrame(() => this.update())
    }

    private addScore(player : number) {
        if (player == 1) {
            this.score1 += 1
        } else if (player == 2) {
            this.score2 += 1
        }
    }

    private updateScore() {
            let scorediv = document.getElementsByTagName("splash")[0]
            scorediv.innerHTML = `${this.score1}:${this.score2}`
            document.body.appendChild(scorediv)
    }

    private reset() {
        this.balls.splice(0, 1)
        this.balls.push(new Ball())
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
} 

window.addEventListener("load", () => new Game())