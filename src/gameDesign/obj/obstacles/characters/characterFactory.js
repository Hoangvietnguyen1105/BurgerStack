import { Spawner } from "../../../script/spawners/spawner";
import { Character } from "./characters";
import { Entity } from "playcanvas";
import { SpawningEvent } from "../../../script/spawners/spawningEvent";
export class CharacterFactory extends Entity {
    constructor() {
        super();
        this._initSpawner();
        this.on(SpawningEvent.Spawn, () => {
            this.value = 0;
            this.elements.forEach((element) => {
                element.fire(SpawningEvent.Despawn);
            });
            this.elements = [];
            // this.collider && this.collider.enable();
        });
        this.elements = [];
    }

    config(data) {
        this.value = data.value;
        let valueString = this.value.split("-");
        let pos = data.pos;
        let rot = data.rot;
        let scale = data.scale;
        this.setLocalPosition(pos.x, pos.y, pos.z);
        this.setLocalEulerAngles(rot.x, rot.y, rot.z);
        this.setLocalScale(scale.x, scale.y, scale.z);
        for (let i = 0; i < valueString.length; i++) {
            var element = valueString[i];
            let character = this.createCharacter(element);
            this.addChild(character);
        }
        this.updateSize(valueString);

        //this.collider.box.setLocalScale(0.5 * valueString.length, 1, 0.5)
    }
    _initSpawner() {
        // create each number to render

        let burgerTopSpawnerEntity = new Entity("burgerTopSpawner");
        this.addChild(burgerTopSpawnerEntity);
        this.burgerTopSpawner = burgerTopSpawnerEntity.addScript(Spawner, {
            class: Character,
            poolSize: 10,
            args: ["BurgerTop"]
        });
        this.burgerTopSpawner.initialize();
        this.burgerTopSpawner.postInitialize();

        let burgerBotSpawnerEntity = new Entity("burgerBotSpawner");
        this.addChild(burgerBotSpawnerEntity);
        this.burgerBotSpawner = burgerBotSpawnerEntity.addScript(Spawner, {
            class: Character,
            poolSize: 10,
            args: ["BurgerBot"]
        });
        this.burgerBotSpawner.initialize();
        this.burgerBotSpawner.postInitialize();

    }
    createCharacter(value) {
        let spawner = this.getSpawner(value);
        let character = spawner.spawn();
        this.elements.push(character);
        return character;
    }

    getSpawner(value) {
        switch (value) {
            case "BurgerTop":
                return this.burgerTopSpawner;
            case "BurgerBot":
                return this.burgerBotSpawner;
            default:
                return null;
        }
    }
    updateMaterial(material) {
        for (let i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];
            element.updateMaterial(material);
        }
    }
    updateSize(valueString) {
        // let targetScale = this.value / 1000 + Math.pow(1.16, valueString.length - 1);
        let scale = 1.9;
        this.elements.forEach((element, index) => {

            element.setLocalScale(scale, scale, scale);
            let x = ((valueString.length - 1) * (-scale / 2) / 2);
            element.setLocalPosition(0, index * (-1.2 * scale) - x, 0);
        });
        return scale;
    }


}