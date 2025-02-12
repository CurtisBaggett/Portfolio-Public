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

    playBtnAnimations: Array<string> = [];

    openBtnAnimations: Array<string> = ['LandingAni'];

    expandSliderAnimations: Array<string> = [];

    fadeSliderObj: Object = {
        Group_1: ['DRON DL-3.007_primitive0', 'DRON DL-3.007_primitive1', 'DRON DL-3.007_primitive2', 'DRON DL-3.007_primitive3', 'DRON DL-3.007_primitive4', 'DRON DL-3.008', 'DRON DL-3.009', 'DRON DL-3.010', 'DRON DL-3', 'DRON DL-3.016', 'DRON DL-3.014', 'DRON DL-3.011', 'DRON DL-3.017', 'DRON DL-3.015', 'DRON DL-3.013', 'DRON DL-3.012']
    };

    //console.log(this.scene.getActiveMeshes())
    /////////////////////////////End Edit////////////////////////////////
    ////////////////////////////////////////////////////////////////////


    @visibleInInspector('boolean', 'isAnimation', false)
    private isAnimation: boolean;

    @visibleInInspector('boolean', 'isOpen', false)
    private isOpen: boolean;

    @visibleInInspector('boolean', 'isLooping', false)
    private isLooping: boolean;

    playAdded: boolean = false;
    openAdded: boolean = false;
    isPlaying: boolean = false;
    isOpening: boolean = false;
    isRotating: boolean = false;
    sliderAdded: boolean = false;
    fadeAdded: boolean = false;


    playBtn: HTMLElement;
    playText: HTMLElement;
    openBtn: HTMLElement;
    openText: HTMLElement;
    fadeSlider: HTMLElement;

    currentAnim: number;
    openPos: number = 0;
    playPos: number = 0;
    speed: number = 1;

    newCamPos: Vector3;
    oldCamPos: Vector3;

    closeAnimations: Array<string> = this.openBtnAnimations.toReversed();

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
        })

        this.lights.forEach(light => {
            if (light.name == 'Viewport Light') {
                light.dispose();
            }
        })
        this.getMeshByName('BackgroundPlane').isPickable = false;

        this.newCamPos = this.activeCamera.position.multiply(new Vector3(100, 100, 100));
        this.oldCamPos = this.newCamPos;

    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...

        if (this.isOpen) {
            if (!this.openAdded) {
                if (document.getElementById('openContainer')) {
                    this.CreateOpenBtn();
                    this.openAdded = true;
                }
            }
        }

        if (this.isAnimation) {
            if (!this.playAdded) {
                if (document.getElementById('playContainer')) {
                    this.CreatePlayBtn();
                    this.playAdded = true;
                }
            }
        }

        if (!this.fadeAdded) {
            if (document.getElementById('slidecontainer')) {
                this.CreateFadeSlider();
                this.fadeAdded = true;
            }
        }


        this.newCamPos = this.activeCamera.position.multiply(new Vector3(100, 100, 100));

        if (this.newCamPos.x != this.oldCamPos.x) {
            this.oldCamPos = this.newCamPos;
            this.isRotating = true
        } else {
            this.isRotating = false;
        }

        if (this.isRotating) {
            this.animationGroups.forEach(animation => {
                animation.pause();
            })
        }

        if (!this.isRotating) {
            setTimeout(() => {
                if (this.isPlaying) {
                    this.currentAnim = this.playPos;
                    this.speed = 1;
                    this.PlayAnims(this.playBtnAnimations).then(() => {
                        this.playText.innerText = 'Reset';
                        this.isPlaying = false;
                    });
                }
                if (this.isOpening) {
                    if (this.openText.innerText == 'Land') {
                        this.currentAnim = this.openPos;
                        this.PlayAnims(this.openBtnAnimations).then(() => {
                            this.playBtn?.style.pointerEvents = 'all';
                            this.openBtn.style.pointerEvents = 'all';

                            this.isOpening = false;
                            this.openPos = 0;
                        });
                    }
                    if (this.openText.innerText == 'Hover') {
                        this.currentAnim = this.openPos;
                        this.speed = -1;
                        this.PlayAnims(this.closeAnimations).then(() => {
                            this.playBtn?.style.pointerEvents = 'all';
                            this.openBtn.style.pointerEvents = 'all';

                            this.isOpening = false;
                            this.openPos = 0;
                            this.speed = 1;
                        });
                    }
                }
            }, 100)
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

    private CreateFadeSlider(): void {
        const sliderLabel = {
            elem: document.createElement('label')
        }
        
        const fadeSliderEl = {
            elem: document.createElement('input')
        }        

        fadeSliderEl.elem.id = 'fade';
        fadeSliderEl.elem.className = 'slider';
        fadeSliderEl.elem.type = 'range';
        fadeSliderEl.elem.min = '0';
        fadeSliderEl.elem.max = '1';
        fadeSliderEl.elem.value = '1';
        fadeSliderEl.elem.step = '0.1';

        sliderLabel.elem.innerText = 'Fade Slider';
        sliderLabel.elem.className = 'sliderLabel';

        document.getElementById('slidecontainer').appendChild(sliderLabel.elem);
        
        document.getElementById('slidecontainer').appendChild(fadeSliderEl.elem);

        this.fadeSlider = document.getElementById('fade');

        this.SetFadeMaterial();

        this.fadeSlider.addEventListener('input', () => this.AddFadeSliderAction())      
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

        this.playBtn.addEventListener('click', () => this.AddPlayAnimation(this.isLooping));
    }

    private CreateOpenBtn(): void {
        const openBtn = {
            elem: document.createElement('button')
        }
        const openLabel = {
            elem: document.createElement('label')
        }

        openBtn.elem.id = 'openBtn';
        openBtn.elem.className = 'button';
        openLabel.elem.id = 'openClose';
        openLabel.elem.innerText = 'Hover';

        document.getElementById('openContainer').appendChild(openBtn.elem);
        document.getElementById('openBtn').appendChild(openLabel.elem);

        this.openBtn = document.getElementById('openBtn');
        this.openText = document.getElementById('openClose');

        this.openBtn.addEventListener('click', () => this.AddOpenAnimation());
    }
    private SetFadeMaterial(): void {
        for (const mesh in this.fadeSliderObj) {
            this.fadeSliderObj[mesh].forEach(mat => {
                this.getMeshByName(mat).material.needDepthPrePass = true;
            })
        }
    }

    private AddFadeSliderAction(): void {
        Object.keys(this.fadeSliderObj).forEach(key => {
            this.fadeSliderObj[key].forEach(mesh => {
               	this.getMeshByName(mesh).visibility = this.fadeSlider['value'];
            })
        });
    }

    private async PlayAnim(animGroup: AnimationGroup) {
        animGroup.speedRatio = this.speed;
        animGroup.play();
        return new Promise<void>((resolve) => {
            animGroup.onAnimationEndObservable.addOnce(() => {
                resolve();
            });
        });
    }

    private async PlayAnims(anims: Array<string>) {
        for (let i = this.currentAnim; i < anims.length; i++) {
            this.currentAnim = i;
            try {
                let nextAnimGroup = this.getAnimationGroupByName(anims[i]);

                if (this.playBtnAnimations.includes(nextAnimGroup.name)) {
                    this.speed = 1;
                    this.playPos = this.currentAnim;
                }
                if (this.openBtnAnimations.includes(nextAnimGroup.name)) {
                    this.openPos = this.currentAnim;
                }

                await this.PlayAnim(nextAnimGroup);
            } catch (err) { }
        }
    }

    private AddOpenAnimation(): void {
        switch (this.openText.innerText) {
            case 'Hover':
                this.currentAnim = this.openPos;
                this.isOpening = true;
                this.PlayAnims(this.openBtnAnimations).then(() => {
                    this.playBtn?.style.pointerEvents = 'all';
                    this.openBtn.style.pointerEvents = 'all';

                    this.isOpening = false;
                    this.openPos = 0;
                });
                this.openText.innerText = 'Land';
                this.playBtn?.style.pointerEvents = 'none';
                this.openBtn.style.pointerEvents = 'none';
                break;

            case 'Land':
                this.currentAnim = this.openPos;
                this.isOpening = true;
                this.speed = -1;
                this.PlayAnims(this.closeAnimations).then(() => {
                    this.playBtn?.style.pointerEvents = 'all';
                    this.openBtn.style.pointerEvents = 'all';

                    this.isOpening = false;
                    this.openPos = 0;
                    this.speed = 1;
                });
                this.openText.innerText = 'Hover';
                this.playBtn?.style.pointerEvents = 'none';
                this.openBtn.style.pointerEvents = 'none';
                break;
        }

    }

    private AddPlayAnimation(loop: boolean): void {
        console.log(game['scene'])
        switch (this.playText.innerText) {
            case 'Reset':
                this.playBtnAnimations.forEach(animations => {
                    let resetAnim = this.getAnimationGroupByName(animations);
                    resetAnim.play();
                    resetAnim.goToFrame(0);
                    resetAnim.pause();
                    this.playPos = 0;
                })

            case 'Play':
                if (this.playBtnAnimations.length) {
                    this.currentAnim = this.playPos;
                    this.PlayAnims(this.playBtnAnimations).then(() => {
                        this.playText.innerText = 'Reset';
                        this.isPlaying = false;
                    });
                } else {
                    this.animationGroups.forEach(animation => {
                        animation.play(loop)
                    })
                }
                this.isPlaying = true;
                this.playText.innerText = 'Pause';
                break;

            case 'Pause':

                this.animationGroups.forEach(animation => {
                    animation.pause();
                })

                this.isPlaying = false;
                this.playText.innerText = 'Play';
                break;
        }
    }
}
