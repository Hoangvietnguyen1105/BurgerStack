import { loadObitCameraPlugin } from "../src/orbit-camera";
import { AssetLoader } from "./assetLoader/assetLoader";
import { SceneManager } from "./template/scene/sceneManager";
import { GameConstant } from "./gameConstant";
import { InputManager } from "./template/systems/input/inputManager";
import { Time } from "./template/systems/time/time";
import { Tween } from "./template/systems/tween/tween";
import { Application, ElementInput, Keyboard, Mouse, TouchDevice, FILLMODE_FILL_WINDOW, RESOLUTION_AUTO, WasmModule, EVENT_KEYDOWN, KEY_R } from "playcanvas";
import { PlayScene } from "./gameDesign/scenes/playScene";
import { GameStateManager, GameState } from "./template/gameStateManager";
import { Configurator } from "./gameDesign/configtor/configtor";
import { DataLocalEvent, DataLocal } from "./gameDesign/data/dataLocal";
import { Physics } from "./physics/physics";
import { DataManager } from "./gameDesign/data/dataManager";
import { LoadingScene } from "./gameDesign/scenes/loadingScene";
export class Game {


  static init() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    this.app = new Application(canvas, {
      elementInput: new ElementInput(canvas),
      keyboard: new Keyboard(window),
      mouse: new Mouse(canvas),
      touch: new TouchDevice(canvas),
    });
    this.app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
    this.app.setCanvasResolution(RESOLUTION_AUTO);
    this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
    window.addEventListener("resize", () => this.app.resizeCanvas);

    WasmModule.setConfig("Ammo", {
      glueUrl: "assets/libs/ammo.wasm.js",
      wasmUrl: "assets/libs/ammo.wasm.wasm",
      fallbackUrl: "assets/libs/ammo.js",
    });
    loadObitCameraPlugin();
    this.app.keyboard.on(EVENT_KEYDOWN, (e) => {
      if (e.key === KEY_R) {
        this.app.fire("reset");
      };
    });
    WasmModule.getInstance("Ammo", () => {
      AssetLoader.loadAssets(this.app, () => {
        this.load();
        this.create();
      });
    });
  }

  static load() {
    InputManager.init(this.app);
    GameStateManager.init(GameState.Tutorial);
    Time.init(this.app);
    Tween.init(this.app);
    Configurator.config(this.app);
    this.app.on(DataLocalEvent.Initialize, () => {
      DataManager.init();
    });
    DataLocal.init();
    Physics.init(this.app);
    this.app.start();
  }

  static create() {
    this.numberBatch = this.app.batcher.addGroup("Number", true, 1000);
    this.sphereBatch = this.app.batcher.addGroup("Sphere", true, 100);
    this.gameCreated = true;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
    this.app.resizeCanvas(this.width, this.height);
    SceneManager.init([
      new LoadingScene,
      new PlayScene()
    ]);
    SceneManager.loadScene(SceneManager.getScene(GameConstant.SCENE_LOADING));
    this.sceneLoading = SceneManager.getScene(GameConstant.SCENE_LOADING);
    this.scenePlay = SceneManager.getScene(GameConstant.SCENE_PLAY);
    this.app.on("update", this.update, this);

  }

  static update(dt) {
    SceneManager.update(Time.dt);
  }

  static resize(screenSize) {
    if (this.gameCreated) {
      this.width = screenSize.width;
      this.height = screenSize.height;
      this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
      this.app.resizeCanvas(this.width, this.height);
      SceneManager.resize();
      this.app.fire("resize");
    }
  }

  static isPortrait() {
    return this.width < this.height;
  }

  static isLandscape() {
    return this.width > this.height;
  }
}

window.addEventListener("contextmenu", (e) => e.preventDefault());
// eslint-disable-next-line no-undef

window.onload = function () {
  Game.init();
}

window.addEventListener("resize", (event) => {
  Game.resize({ width: window.innerWidth, height: window.innerHeight })
});

