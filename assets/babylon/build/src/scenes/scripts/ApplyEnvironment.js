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
        _this.playBtnAnimations = [];
        _this.openBtnAnimations = ['LandingAni'];
        _this.expandSliderAnimations = [];
        _this.fadeSliderObj = {
            Group_1: ['DRON DL-3.007_primitive0', 'DRON DL-3.007_primitive1', 'DRON DL-3.007_primitive2', 'DRON DL-3.007_primitive3', 'DRON DL-3.007_primitive4', 'DRON DL-3.008', 'DRON DL-3.009', 'DRON DL-3.010', 'DRON DL-3', 'DRON DL-3.016', 'DRON DL-3.014', 'DRON DL-3.011', 'DRON DL-3.017', 'DRON DL-3.015', 'DRON DL-3.013', 'DRON DL-3.012']
        };
        _this.playAdded = false;
        _this.openAdded = false;
        _this.isPlaying = false;
        _this.isOpening = false;
        _this.isRotating = false;
        _this.sliderAdded = false;
        _this.fadeAdded = false;
        _this.openPos = 0;
        _this.playPos = 0;
        _this.speed = 1;
        _this.closeAnimations = _this.openBtnAnimations.toReversed();
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    ApplyEnvironment.prototype.onInitialize = function () {
        // ...
    };
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
        });
        this.lights.forEach(function (light) {
            if (light.name == 'Viewport Light') {
                light.dispose();
            }
        });
        this.getMeshByName('BackgroundPlane').isPickable = false;
        this.newCamPos = this.activeCamera.position.multiply(new core_1.Vector3(100, 100, 100));
        this.oldCamPos = this.newCamPos;
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
        // ...
        var _this = this;
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
        this.newCamPos = this.activeCamera.position.multiply(new core_1.Vector3(100, 100, 100));
        if (this.newCamPos.x != this.oldCamPos.x) {
            this.oldCamPos = this.newCamPos;
            this.isRotating = true;
        }
        else {
            this.isRotating = false;
        }
        if (this.isRotating) {
            this.animationGroups.forEach(function (animation) {
                animation.pause();
            });
        }
        if (!this.isRotating) {
            setTimeout(function () {
                if (_this.isPlaying) {
                    _this.currentAnim = _this.playPos;
                    _this.speed = 1;
                    _this.PlayAnims(_this.playBtnAnimations).then(function () {
                        _this.playText.innerText = 'Reset';
                        _this.isPlaying = false;
                    });
                }
                if (_this.isOpening) {
                    if (_this.openText.innerText == 'Land') {
                        _this.currentAnim = _this.openPos;
                        _this.PlayAnims(_this.openBtnAnimations).then(function () {
                            var _a;
                            (_a = _this.playBtn) === null || _a === void 0 ? void 0 : _a.style.pointerEvents = 'all';
                            _this.openBtn.style.pointerEvents = 'all';
                            _this.isOpening = false;
                            _this.openPos = 0;
                        });
                    }
                    if (_this.openText.innerText == 'Hover') {
                        _this.currentAnim = _this.openPos;
                        _this.speed = -1;
                        _this.PlayAnims(_this.closeAnimations).then(function () {
                            var _a;
                            (_a = _this.playBtn) === null || _a === void 0 ? void 0 : _a.style.pointerEvents = 'all';
                            _this.openBtn.style.pointerEvents = 'all';
                            _this.isOpening = false;
                            _this.openPos = 0;
                            _this.speed = 1;
                        });
                    }
                }
            }, 100);
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
    ApplyEnvironment.prototype.CreateFadeSlider = function () {
        var _this = this;
        var sliderLabel = {
            elem: document.createElement('label')
        };
        var fadeSliderEl = {
            elem: document.createElement('input')
        };
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
        this.fadeSlider.addEventListener('input', function () { return _this.AddFadeSliderAction(); });
    };
    ApplyEnvironment.prototype.CreatePlayBtn = function () {
        var _this = this;
        var playBtn = {
            elem: document.createElement('button')
        };
        var playLabel = {
            elem: document.createElement('label')
        };
        playBtn.elem.id = 'playBtn';
        playBtn.elem.className = 'button';
        playLabel.elem.id = 'playPause';
        playLabel.elem.innerText = 'Play';
        document.getElementById('playContainer').appendChild(playBtn.elem);
        document.getElementById('playBtn').appendChild(playLabel.elem);
        this.playBtn = document.getElementById('playBtn');
        this.playText = document.getElementById('playPause');
        this.playBtn.addEventListener('click', function () { return _this.AddPlayAnimation(_this.isLooping); });
    };
    ApplyEnvironment.prototype.CreateOpenBtn = function () {
        var _this = this;
        var openBtn = {
            elem: document.createElement('button')
        };
        var openLabel = {
            elem: document.createElement('label')
        };
        openBtn.elem.id = 'openBtn';
        openBtn.elem.className = 'button';
        openLabel.elem.id = 'openClose';
        openLabel.elem.innerText = 'Hover';
        document.getElementById('openContainer').appendChild(openBtn.elem);
        document.getElementById('openBtn').appendChild(openLabel.elem);
        this.openBtn = document.getElementById('openBtn');
        this.openText = document.getElementById('openClose');
        this.openBtn.addEventListener('click', function () { return _this.AddOpenAnimation(); });
    };
    ApplyEnvironment.prototype.SetFadeMaterial = function () {
        var _this = this;
        for (var mesh in this.fadeSliderObj) {
            this.fadeSliderObj[mesh].forEach(function (mat) {
                _this.getMeshByName(mat).material.needDepthPrePass = true;
            });
        }
    };
    ApplyEnvironment.prototype.AddFadeSliderAction = function () {
        var _this = this;
        Object.keys(this.fadeSliderObj).forEach(function (key) {
            _this.fadeSliderObj[key].forEach(function (mesh) {
                _this.getMeshByName(mesh).visibility = _this.fadeSlider['value'];
            });
        });
    };
    ApplyEnvironment.prototype.PlayAnim = function (animGroup) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                animGroup.speedRatio = this.speed;
                animGroup.play();
                return [2 /*return*/, new Promise(function (resolve) {
                        animGroup.onAnimationEndObservable.addOnce(function () {
                            resolve();
                        });
                    })];
            });
        });
    };
    ApplyEnvironment.prototype.PlayAnims = function (anims) {
        return __awaiter(this, void 0, void 0, function () {
            var i, nextAnimGroup, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this.currentAnim;
                        _a.label = 1;
                    case 1:
                        if (!(i < anims.length)) return [3 /*break*/, 6];
                        this.currentAnim = i;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        nextAnimGroup = this.getAnimationGroupByName(anims[i]);
                        if (this.playBtnAnimations.includes(nextAnimGroup.name)) {
                            this.speed = 1;
                            this.playPos = this.currentAnim;
                        }
                        if (this.openBtnAnimations.includes(nextAnimGroup.name)) {
                            this.openPos = this.currentAnim;
                        }
                        return [4 /*yield*/, this.PlayAnim(nextAnimGroup)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ApplyEnvironment.prototype.AddOpenAnimation = function () {
        var _this = this;
        var _a, _b;
        switch (this.openText.innerText) {
            case 'Hover':
                this.currentAnim = this.openPos;
                this.isOpening = true;
                this.PlayAnims(this.openBtnAnimations).then(function () {
                    var _a;
                    (_a = _this.playBtn) === null || _a === void 0 ? void 0 : _a.style.pointerEvents = 'all';
                    _this.openBtn.style.pointerEvents = 'all';
                    _this.isOpening = false;
                    _this.openPos = 0;
                });
                this.openText.innerText = 'Land';
                (_a = this.playBtn) === null || _a === void 0 ? void 0 : _a.style.pointerEvents = 'none';
                this.openBtn.style.pointerEvents = 'none';
                break;
            case 'Land':
                this.currentAnim = this.openPos;
                this.isOpening = true;
                this.speed = -1;
                this.PlayAnims(this.closeAnimations).then(function () {
                    var _a;
                    (_a = _this.playBtn) === null || _a === void 0 ? void 0 : _a.style.pointerEvents = 'all';
                    _this.openBtn.style.pointerEvents = 'all';
                    _this.isOpening = false;
                    _this.openPos = 0;
                    _this.speed = 1;
                });
                this.openText.innerText = 'Hover';
                (_b = this.playBtn) === null || _b === void 0 ? void 0 : _b.style.pointerEvents = 'none';
                this.openBtn.style.pointerEvents = 'none';
                break;
        }
    };
    ApplyEnvironment.prototype.AddPlayAnimation = function (loop) {
        var _this = this;
        console.log(game['scene']);
        switch (this.playText.innerText) {
            case 'Reset':
                this.playBtnAnimations.forEach(function (animations) {
                    var resetAnim = _this.getAnimationGroupByName(animations);
                    resetAnim.play();
                    resetAnim.goToFrame(0);
                    resetAnim.pause();
                    _this.playPos = 0;
                });
            case 'Play':
                if (this.playBtnAnimations.length) {
                    this.currentAnim = this.playPos;
                    this.PlayAnims(this.playBtnAnimations).then(function () {
                        _this.playText.innerText = 'Reset';
                        _this.isPlaying = false;
                    });
                }
                else {
                    this.animationGroups.forEach(function (animation) {
                        animation.play(loop);
                    });
                }
                this.isPlaying = true;
                this.playText.innerText = 'Pause';
                break;
            case 'Pause':
                this.animationGroups.forEach(function (animation) {
                    animation.pause();
                });
                this.isPlaying = false;
                this.playText.innerText = 'Play';
                break;
        }
    };
    __decorate([
        (0, decorators_1.visibleInInspector)('boolean', 'isAnimation', false)
    ], ApplyEnvironment.prototype, "isAnimation", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('boolean', 'isOpen', false)
    ], ApplyEnvironment.prototype, "isOpen", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('boolean', 'isLooping', false)
    ], ApplyEnvironment.prototype, "isLooping", void 0);
    return ApplyEnvironment;
}(core_1.Scene));
exports.default = ApplyEnvironment;
//# sourceMappingURL=ApplyEnvironment.js.map