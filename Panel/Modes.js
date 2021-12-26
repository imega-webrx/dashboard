import React from "react";

const ModeContext = React.createContext();

const FinderMode = 0;
const FolderEditorMode = 1;
const ProductEditorMode = 2;

export default ModeContext;

export { FinderMode, FolderEditorMode, ProductEditorMode };
