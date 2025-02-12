import { ActionManager, Mesh } from "@babylonjs/core";
import "@babylonjs/core/Shaders/outline.fragment";
import "@babylonjs/core/Shaders/outline.vertex";
/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameras
 *      - Transform nodes
 *
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class LabelScript extends Mesh {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    /**
     * Called on the node has been fully initialized and is ready.
     */
    actionManager: ActionManager;
    newName: string;
    onInitialized(): void;
    isAdded: boolean;
    labelDiv: Array<HTMLElement>;
    labelToggel: HTMLElement;
    /**
     * Called each frame.
     */
    onUpdate(): void;
    private labelText;
    private length;
    private direction;
    canvasZone: HTMLElement;
    meshName: string;
    AddLabel(): void;
    private ToggleLabels;
    RemoveLabel(): void;
}
