import { ActionManager, Color3, ExecuteCodeAction, HighlightLayer, Mesh, Matrix, Vector3, PointerEventTypes, ArcRotateCamera } from "@babylonjs/core";
import "@babylonjs/core/Shaders/outline.fragment";
import "@babylonjs/core/Shaders/outline.vertex";
import { visibleInInspector } from "../decorators";

//  The functions "onStart" and "onUpdate" are called automatically.
export default class OutlineScript extends Mesh {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    highlight = new HighlightLayer("Highlight", this._scene, {
        isStroke: true,
        mainTextureRatio: 2,
        blurHorizontalSize: 1
    });

    actionManager = new ActionManager(game.scene);
    // actionManager = new ActionManager(this._scene);

    //Inspector field for highlight groups
    @visibleInInspector('string', 'highlighthName', '')
    private highlighthName: string;

    //Inspector field for highlight color
    @visibleInInspector('string', 'highlighthColor', '#00FFFF')
    private highlighthColor: string;

    //Inspector field for highlight visibility
    @visibleInInspector('boolean', 'highlightVisible', false)
    private highlightVisible: boolean;

    //Inspector field for highlight visibility
    @visibleInInspector('string', 'sceneName', '')
    private sceneName: string;

    /**
     * Called on the node has been fully initialized and is ready.
     */
    public onInitialized(): void {
        //If highlights are set to be not visible, highlight methods get added to action manager so when mesh or labels are rolled over highlights become visible
        if (!this['highlightVisible']) {
            this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, this.AddHighlight));

            this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, this.RemoveHighlight));
        } else {
            this.AppendHighlight();
        }

        // if (this['sceneName']) {
        //     this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnCenterPickTrigger, this.LoadScene))
        // }

        this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnDoublePickTrigger, this.FocusMesh))

    }

    labelContainer: HTMLElement;
    labelDiv: Array<HTMLElement>;
    isAdded: boolean = false;
    isReadyToLoad: boolean = false;
    pointerDown: boolean = false;

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        //Finds all div's that are associated with this meshes highlight and adds the label rollover method
        if (document.getElementById(this.name + '_Target_labelContainer') && !this.isAdded && !this.highlightVisible) {
            this.labelContainer = document.getElementById(this.name + '_Target_labelContainer');
            this.AddLabelRollover();
        }

        if (!this.isReadyToLoad) {
            this.isReadyToLoad = true;
            this.labelDiv = Array.from(document.querySelectorAll('.labelDiv'));
            if (this['sceneName']) {
                this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnCenterPickTrigger, this.LoadScene))
            }
        }
    }

    private AppendHighlight(): void {
        if (this.highlighthName != '') {
            let meshesToHighlight = []
            game.scene.getActiveMeshes().forEach(mesh => {
                if (mesh['highlighthName'] == this.highlighthName) {
                    if (!meshesToHighlight.includes(mesh)) {
                        meshesToHighlight.push(mesh);
                    }
                }
                meshesToHighlight.forEach(hl => {
                    this.highlight.addMesh(hl, Color3.FromHexString(this.highlighthColor));
                })
            })
        } else {
            this.highlight.addMesh(this, Color3.FromHexString(this.highlighthColor));
        }
    }

    private AddLabelRollover(): void {
        this.isAdded = true;

        this.labelContainer.addEventListener('mouseover', () => {
            this.AppendHighlight();
        });

        this.labelContainer.addEventListener('mouseout', () => {
            this.RemoveHighlight();
        });
    }

    private AddHighlight(): void {

        game.scene.onPointerObservable.add((evt) => {
            switch (evt.type) {
                case PointerEventTypes.POINTERDOWN:
                    this.pointerDown = true;
                    break;
                case PointerEventTypes.POINTERUP:
                    this.pointerDown = false;
                    break;
            }
        })

        game.scene.onAfterRenderObservable.add(() => {
            if (!this.pointerDown) {
                const ray = game.scene.createPickingRay(game.scene.pointerX, game.scene.pointerY, Matrix.Identity(), game.scene.activeCamera);

                const raycastHit = game.scene.pickWithRay(ray);

                if (raycastHit.pickedMesh?.name != this.name) {
                    return;
                }
                this.AppendHighlight();
            }
        })
    }

    private RemoveHighlight(): void {
        if (this.highlighthName != '') {
            let meshesToRemoveHighlight = [];
            game.scene.getActiveMeshes().forEach(mesh => {
                if (mesh['highlighthName'] == this.highlighthName) {
                    if (!meshesToRemoveHighlight.includes(mesh)) {
                        meshesToRemoveHighlight.push(mesh);
                    }
                }
                meshesToRemoveHighlight.forEach(hl => {
                    this.highlight.removeMesh(hl);
                })
            })
        } else {
            this.highlight.removeMesh(this);
        }
    }

    private FocusMesh(): void {
        game.scene.activeCamera['target'] = this.position;
    }

    private LoadScene(): void {
        console.log('load anim', game.scene['currentAnim'])
        this.labelDiv.forEach(div => div.remove());
        if (document.getElementById('playBtn')) {
            document.getElementById('playBtn').remove();
        }
        if (document.getElementById('openBtn')) {
            document.getElementById('openBtn').remove();
        }
        game.scene.dispose();
        game.loadScene(this['sceneName']);
    }
}
