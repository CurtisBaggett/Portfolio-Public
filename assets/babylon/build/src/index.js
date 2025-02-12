"use strict";
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
exports.Game = void 0;
var core_1 = require("@babylonjs/core");
require("@babylonjs/materials");
var CANNON = require("cannon");
var tools_1 = require("./scenes/tools");
var Game = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Game() {
        var _this = this;
        /**
         * Defines the scene used to store and draw elements in the canvas.
         */
        this.scene = null;
        core_1.BabylonFileLoaderConfiguration.LoaderInjectedPhysicsEngine = CANNON;
        this.engine = new core_1.Engine(document.getElementById("renderCanvas"), true);
        this._bindEvents();
        this.loadScene('scene');
        // Render.
        this.engine.runRenderLoop(function () { var _a; return (_a = _this.scene) === null || _a === void 0 ? void 0 : _a.render(); });
    }
    Game.prototype.disposeScene = function () {
        if (this.scene == null) {
            return;
        }
        this.scene.dispose();
        this.scene = null;
    };
    /**
     * Loads the first scene.
     */
    Game.prototype.loadScene = function (sceneName) {
        return __awaiter(this, void 0, void 0, function () {
            var scene, rootUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disposeScene();
                        scene = new core_1.Scene(this.engine);
                        rootUrl = "./scenes/_assets/";
                        return [4 /*yield*/, (0, tools_1.appendScene)(scene, rootUrl, "../" + sceneName + "/scene.babylon")];
                    case 1:
                        _a.sent();
                        // Attach camera.
                        if (!scene.activeCamera) {
                            throw new Error("No camera defined in the scene. Please add at least one camera in the project or create one yourself in the code.");
                        }
                        scene.activeCamera.attachControl(this.engine.getRenderingCanvas(), false);
                        this.scene = scene;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Binds the required events for a full experience.
     */
    Game.prototype._bindEvents = function () {
        var _this = this;
        window.addEventListener("resize", function () { return _this.engine.resize(); });
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=index.js.map