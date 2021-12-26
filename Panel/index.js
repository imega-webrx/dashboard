import React from "react";
import ToolBar from "./Toolbar";

import { FinderMode, FolderEditorMode, ProductEditorMode } from "./Modes";

const Panel = (props) => {
    const [mode, setMode] = React.useState(FinderMode);

    return (
        <React.Fragment>
            <ToolBar currentMode={mode} onMode={setMode} />
            {mode === FinderMode && <Finder />}
            {mode === FolderEditorMode && <FolderEditorMode />}
            {mode === ProductEditorMode && <ProductEditorMode />}
        </React.Fragment>
    );
};

export default Panel;
