class Game {
    
    private gameobjects : GameObject[] = []

    private score1 : number = 0
    private score2 : number = 0

    constructor() {

        this.gameobjects.push(new Paddle(87, 83, 1))
        this.gameobjects.push(new Paddle(38, 40, 2))
        this.gameobjects.push(new PaddleUpgrade())

        for (let i = 0; i < 1; i++) {
            this.gameobjects.push(new Ball(1))
        }

        this.update()        
    }

    private update(): void {
        for (const ball of this.gameobjects) {
            // ball = gameobjects
            ball.update()

            
            if(ball instanceof Ball) {
                
                // ball is outside screen rightside
                if (ball.getRectangle().left > innerWidth) {
                    ball.setToStartPos(-1)
                    this.addScore(1)
                    this.updateScore()
                }
                
                // ball is outside screen leftside
                if (ball.getRectangle().right < 0) {
                    ball.setToStartPos(1)
                    this.addScore(2)
                    this.updateScore()
                }
                
                // gameobject == Paddle
                // check if paddle hits a ball object
                for (const paddle of this.gameobjects) {
                    if(paddle instanceof Paddle) {
                        if (this.checkCollision(ball.getFutureRectangle(), paddle.getRectangle())) {
                            ball.hitPaddle()
                        }
                        for (const paddleupgrade of this.gameobjects) {
                            if(paddleupgrade instanceof PaddleUpgrade) {
                                if (this.checkCollision(ball.getFutureRectangle(), paddleupgrade.getRectangle())) {
                                    paddleupgrade.hitByBall()
                                    paddle.paddleGrow()
                                }
                            }
                        }
                    }

                }

            }
        }

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

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
} 

window.addEventListener("load", () => new Game())