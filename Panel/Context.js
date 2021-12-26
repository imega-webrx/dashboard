import React from "react";

const PanelContext = React.createContext(defaultContext);

const defaultContext = {
    currentFolder: "",
    linkToFolder: "",
};

export default PanelContext;
