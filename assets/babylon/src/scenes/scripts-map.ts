import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/scripts/ApplyEnvironment.ts": ScriptMap;
	"src/scenes/scripts/CamUpdates.ts": ScriptMap;
	"src/scenes/scripts/gameIndex.ts": ScriptMap;
	"src/scenes/scripts/LabelScriptBrittany.ts": ScriptMap;
	"src/scenes/scripts/NewApplyEnvironment .ts": ScriptMap;
	"src/scenes/scripts/OutlineScript.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scripts/ApplyEnvironment.ts": require("./scripts/ApplyEnvironment"),
	"src/scenes/scripts/CamUpdates.ts": require("./scripts/CamUpdates"),
	"src/scenes/scripts/gameIndex.ts": require("./scripts/gameIndex"),
	"src/scenes/scripts/LabelScriptBrittany.ts": require("./scripts/LabelScriptBrittany"),
	"src/scenes/scripts/NewApplyEnvironment .ts": require("./scripts/NewApplyEnvironment "),
	"src/scenes/scripts/OutlineScript.ts": require("./scripts/OutlineScript"),
}
