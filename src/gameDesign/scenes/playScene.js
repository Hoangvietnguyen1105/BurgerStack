import { Scene } from "../../template/scene/scene";
import { GameConstant } from "../../gameConstant";
import { LIGHTTYPE_DIRECTIONAL } from "playcanvas"
import { Player } from "../obj/player/player";
import { Util } from "../../helpers/util";
import { CameraController } from "../../script/controller/cameraController";

export class PlayScene extends Scene {
    constructor() {
        super(GameConstant.SCENE_PLAY);
    }
    create() {
        super.create();
        // this.ui.addScreens(
        //     new PlayScreen()
        // );
        // this.screenplay = this.ui.getScreen(GameConstant.SCREEN_PLAY);
        // this.ui.setScreenActive(GameConstant.SCREEN_PLAY);
        this._initialize();
    }
    update(dt) {
        super.update(dt);
    }
    _initialize() {
        this._initLight();
        this._initPlayer();
        this._initCamera();
        // this._initCameraFollow();
    }
    _initCameraController() {
        this.cameraController = this.mainCamera.addScript(CameraController, {
            target: this.player,
            speed: 3,
            offset: this.mainCamera.getPosition().clone(),
            limitX: GameConstant.CAMERA_LIMIT_X,
        });
    }
    _initCamera() {
        this.mainCamera = new pc.Entity();
        this.addChild(this.mainCamera);
        this.mainCamera.addComponent("camera", {
            clearColor: Util.createColor(84, 197, 199),
            farClip: 1000,
            fov: 60,
            nearClip: 0.1,
            type: pc.PROJECTION_PERSPECTIVE,
            frustumCulling: false,
        });
        // this.mainCamera.setLocalPosition(5, 10, -10);
        // this.mainCamera.setLocalEulerAngles(-30, 180, 0);
        this.mainCamera.setLocalPosition(0, 10, 10);
        this.mainCamera.setLocalEulerAngles(-40, 0, 0);
        this.mainCamera.setLocalPosition(0, GameConstant.CAMERA_POSITION_Y, GameConstant.CAMERA_POSITION_Z);
        this.mainCamera.setLocalEulerAngles(-32, 180, 0);
        if (GameConstant.DEBUG_CAMERA) {
            this.mainCamera.addComponent("script");
            this.mainCamera.script.create("orbitCamera", {
                attributes: {
                    inertiaFactor: 0.3, // Override default of 0 (no inertia)
                },
            });

            this.mainCamera.script.create("orbitCameraInputMouse");
            this.mainCamera.script.create("orbitCameraInputTouch");
            // this.player.controller.swipeMovement.disable();
            // this.player.controller.move.disable();
        } else {
            this._initCameraController();
        }
    }

    _initLight() {
        this.directionalLight = new pc.Entity("light-directional");
        this.addChild(this.directionalLight);

        this.directionalLight.addComponent("light", {
            type: LIGHTTYPE_DIRECTIONAL,
            color: new pc.Color(0, 0, 0),
            castShadows: false,
            shadowDistance: 30,
            shadowResolution: 1024,
            shadowBias: 0.2,
            normalOffsetBias: 0.05,
            intensity: 0.85,
        });
        this.directionalLight.setLocalPosition(2, 30, -2);
        this.directionalLight.setLocalEulerAngles(45, 135, 0);
    }
    _initPlayer() {
        this.player = new Player();
        this.addChild(this.player);
    }



}