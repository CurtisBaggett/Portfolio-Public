import { ActionManager, HighlightLayer, Mesh } from "@babylonjs/core";
import "@babylonjs/core/Shaders/outline.fragment";
import "@babylonjs/core/Shaders/outline.vertex";
export default class OutlineScript extends Mesh {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    highlight: HighlightLayer;
    actionManager: ActionManager;
    private highlighthName;
    private highlighthColor;
    private highlightVisible;
    private sceneName;
    /**
     * Called on the node has been fully initialized and is ready.
     */
    onInitialized(): void;
    labelContainer: HTMLElement;
    labelDiv: Array<HTMLElement>;
    isAdded: boolean;
    isReadyToLoad: boolean;
    pointerDown: boolean;
    /**
     * Called each frame.
     */
    onUpdate(): void;
    private AppendHighlight;
    private AddLabelRollover;
    private AddHighlight;
    private RemoveHighlight;
    private FocusMesh;
    private LoadScene;
}
