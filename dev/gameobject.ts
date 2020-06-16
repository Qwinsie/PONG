class GameObject {
    // Fields
    protected div : HTMLElement

    protected x : number = 0
    protected y: number = 0

    protected scaleX : number = 1
    protected scaleY : number = 1

    protected rotation : number = 0

    public get width() : number {
        return this.div.clientWidth * this.scaleX
    }

    public get height() : number {
        return this.div.clientHeight * this.scaleY
    }

    constructor(name : string) {
        this.spawnObject(name)
    }

    private spawnObject(name : string) {
        this.div = document.createElement(`${name}`)
        document.body.appendChild(this.div)
    }

    public getRectangle() : DOMRect {
        return this.div.getBoundingClientRect()
    }

    public update(): void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(${this.scaleX}) scaleY(${this.scaleY}) rotate(${this.rotation}turn)` 
    }
}