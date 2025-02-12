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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
require("@babylonjs/core/Shaders/outline.fragment");
require("@babylonjs/core/Shaders/outline.vertex");
var decorators_1 = require("../decorators");
//  The functions "onStart" and "onUpdate" are called automatically.
var OutlineScript = /** @class */ (function (_super) {
    __extends(OutlineScript, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function OutlineScript() {
        var _this = this;
        _this.highlight = new core_1.HighlightLayer("Highlight", _this._scene, {
            isStroke: true,
            mainTextureRatio: 2,
            blurHorizontalSize: 1
        });
        _this.actionManager = new core_1.ActionManager(game.scene);
        _this.isAdded = false;
        _this.isReadyToLoad = false;
        _this.pointerDown = false;
        return _this;
    }
    /**
     * Called on the node has been fully initialized and is ready.
     */
    OutlineScript.prototype.onInitialized = function () {
        //If highlights are set to be not visible, highlight methods get added to action manager so when mesh or labels are rolled over highlights become visible
        if (!this['highlightVisible']) {
            this.actionManager.registerAction(new core_1.ExecuteCodeAction(core_1.ActionManager.OnPointerOverTrigger, this.AddHighlight));
            this.actionManager.registerAction(new core_1.ExecuteCodeAction(core_1.ActionManager.OnPointerOutTrigger, this.RemoveHighlight));
        }
        else {
            this.AppendHighlight();
        }
        // if (this['sceneName']) {
        //     this.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnCenterPickTrigger, this.LoadScene))
        // }
        this.actionManager.registerAction(new core_1.ExecuteCodeAction(core_1.ActionManager.OnDoublePickTrigger, this.FocusMesh));
    };
    /**
     * Called each frame.
     */
    OutlineScript.prototype.onUpdate = function () {
        //Finds all div's that are associated with this meshes highlight and adds the label rollover method
        if (document.getElementById(this.name + '_Target_labelContainer') && !this.isAdded && !this.highlightVisible) {
            this.labelContainer = document.getElementById(this.name + '_Target_labelContainer');
            this.AddLabelRollover();
        }
        if (!this.isReadyToLoad) {
            this.isReadyToLoad = true;
            this.labelDiv = Array.from(document.querySelectorAll('.labelDiv'));
            if (this['sceneName']) {
                this.actionManager.registerAction(new core_1.ExecuteCodeAction(core_1.ActionManager.OnCenterPickTrigger, this.LoadScene));
            }
        }
    };
    OutlineScript.prototype.AppendHighlight = function () {
        var _this = this;
        if (this.highlighthName != '') {
            var meshesToHighlight_1 = [];
            game.scene.getActiveMeshes().forEach(function (mesh) {
                if (mesh['highlighthName'] == _this.highlighthName) {
                    if (!meshesToHighlight_1.includes(mesh)) {
                        meshesToHighlight_1.push(mesh);
                    }
                }
                meshesToHighlight_1.forEach(function (hl) {
                    _this.highlight.addMesh(hl, core_1.Color3.FromHexString(_this.highlighthColor));
                });
            });
        }
        else {
            this.highlight.addMesh(this, core_1.Color3.FromHexString(this.highlighthColor));
        }
    };
    OutlineScript.prototype.AddLabelRollover = function () {
        var _this = this;
        this.isAdded = true;
        this.labelContainer.addEventListener('mouseover', function () {
            _this.AppendHighlight();
        });
        this.labelContainer.addEventListener('mouseout', function () {
            _this.RemoveHighlight();
        });
    };
    OutlineScript.prototype.AddHighlight = function () {
        var _this = this;
        game.scene.onPointerObservable.add(function (evt) {
            switch (evt.type) {
                case core_1.PointerEventTypes.POINTERDOWN:
                    _this.pointerDown = true;
                    break;
                case core_1.PointerEventTypes.POINTERUP:
                    _this.pointerDown = false;
                    break;
            }
        });
        game.scene.onAfterRenderObservable.add(function () {
            var _a;
            if (!_this.pointerDown) {
                var ray = game.scene.createPickingRay(game.scene.pointerX, game.scene.pointerY, core_1.Matrix.Identity(), game.scene.activeCamera);
                var raycastHit = game.scene.pickWithRay(ray);
                if (((_a = raycastHit.pickedMesh) === null || _a === void 0 ? void 0 : _a.name) != _this.name) {
                    return;
                }
                _this.AppendHighlight();
            }
        });
    };
    OutlineScript.prototype.RemoveHighlight = function () {
        var _this = this;
        if (this.highlighthName != '') {
            var meshesToRemoveHighlight_1 = [];
            game.scene.getActiveMeshes().forEach(function (mesh) {
                if (mesh['highlighthName'] == _this.highlighthName) {
                    if (!meshesToRemoveHighlight_1.includes(mesh)) {
                        meshesToRemoveHighlight_1.push(mesh);
                    }
                }
                meshesToRemoveHighlight_1.forEach(function (hl) {
                    _this.highlight.removeMesh(hl);
                });
            });
        }
        else {
            this.highlight.removeMesh(this);
        }
    };
    OutlineScript.prototype.FocusMesh = function () {
        game.scene.activeCamera['target'] = this.position;
    };
    OutlineScript.prototype.LoadScene = function () {
        console.log('load anim', game.scene['currentAnim']);
        this.labelDiv.forEach(function (div) { return div.remove(); });
        if (document.getElementById('playBtn')) {
            document.getElementById('playBtn').remove();
        }
        if (document.getElementById('openBtn')) {
            document.getElementById('openBtn').remove();
        }
        game.scene.dispose();
        game.loadScene(this['sceneName']);
    };
    __decorate([
        (0, decorators_1.visibleInInspector)('string', 'highlighthName', '')
    ], OutlineScript.prototype, "highlighthName", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('string', 'highlighthColor', '#00FFFF')
    ], OutlineScript.prototype, "highlighthColor", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('boolean', 'highlightVisible', false)
    ], OutlineScript.prototype, "highlightVisible", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('string', 'sceneName', '')
    ], OutlineScript.prototype, "sceneName", void 0);
    return OutlineScript;
}(core_1.Mesh));
exports.default = OutlineScript;
//# sourceMappingURL=OutlineScript.js.map