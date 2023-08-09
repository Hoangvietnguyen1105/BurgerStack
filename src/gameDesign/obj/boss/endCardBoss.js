import { Entity } from "playcanvas";
import { CharacterFactory } from "../obstacles/characters/characterFactory";
import { CollisionTag } from "../../../physics/collisionTag";
import { AssetLoader } from "../../../assetLoader/assetLoader";
import { SpawningEvent } from "../../script/spawners/spawningEvent";

export class EndCardBoss extends Entity {
  constructor() {
    super("end-card-boss");
    this.value = 0;

    this.characterFactory = new CharacterFactory();
    this.addChild(this.characterFactory);
  }

  config(data) {
    this.value = data.value;
    this.characterFactory.elements.forEach(element => {
      element.fire(SpawningEvent.Despawn);
    });
    this.characterFactory.elements = [];
    this.characterFactory.config({
      value: this.value,
      pos: { x: 0, y: 0.63, z: 40 },
      rot: { x: 12, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    });
    let pos = data.pos;
    let rot = data.rot;
    let scale = data.scale;
    this.setLocalPosition(pos.x, pos.y, pos.z);
    this.setLocalEulerAngles(rot.x, rot.y, rot.z);
    this.setLocalScale(scale.x, scale.y, scale.z);
    this.characterFactory.collider.tag = CollisionTag.Boss;
    this.characterFactory.updateMaterial(AssetLoader.getAssetByKey("mat_red_number").resource);
  }
}