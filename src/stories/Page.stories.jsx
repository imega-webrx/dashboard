import React from "react";
import App from "../App";

export default {
    component: App,
    title: "Pages",
};

const Template = () => <App />;

const MainStory = Template.bind({});

MainStory.args = {};

MainStory.story = {
    name: "App",
};

export { MainStory };
