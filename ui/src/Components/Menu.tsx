import React from "react";
import "../App.css";
import { Link, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";

const { Sider } = Layout;

const MySider = withRouter(({ history }) => {
	return (
		<Sider
			style={{
				overflow: "auto",
				height: "100vh",
				position: "fixed",
				left: 0
			}}
		>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={["/"]}
				selectedKeys={[history.location.pathname]}
			>
				<Menu.Item key="/">
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="/adduser">
					<Link to="/adduser">Add User</Link>
				</Menu.Item>
				<Menu.Item key="/users">
					<Link to="/users">Users</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
});

export default MySider;
