import { ObjectFactory } from "../../../template/objects/objectFactory"
export class Player extends pc.Entity {
    constructor() {
        super()
        this.player = ObjectFactory.createBox()
        this.player.setLocalScale(0.3, 0.3, 0.3)
        this.addChild(this.player)
    }
}   