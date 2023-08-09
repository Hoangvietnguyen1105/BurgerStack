import { Entity } from "playcanvas";
import { AssetLoader } from "../../../../assetLoader/assetLoader";
export class Character extends Entity {
    constructor(value) {
        super();
        value = value || "BurgerTOP";
        this.addComponent("model", {
            asset: AssetLoader.getAssetByKey(value),
        });
        this.value = value;
    }

    updateMaterial(material) {
        this.model.meshInstances[0].material = material;
    }
}