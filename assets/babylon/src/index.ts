import { ActionManager, BabylonFileLoaderConfiguration, Engine, Scene } from "@babylonjs/core";
import "@babylonjs/materials";

import * as CANNON from "cannon";

import { appendScene } from "./scenes/tools";

declare global {
    const game: Game;
}

export class Game {
    /**
     * Defines the engine used to draw the game using Babylon.JS and WebGL.
     */
    public engine: Engine;
    /**
     * Defines the scene used to store and draw elements in the canvas.
     */
    public scene: Scene | null = null;

    /**
     * Constructor.
     */
    public constructor() {
        BabylonFileLoaderConfiguration.LoaderInjectedPhysicsEngine = CANNON;

        this.engine = new Engine(document.getElementById("renderCanvas") as HTMLCanvasElement, true);

        this._bindEvents();
        this.loadScene('scene');

        // Render.
        this.engine.runRenderLoop(() => this.scene?.render());
    }

    private disposeScene() {
        if (this.scene == null) {
            return;
        }
        this.scene.dispose();
        this.scene = null;
    }

    /**
     * Loads the first scene.
     */
    public async loadScene(sceneName: string): Promise<void> {
        this.disposeScene();

        const scene = new Scene(this.engine);

        const rootUrl = "./scenes/_assets/";

        await appendScene(scene, rootUrl, "../" + sceneName + "/scene.babylon");

        // Attach camera.
        if (!scene.activeCamera) {
            throw new Error("No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.");
        }

        scene.activeCamera.attachControl(this.engine.getRenderingCanvas(), false);

        this.scene = scene;
    }

    /**
     * Binds the required events for a full experience.
     */
    private _bindEvents(): void {
        window.addEventListener("resize", () => this.engine.resize());
    }


}
