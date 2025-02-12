import { Engine, Scene } from "@babylonjs/core";
import "@babylonjs/materials";
declare global {
    const game: Game;
}
export declare class Game {
    /**
     * Defines the engine used to draw the game using Babylon.JS and WebGL.
     */
    engine: Engine;
    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
    scene: Scene | null;
    /**
     * Constructor.
     */
    constructor();
    private disposeScene;
    /**
     * Loads the first scene.
     */
    loadScene(sceneName: string): Promise<void>;
    /**
     * Binds the required events for a full experience.
     */
    private _bindEvents;
}
