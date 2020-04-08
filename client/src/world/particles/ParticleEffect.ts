import DynamicGameEntity from "../../engine/DynamicGameEntity";
import Transform from "../../engine/Transform";
import {Mesh, Vector3} from "three";
import Game from "../../engine/Game";

abstract class ParticleEffect implements DynamicGameEntity {

    protected numberOfParticlesPerTick: number = 3;
    protected timeBetweenParticlesMs: number = 30;
    protected particleTimeAliveMs: number = 1000;
    protected iterations = 1;
    protected currentIteration = 0;

    // particles have no interaction with environment,
    // so a mesh can be used directly.
    protected particles: Mesh[] = [];
    protected worldPosition: Vector3;
    protected game: Game;

    constructor(game: Game, worldPosition: Vector3) {
        this.worldPosition = worldPosition;
        this.game = game;
    }


    setNumberOfParticlesPerTick(value: number) {
        this.numberOfParticlesPerTick = value;
    }

    setTimeBetweenParticlesMs(value: number) {
        this.timeBetweenParticlesMs = value;
    }

    setParticleTimeAliveMs(value: number) {
        this.particleTimeAliveMs = value;
    }

    getTransform(): Transform {
        return undefined;
    }

    update(step: number): void {
        if (this.currentIteration < this.iterations) {
            for (let i = 0; i < this.numberOfParticlesPerTick; i++) {
                const newParticle = this.createParticleMesh();
                newParticle.position.set(this.worldPosition.x, this.worldPosition.y, this.worldPosition.z);
                this.particles.push(newParticle);
                this.game.getScene().add(newParticle);
            }
            this.currentIteration++;
        }

        // this.particles.forEach(particle => {
        //    particle.position.addScalar(Math.random() * 10 / step);
        // });
    }

    abstract createParticleMesh(): Mesh;
}

export default ParticleEffect;