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
var LabelScript = /** @class */ (function (_super) {
    __extends(LabelScript, _super);
    //this.outline = new OutlineRenderer(this.scene);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function LabelScript() {
        var _this = this;
        /**
         * Called on the node has been fully initialized and is ready.
         */
        _this.actionManager = new core_1.ActionManager(game.scene);
        _this.isAdded = false;
        _this.canvasZone = document.body;
        _this.meshName = '';
        return _this;
    }
    LabelScript.prototype.onInitialized = function () {
        var _this = this;
        //Get target mesh to attach label objects to
        this.newName = this.name.replace(/_Target/g, '');
        //Attach label objects to mesh
        this._scene.meshes.forEach(function (target) {
            if (target.name == _this.newName) {
                _this.setParent(target);
            }
        });
        //Turn label mesh off
        this.visibility = 0;
        //Turn label mesh pickable off
        this.isPickable = false;
        //Add labels and leader lines to _scene
        this.AddLabel();
    };
    /**
     * Called each frame.
     */
    LabelScript.prototype.onUpdate = function () {
        if (!this.isAdded) {
            if (document.getElementById('labelToggle')) {
                this.isAdded = true;
                this.labelDiv = Array.from(document.querySelectorAll('.labelDiv'));
                this.labelToggel = document.getElementById('labelToggle');
                this.ToggleLabels();
                document.getElementById('labelToggle').addEventListener('click', this.ToggleLabels);
            }
        }
    };
    LabelScript.prototype.AddLabel = function () {
        var _this = this;
        this.meshName = this.name;
        var container = {
            pos: this.absolutePosition,
            elem: document.createElement('div')
        };
        var label = {
            elem: document.createElement('div')
        };
        var leader = {
            elem: document.createElement('div')
        };
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
        leader.elem.style.width = '2px';
        leader.elem.style.backgroundColor = '#828282';
        leader.elem.style.zIndex = '0';
        leader.elem.style.height = '2px';
        //Append container to document
        this.canvasZone.appendChild(container.elem);
        //Append label and leader to container
        document.getElementById(this.name + '_labelContainer').appendChild(label.elem);
        container.elem.style.width = "".concat(label.elem.offsetWidth + 5, "px");
        container.elem.style.height = "".concat(label.elem.offsetHeight, "px");
        document.getElementById(this.name + '_labelContainer').appendChild(leader.elem);
        var renderer = this._scene.enableDepthRenderer(this._scene.activeCamera, false);
        var depthMap = renderer.getDepthMap();
        var buffer = new Float32Array(4 * depthMap.getSize().width * depthMap.getSize().height);
        var labelHeight = document.getElementById(this.name + '_labelContainer').offsetHeight;
        var labelWidth = document.getElementById(this.name + '_labelContainer').offsetWidth;
        this._scene.onAfterRenderObservable.add(function () {
            var meshPos = _this.position.multiply(new core_1.Vector3(10, 10, 10));
            var labelIndex = Math.round(1000 / _this._scene.activeCamera.position.subtract(meshPos).length());
            depthMap.readPixels(0, 0, buffer);
            var posInViewProj = core_1.Vector3.TransformCoordinates(container.pos, _this._scene.getTransformMatrix());
            var screenCoords = posInViewProj.multiplyByFloats(0.5, -0.5, 1.0).add(new core_1.Vector3(0.5, 0.5, 0.0)).
                multiplyByFloats(_this._scene.getEngine().getRenderWidth(), _this._scene.getEngine().getRenderHeight(), 1);
            var px = screenCoords.x - labelWidth / 2;
            var py = screenCoords.y - labelHeight / 2;
            switch (_this.direction) {
                case 'up':
                    container.elem.style.left = (px + _this.canvasZone.offsetLeft) + 'px';
                    container.elem.style.top = ((py + _this.canvasZone.offsetTop) - _this.length) + 'px';
                    leader.elem.style.marginLeft = 'auto';
                    leader.elem.style.marginRight = 'auto';
                    leader.elem.style.height = (_this.length - ((container.elem.offsetHeight / 2) + 5)) + 'px';
                    leader.elem.style.top = ((leader.elem.offsetWidth / 2) + 5) + 'px';
                    break;
                case 'down':
                    container.elem.style.left = (px + _this.canvasZone.offsetLeft) + 'px';
                    container.elem.style.top = (py + _this.canvasZone.offsetTop) + _this.length + 'px';
                    leader.elem.style.marginLeft = 'auto';
                    leader.elem.style.marginRight = 'auto';
                    leader.elem.style.height = (_this.length - ((container.elem.offsetHeight / 2) + 5)) + 'px';
                    leader.elem.style.top = (((leader.elem.offsetHeight) + (container.elem.offsetHeight + 5)) * (-1)) + 'px';
                    break;
                case 'right':
                    container.elem.style.left = ((px + _this.canvasZone.offsetLeft) + ((container.elem.offsetWidth / 2) + _this.length)) + 'px';
                    container.elem.style.top = (py + _this.canvasZone.offsetTop) + 'px';
                    leader.elem.style.width = _this.length + 'px';
                    leader.elem.style.left = ((leader.elem.offsetWidth + 5) * (-1)) + 'px';
                    leader.elem.style.top = ((container.elem.offsetHeight / 2) * (-1)) + 'px';
                    break;
                case 'left':
                    container.elem.style.left = ((px + _this.canvasZone.offsetLeft) - ((container.elem.offsetWidth / 2) + _this.length)) + 'px';
                    container.elem.style.top = (py + _this.canvasZone.offsetTop) + 'px';
                    leader.elem.style.width = _this.length + 'px';
                    leader.elem.style.left = ((container.elem.offsetWidth)) + 'px';
                    leader.elem.style.top = ((container.elem.offsetHeight / 2) * (-1)) + 'px';
                    break;
            }
            px = Math.floor(px + labelWidth / 2);
            py = Math.floor(_this._scene.getEngine().getRenderHeight() - (py + labelHeight / 2));
            container.elem.style.zIndex = labelIndex.toString();
        });
    };
    LabelScript.prototype.ToggleLabels = function () {
        switch (this.labelToggel['checked']) {
            case true:
                this.labelDiv.forEach(function (div) { return div.style.display = 'block'; });
                break;
            case false:
                this.labelDiv.forEach(function (div) { return div.style.display = 'none'; });
                break;
        }
    };
    LabelScript.prototype.RemoveLabel = function () {
        this.canvasZone.removeChild(document.getElementById(this.name));
    };
    __decorate([
        (0, decorators_1.visibleInInspector)('string', 'labelText', 'Add Label Text')
    ], LabelScript.prototype, "labelText", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('number', 'length', 100)
    ], LabelScript.prototype, "length", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)('string', 'direction', 'up')
    ], LabelScript.prototype, "direction", void 0);
    return LabelScript;
}(core_1.Mesh));
exports.default = LabelScript;
//# sourceMappingURL=LabelScriptBrittany.js.map