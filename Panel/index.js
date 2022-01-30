import React from "react";
import ToolBar from "./Toolbar";

import ModeContext, {
    FinderMode,
    FolderEditorMode,
    ProductEditorMode,
} from "./Modes";
import Finder from "./Finder";
import FolderEditor from "./FolderEditor";
import ProductEditor from "./ProductEditor";
import PanelCtx from "./Context";

const Panel = (props) => {
    console.log("===PANEL", props);
    const [mode, setMode] = React.useState(FinderMode);

    const modeCtx = {
        currentMode: mode,
        onMode: setMode,
    };

    return (
        <PanelCtx.Provider value={props}>
            <ModeContext.Provider value={modeCtx}>
                <ToolBar currentMode={mode} onMode={setMode} />
                {mode === FinderMode && <Finder />}
                {mode === FolderEditorMode && <FolderEditor />}
                {mode === ProductEditorMode && <ProductEditor />}
            </ModeContext.Provider>
        </PanelCtx.Provider>
    );
};

export default Panel;
