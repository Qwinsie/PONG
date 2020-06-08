class GameObject {

    protected div : HTMLElement

    protected x : number
    protected y: number

    constructor(name : string) {
        this.spawnObject(name)
    }

    private spawnObject(name : string) {
        this.div = document.createElement(`${name}`)
        document.body.appendChild(this.div)
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    // ??? What should this do?
    public update(): void {
        console.log("Gameobject is updating");
    }
}