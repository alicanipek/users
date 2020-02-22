import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";

const { Sider } = Layout;

class MySider extends React.Component {
	handleClick = (e: any) => {
		console.log("click ", e);
	};

	render() {
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
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
					<Menu.Item key="1">
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/adduser">Add User</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/users">Users</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}

export default MySider;
