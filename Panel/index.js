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

const Panel = (props) => {
    const [mode, setMode] = React.useState(FinderMode);

    const modeCtx = {
        currentMode: mode,
        onMode: setMode,
    };

    return (
        <ModeContext.Provider value={modeCtx}>
            <ToolBar currentMode={mode} onMode={setMode} />
            {mode === FinderMode && <Finder {...props} />}
            {mode === FolderEditorMode && <FolderEditor />}
            {mode === ProductEditorMode && <ProductEditor />}
        </ModeContext.Provider>
    );
};

export default Panel;
