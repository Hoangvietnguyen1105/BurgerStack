import { ObjectFactory } from "../../../template/objects/objectFactory"
import { Move } from "../../script/components/move";
import { Entity } from "playcanvas";
import { GameConstant } from "../../../gameConstant";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { Vec3 } from "playcanvas";
import { CharacterFactory } from "../obstacles/characters/characterFactory";
// import { ObjLoader } from "../../../assetLoader/objLoader";
export class Player extends pc.Entity {
    constructor() {
        super()
        this._initRays();
        this.character = new CharacterFactory();
        this.addChild(this.character);
        //create number 
        this.character.config({
            value: GameConstant.PLAYER_MODEL, //number start value when render
            pos: { x: 0, y: 0, z: 0 }, //position of number
            rot: { x: 12, y: 0, z: 0 }, //rotation of number
            scale: { x: 1, y: 1, z: 1 } //scale of number
        });
        this.character.updateMaterial(AssetLoader.getAssetByKey("mat_blue_number").resource);
        // this.character.collider.enabled = false;
        // this.value = this.character.value;

    }
    _initRays() {
        this.debugRayEntity = new Entity();
        this.debugRayEntity.setLocalScale(0.1, 0.1, 0.1);
        this.addChild(this.debugRayEntity);
        if (GameConstant.DEBUG_RAY) {
            let mat = new pc.StandardMaterial();
            mat.diffuse.set(1, 0, 0);
            this.debugRayEntity.addComponent("model", {
                type: "sphere",
            });
            this.debugRayEntity.model.material = mat;
        }
    }
}   