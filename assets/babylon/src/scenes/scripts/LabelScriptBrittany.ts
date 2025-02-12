import { ActionManager, ExecuteCodeAction, Mesh, Vector3 } from "@babylonjs/core";
import "@babylonjs/core/Shaders/outline.fragment";
import "@babylonjs/core/Shaders/outline.vertex";
import { visibleInInspector } from "../decorators";

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
    //this.outline = new OutlineRenderer(this.scene);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node has been fully initialized and is ready.
     */

    actionManager = new ActionManager(game.scene);

    newName: string;

    public onInitialized(): void {
        //Get target mesh to attach label objects to
        this.newName = this.name.replace(/_Target/g, '');

        //Attach label objects to mesh
        this._scene.meshes.forEach(target => {
            if (target.name == this.newName) {
                this.setParent(target);
            }
        });

        //Turn label mesh off
        this.visibility = 0;

        //Turn label mesh pickable off
        this.isPickable = false;

        //Add labels and leader lines to _scene
        this.AddLabel();
    }

    isAdded: boolean = false;
    labelDiv: Array<HTMLElement>;
    labelToggel: HTMLElement;

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        if (!this.isAdded) {

            if (document.getElementById('labelToggle')) {
                this.isAdded = true;
                this.labelDiv = Array.from(document.querySelectorAll('.labelDiv'));
                this.labelToggel = document.getElementById('labelToggle');
                this.ToggleLabels();
                document.getElementById('labelToggle').addEventListener('click', this.ToggleLabels)
            }
        }
    }


    //Inspector field for label text
    @visibleInInspector('string', 'labelText', 'Add Label Text')
    private labelText: string;

    //Inspector field for length of leader line
    @visibleInInspector('number', 'length', 100)
    private length: number;

    //Inspector field for direction label should go.
    //up
    //down
    //left
    //right
    @visibleInInspector('string', 'direction', 'up')
    private direction: string;


    canvasZone = document.body;
    meshName = '';

    public AddLabel(): void {

        this.meshName = this.name;

        const container = {
            pos: this.absolutePosition,
            elem: document.createElement('div')
        }

        const label = {
            elem: document.createElement('div')
        }

        const leader = {
            elem: document.createElement('div')
        }

        //Container Styling
        container.elem.style.position = 'absolute';
        container.elem.id = this.meshName + '_labelContainer';
        container.elem.className = 'labelDiv';

        //Label Styling
        // label.elem.style.pointerEvents = 'none';
        label.elem.style.userSelect = 'none';
        label.elem.style.display = 'inline-block';
        label.elem.style.position = 'relative';
        label.elem.style.marginLeft = 'auto';
        label.elem.style.marginRight = 'auto';
        label.elem.style.maxWidth = '20vw';
        label.elem.style.height = 'auto';
        label.elem.style.backgroundImage = 'linear-gradient('
            + '180deg' + ', ' + 'rgba(111, 110, 110, 1)' + ', ' + 'rgba(49, 49, 49, 1)' + ')';
        label.elem.style.top = '0px';
        label.elem.style.left = '0px';
        label.elem.style.zIndex = '1';
        label.elem.style.padding = '5px 10px';
        label.elem.style.borderRadius = '2px';
        label.elem.innerHTML += this.labelText;
        label.elem.style.textAlign = 'center';
        label.elem.style.fontSize = '20px';
        label.elem.style.fontFamily = 'Arial';
        label.elem.style.fontWeight = 'bold';
        label.elem.style.color = '#fff';
        label.elem.style.border = '0px solid black';
        label.elem.style.outline = '1px solid #828282';
        label.elem.style.outlineOffset = '5px';
        label.elem.style.opacity = '1';
        label.elem.style.pointerEvents = 'none';
        label.elem.id = this.meshName;
        //Leader Styling
        leader.elem.style.position = 'relative';
        leader.elem.style.width = '2px'
        leader.elem.style.backgroundColor = '#828282';
        leader.elem.style.zIndex = '0';
        leader.elem.style.height = '2px';

        //Append container to document
        this.canvasZone.appendChild(container.elem);

        //Append label and leader to container
        document.getElementById(this.name + '_labelContainer').appendChild(label.elem)

        container.elem.style.width = `${label.elem.offsetWidth + 5}px`;
        container.elem.style.height = `${label.elem.offsetHeight}px`;

        document.getElementById(this.name + '_labelContainer').appendChild(leader.elem)

        let renderer = this._scene.enableDepthRenderer(this._scene.activeCamera, false);

        let depthMap = renderer.getDepthMap();

        let buffer = new Float32Array(4 * depthMap.getSize().width * depthMap.getSize().height);

        let labelHeight = document.getElementById(this.name + '_labelContainer').offsetHeight;
        let labelWidth = document.getElementById(this.name + '_labelContainer').offsetWidth;

        this._scene.onAfterRenderObservable.add(() => {
            let meshPos = this.position.multiply(new Vector3(10, 10, 10));
            let labelIndex = Math.round(1000 / this._scene.activeCamera.position.subtract(meshPos).length());

            depthMap.readPixels(0, 0, buffer);

            let posInViewProj = Vector3.TransformCoordinates(container.pos, this._scene.getTransformMatrix());

            let screenCoords = posInViewProj.multiplyByFloats(0.5, -0.5, 1.0).add(new Vector3(0.5, 0.5, 0.0)).
                multiplyByFloats(this._scene.getEngine().getRenderWidth(), this._scene.getEngine().getRenderHeight(), 1);

            let px = screenCoords.x - labelWidth / 2;
            let py = screenCoords.y - labelHeight / 2;

            switch (this.direction) {
                case 'up':
                    container.elem.style.left = (px + this.canvasZone.offsetLeft) + 'px';
                    container.elem.style.top = ((py + this.canvasZone.offsetTop) - this.length) + 'px';

                    leader.elem.style.marginLeft = 'auto';
                    leader.elem.style.marginRight = 'auto';
                    leader.elem.style.height = (this.length - ((container.elem.offsetHeight / 2) + 5)) + 'px';
                    leader.elem.style.top = ((leader.elem.offsetWidth / 2) + 5) + 'px';
                    break;

                case 'down':
                    container.elem.style.left = (px + this.canvasZone.offsetLeft) + 'px';
                    container.elem.style.top = (py + this.canvasZone.offsetTop) + this.length + 'px';

                    leader.elem.style.marginLeft = 'auto';
                    leader.elem.style.marginRight = 'auto';
                    leader.elem.style.height = (this.length - ((container.elem.offsetHeight / 2) + 5)) + 'px';
                    leader.elem.style.top = (((leader.elem.offsetHeight) + (container.elem.offsetHeight + 5)) * (-1)) + 'px';
                    break;

                case 'right':
                    container.elem.style.left = ((px + this.canvasZone.offsetLeft) + ((container.elem.offsetWidth / 2) + this.length)) + 'px';
                    container.elem.style.top = (py + this.canvasZone.offsetTop) + 'px';

                    leader.elem.style.width = this.length + 'px';
                    leader.elem.style.left = ((leader.elem.offsetWidth + 5) * (-1)) + 'px';
                    leader.elem.style.top = ((container.elem.offsetHeight / 2) * (-1)) + 'px';
                    break;

                case 'left':
                    container.elem.style.left = ((px + this.canvasZone.offsetLeft) - ((container.elem.offsetWidth / 2) + this.length)) + 'px';
                    container.elem.style.top = (py + this.canvasZone.offsetTop) + 'px';

                    leader.elem.style.width = this.length + 'px';
                    leader.elem.style.left = ((container.elem.offsetWidth)) + 'px';
                    leader.elem.style.top = ((container.elem.offsetHeight / 2) * (-1)) + 'px';
                    break;

            }


            px = Math.floor(px + labelWidth / 2);
            py = Math.floor(this._scene.getEngine().getRenderHeight() - (py + labelHeight / 2));

            container.elem.style.zIndex = labelIndex.toString();

        });

    }

    private ToggleLabels(): void {
        switch (this.labelToggel['checked']) {
            case true:
                this.labelDiv.forEach(div => div.style.display = 'block');
                break;
            case false:
                this.labelDiv.forEach(div => div.style.display = 'none')
                break;
        }

    }

    public RemoveLabel(): void {
        this.canvasZone.removeChild(document.getElementById(this.name));
    }

}

