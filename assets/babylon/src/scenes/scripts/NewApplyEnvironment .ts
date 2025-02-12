import { AnimationGroup, Color3, CubeTexture, HemisphericLight, Scene, Vector3 } from "@babylonjs/core";
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
export default class ApplyEnvironment extends Scene {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    ///////////////////////////////////////////////////////////////////////
    //////////////////////Start Edit///////////////////////////////////////
    playBtnAnimations: Array<string> = ['explode', 'openclose'];
    sliderAnimations: Array<string> = [];
    openAnimations: Array<string> = [];
    fadeSlider: Array<string> = [];
    /////////////////////////////End Edit////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    /**
     * Called on the node has been fully initialized and is ready.
     */
    public onInitialized(): void {
        // ...
        const light = new HemisphericLight('Hemilight', new Vector3(0, 1, 0), this);
        light.intensity = 1;
        light.diffuse = new Color3(1, 1, 1);
        light.specular = new Color3(1, 1, 1);
        light.groundColor = new Color3(0, 0, 0);
        this.createDefaultEnvironment({
            environmentTexture: '../assets/models/skyboxTest/skybox.env',
            groundColor: Color3.FromHexString('#f6f6f6'),
            createSkybox: false,

            // skyboxTexture: '../assets/models/skyboxTest/skybox',
            //skyboxSize: 100,
            //skyboxColor: Color3.FromHexString('#ffffff')
        })
        // const envTexture = new CubeTexture('../assets/models/skyboxTest/skybox.env', this)
        // this.createDefaultSkybox(envTexture, true, 1000)
        this.lights.forEach(light => {
            if (light.name == 'Viewport Light') {
                light.dispose();
            }
        })

        this.getMeshByName('BackgroundPlane').isPickable = false;
        console.log('main', game)
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
    }

    @visibleInInspector('boolean', 'isAnimation', true)
    private isAnimation: boolean;

    @visibleInInspector('boolean', 'isLooping', false)
    private isLooping: boolean;

    isAdded: boolean = false;
    playAdded: boolean = false;
    openAdded: boolean = false;
    sliderAdded: boolean = false;
    fadeAdded: boolean = false;
    playBtn: HTMLElement;
    playText: HTMLElement;
    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...



        if (this.openAnimations.length) {
            if (!this.openAdded) {
                if (document.getElementById('openBtn')) {
                    document.getElementById('openContainer').style.display = 'block';

                    document.getElementById('openBtn').addEventListener('click', () => this.OpenAnimation())

                    this.openAdded = true;
                }
            }
        }

        if (this.isAnimation) {
            if (!this.playAdded) {
                if (document.getElementById('playContainer')) {
                    // document.getElementById('playContainer').style.display = 'block';
                    // //if (document.getElementById('playBtn')) {
                    // this.playBtn = document.getElementById('playBtn');
                    // this.playText = document.getElementById('playPause');
                    // this.playBtn.removeEventListener('click', () => this.AddAnimation(this.isLooping))
                    // this.playBtn.addEventListener('click', () => this.AddAnimation(this.isLooping))

                    // }
                    this.CreatePlayBtn();
                    this.playAdded = true;
                }
            }
        }


    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }

    private CreatePlayBtn(): void {
        const playBtn = {
            elem: document.createElement('button')
        }
        const playLabel = {
            elem: document.createElement('label')
        }

        playBtn.elem.id = 'playBtn';
        playBtn.elem.className = 'button';
        playLabel.elem.id = 'playPause';
        playLabel.elem.innerText = 'Play';

        document.getElementById('playContainer').appendChild(playBtn.elem);
        document.getElementById('playBtn').appendChild(playLabel.elem);

        this.playBtn = document.getElementById('playBtn');
        this.playText = document.getElementById('playPause');

        this.playBtn.addEventListener('click', () => this.AddAnimation(this.isLooping));

        console.log('added play btn')
    }

    currentAnim: number = 0;

    private async PlayAnim(animGroup) {
        animGroup.play();
        return new Promise<void>((resolve) => {
            animGroup.onAnimationEndObservable.addOnce(() => {
                resolve();
            });
        });
    }

    private async PlayAnims(anims) {
        for (let i = this.currentAnim; i < anims.length; i++) {
            this.currentAnim = i;
            try {
                let nextAnimGroup = game['scene'].getAnimationGroupByName(anims[i]);
                await this.PlayAnim(nextAnimGroup);
            } catch (err) { }
        }
    }

    private OpenAnimation(): void {

    }

    private AddAnimation(loop): void {
        //this.isAdded = true;
        console.log(game['scene'])
        switch (this.playText.innerText) {
            case 'Reset':
                this.playBtnAnimations.forEach(animations => {
                    let resetAnim = game['scene'].getAnimationGroupByName(animations);
                    resetAnim.play();
                    resetAnim.goToFrame(0);
                    resetAnim.pause();
                    this.currentAnim = 0;
                })
                this.playText.innerText = 'Pause';

            case 'Play':
                if (this.playBtnAnimations.length) {
                    this.PlayAnims(this.playBtnAnimations).then(() => {
                        this.playText.innerText = 'Reset';
                    });
                } else {
                    game['scene'].animationGroups.forEach(animation => {
                        animation.play(loop)
                    })
                }
                this.playText.innerText = 'Pause';
                break;

            case 'Pause':

                game['scene'].animationGroups.forEach(animation => {
                    animation.pause()
                })


                this.playText.innerText = 'Play';
                break;
        }
    }
}
