import React from "react";

const AppState = React.createContext({});

const InitApp = (storage) => {
    console.log("InitApp::::::::", storage);

    const state = {
        panel: {
            // left: {
            //     currentFolder: {
            //         id: "ed4bf8f5-8b4e-435b-83cc-27feada6136a",
            //         isRoot: true,
            //     },
            // },
            // right: {
            //     currentFolder: {
            //         id: "ed4bf8f5-8b4e-435b-83cc-27feada6136a",
            //         isRoot: true,
            //     },
            // },
        },
        // ...globalProps,
        // saveFolder: storage.saveFolder,
    };

    return {
        registerRouter: (router) => (state.router = router),
        registerPanel: (props, index) => {
            // console.log("================ registerPanel", props);
            const f = state.panel;
            if (f.hasOwnProperty(index) === false) {
                f[index] = {};
            }

            if (f[index].hasOwnProperty("folderIsEdit") === false) {
                f[index].folderIsEdit = {};
            }

            // console.log("================ registerPanel", index, props);
            return {
                ...state,
                rootFolder: () => {
                    props.rootFolder();

                    const { [index]: _, ...res } = state.router.query;
                    state.router.push(
                        {
                            pathname: state.router.pathname,
                            query: res,
                        },
                        undefined,
                        { shallow: true }
                    );
                },
                isLoading: () => props.loading,
                content: () => props.catalog,
                getCurrentFolder: () => {
                    return state.panel[index].currentFolder;
                },
                getEditFolder() {
                    console.log("getEditFolder", state, this);
                    return state.panel[index].folderIsEdit;
                },
                editFolder: () => {
                    console.log("EDIT FOLDER", state);

                    const f = state.panel[index].currentFolder;
                    if (f.hasOwnProperty("isRoot") && f.isRoot === true) {
                        return false;
                    }

                    state.panel[index].folderIsEdit =
                        state.panel[index].currentFolder;

                    return true;
                },
                newFolder: () => {
                    const f = state.panel;
                    if (f.hasOwnProperty(index) === false) {
                        f[index] = {};
                    }

                    if (f[index].hasOwnProperty("folderIsEdit") === false) {
                        f[index].folderIsEdit = {};
                    }

                    state.panel[index].folderIsEdit = {};
                },
                openFolder: (folder) => {
                    props.openFolder(folder.id).then(() => {
                        state.panel[index] = {
                            currentFolder: folder,
                        };
                        state.router.push(
                            {
                                pathname: state.router.pathname,
                                query: {
                                    ...state.router.query,
                                    [index]: folder.id,
                                },
                            },
                            undefined,
                            { shallow: true }
                        );
                    });
                    console.log("OPEN FOLDER", state);
                },
                saveFolder(folder) {
                    console.log("SAVE FOLDER1", this, state);
                    storage.saveFolder(folder).then((data) => {
                        const input = {
                            subject: this.getCurrentFolder().id,
                            object: data.input.id,
                            priority: 1,
                        };
                        console.log(
                            "+++++++++moveToFolder ",
                            data,
                            folder,
                            input
                        );
                        storage.moveToFolder(input).then(() => {
                            props.refetch();
                        });

                        console.log("SAVE FOLDER", data, this);
                    });
                },
            };
        },
    };
};

export { InitApp };

export default AppState;
