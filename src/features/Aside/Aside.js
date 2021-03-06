import React from "react";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

const Aside = () => {
    const location = useLocation();

    return (
        <Sider className="site-layout-background" width={200}>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                // defaultSelectedKeys={["/products"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                    <Menu.Item key="/products">
                        <Link to="/products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="/product/add">
                        <Link to="/product/add">Add product</Link>
                    </Menu.Item>
                    <Menu.Item key="3">option3</Menu.Item>
                    <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                    <Menu.Item key="5">option5</Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    icon={<NotificationOutlined />}
                    title="subnav 3"
                >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                    <Menu.Item key="11">option11</Menu.Item>
                    <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default Aside;
