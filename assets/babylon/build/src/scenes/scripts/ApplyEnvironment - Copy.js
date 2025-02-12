"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var decorators_1 = require("../decorators");
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
var ApplyEnvironment = /** @class */ (function (_super) {
    __extends(ApplyEnvironment, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function ApplyEnvironment() {
        var _this = this;
        ///////////////////////////////////////////////////////////////////////
        //////////////////////Start Edit///////////////////////////////////////
        _this.playBtnAnimations = ['M240D_Air_Barrel', 'M240D_Air_Cover'];
        _this.sliderAnimations = [];
        _this.openAnimations = [];
        _this.fadeSlider = [];
        _this.isAdded = false;
        _this.playAdded = false;
        _this.openAdded = false;
        _this.sliderAdded = false;
        _this.fadeAdded = false;
        _this.currentAnim = 0;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    ApplyEnvironment.prototype.onInitialize = function () {
        // ...
    };
    /////////////////////////////End Edit////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    /**
     * Called on the node has been fully initialized and is ready.
     */
    ApplyEnvironment.prototype.onInitialized = function () {
        // ...
        var light = new core_1.HemisphericLight('Hemilight', new core_1.Vector3(0, 1, 0), this);
        light.intensity = 1;
        light.diffuse = new core_1.Color3(1, 1, 1);
        light.specular = new core_1.Color3(1, 1, 1);
        light.groundColor = new core_1.Color3(0, 0, 0);
        this.createDefaultEnvironment({
            environmentTexture: '../assets/models/skyboxTest/skybox.env',
            groundColor: core_1.Color3.FromHexString('#f6f6f6'),
            createSkybox: false,
            // skyboxTexture: '../assets/models/skyboxTest/skybox',
            //skyboxSize: 100,
            //skyboxColor: Color3.FromHexString('#ffffff')
        });
        // const envTexture = new CubeTexture('../assets/models/skyboxTest/skybox.env', this)
        // this.createDefaultSkybox(envTexture, true, 1000)
        this.lights.forEach(function (light) {
            if (light.name == 'Viewport Light') {
                light.dispose();
            }
        });
        this.getMeshByName('BackgroundPlane').isPickable = false;
        console.log(game);
    };
    /**
     * Called on the scene starts.
     */
    ApplyEnvironment.prototype.onStart = function () {
        // ...
    };
    /**
     * Called each frame.
     */
    ApplyEnvironment.prototype.onUpdate = function () {
        var _this = this;
        // ...
        if (this.openAnimations.length) {
            if (!this.openAdded) {
                if (document.getElementById('openContainer')) {
                    document.getElementById('openContainer').style.display = 'block';
                    this.openAdded = true;
                }
            }
        }
        if (this.isAnimation) {
            if (!this.playAdded) {
                if (document.getElementById('playBtn')) {
                    document.getElementById('playContainer').style.display = 'block';
                    //if (document.getElementById('playBtn')) {
                    this.playBtn = document.getElementById('playBtn');
                    this.playText = document.getElementById('playPause');
                    this.playBtn.removeEventListener('click', function () { return _this.AddAnimation(_this.isLooping); });
                    this.playBtn.addEventListener('click', function () { return _this.AddAnimation(_this.isLooping); });
                    // }
                    this.playAdded = true;
                }
            }
        }
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    ApplyEnvironment.prototype.onStop = function () {
        // ...
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    ApplyEnvironment.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    ApplyEnvironment.prototype.playAnim = function (animGroup) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                animGroup.play();
                return [2 /*return*/, new Promise(function (resolve) {
                        animGroup.onAnimationEndObservable.addOnce(function () {
                            resolve();
                        });
                    })];
            });
        });
    };
    ApplyEnvironment.prototype.playAnims = function (anims) {
        return __awaiter(this, void 0, void 0, function () {
            var i, nextAnimGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this.currentAnim;
                        _a.label = 1;
                    case 1:
                        if (!(i < anims.length)) return [3 /*break*/, 4];
                        this.currentAnim = i;
                        nextAnimGroup = game['scene'].getAnimationGroupByName(anims[i]);
                        return [4 /*yield*/, this.playAnim(nextAnimGroup)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApplyEnvironment.prototype.AddAnimation = function (loop) {
        var _this = this;
        //this.isAdded = true;
        switch (this.playText.innerText) {
            case 'Reset':
                this.playBtnAnimations.forEach(function (animations) {
                    var resetAnim = game['scene'].getAnimationGroupByName(animations);
                    resetAnim.play();
                    resetAnim.goToFrame(0);
                    resetAnim.pause();
                    _this.currentAnim = 0;
                });
                this.playText.innerText = 'Pause';
            case 'Play':
                if (this.playBtnAnimations.length) {
                    this.playAnims(this.playBtnAnimations).then(function () {
                        _this.playText.innerText = 'Reset';
                    });
                }
                else {
                    game['scene'].animationGroups.forEach(function (animation) {
                        animation.play(loop);
                    });
                }
                this.playText.innerText = 'Pause';
                break;
            case 'Pause':
                game['scene'].animationGroups.forEach(function (animation) {
                    animation.pause();
                });
                this.playText.innerText = 'Play';
                break;
        }
    };
    __decorate([
        (0, decorators_1.visibleInInspector)('boolean', 'isAnimation', true)
    ], ApplyEnvironment.prototype, "isAnimation", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('boolean', 'isLooping', false)
    ], ApplyEnvironment.prototype, "isLooping", void 0);
    return ApplyEnvironment;
}(core_1.Scene));
exports.default = ApplyEnvironment;
//# sourceMappingURL=ApplyEnvironment%20-%20Copy.js.map