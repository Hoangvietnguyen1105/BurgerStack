import { Script } from "../template/systems/script/script";
export const Moverment = Script.createScript({
    name: "moverment",
    attributes: {
        speed: { default: 1 }
    },
    initialize() {
        this.force = new pc.Vec3();
    },
    update() {
        var forceX = 0;
        var forceZ = 0;
        if (this.app.keyboard.isPressed(pc.KEY_LEFT)) {
            forceX = -this.speed;
        }

        if (this.app.keyboard.isPressed(pc.KEY_RIGHT)) {
            forceX += this.speed;
        }

        if (this.app.keyboard.isPressed(pc.KEY_UP)) {
            forceZ = -this.speed;
        }

        if (this.app.keyboard.isPressed(pc.KEY_DOWN)) {
            forceZ += this.speed;
        }
        this.force.x = forceX;
        this.force.z = forceZ;

        // if we have some non-zero force
        if (this.force.length()) {

            // calculate force vector
            var rX = Math.cos(-Math.PI * 0.25);
            var rY = Math.sin(-Math.PI * 0.25);
            this.force.set(this.force.x, 0, this.force.z);

            // clamp force to the speed
            if (this.force.length() > this.speed) {
                this.force.normalize().scale(this.speed);
            }
        }

        // apply impulse to move the entity
        // this.entity.rigidbody.applyImpulse(this.force);
        this.entity.translate(this.force); // Di chuyển đối tượng

    }

})