import React from "react";
import ToolBar from "./Toolbar";

const Panel = () => {
    const [mode, setMode] = React.useState(FinderMode);

    return (
        <React.Fragment>
            <ToolBar />
            {mode === FinderMode && <Finder />}
            {mode === FolderEditorMode && <FolderEditorMode />}
            {mode === ProductEditorMode && <ProductEditorMode />}
        </React.Fragment>
    );
};

const FinderMode = 0;
const FolderEditorMode = 1;
const ProductEditorMode = 2;

export default Panel;
