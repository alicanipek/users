import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import MySider from "./Components/Menu";
import Home from "./Components/Home";
import AddUser from "./Components/AddUser";
import UpdateUser from "./Components/UpdateUser";
import Users from "./Components/Users";
const { Content } = Layout;
const App = () => {
	return (
		<div className="App">
			<div>
				<Router>
					<Layout>
						<Layout>
							<MySider />
							<Layout style={{ marginLeft: 200 }}>
								<Content
									style={{
										margin: "24px 16px 0",
										overflow: "initial",
										minHeight: 280
									}}
								>
									<div
										style={{
											padding: 24,
											background: "#fff",
											textAlign: "center"
										}}
									>
										<Switch>
											<Route
												exact
												path="/users/:userid"
												component={UpdateUser}
											></Route>
											<Route path="/adduser">
												<AddUser />
											</Route>
											<Route path="/users">
												<Users />
											</Route>
											<Route path="/">
												<Home />
											</Route>
										</Switch>
									</div>
								</Content>
							</Layout>
						</Layout>
					</Layout>
				</Router>
			</div>
		</div>
	);
};

export default App;
