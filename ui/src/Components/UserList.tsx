import React from "react";
import "../App.css";
import { Table, Divider } from "antd";

import { ColumnProps } from "antd/es/table";
import { Link } from "react-router-dom";

type User = {
	userId: number;
	name: string;
	age: number;
	city: string;
};

type UserListState = {
	dataSource: User[];
};

const tableColumns: ColumnProps<User>[] = [
	{
		title: "ID",
		dataIndex: "UserID",
		key: "userid"
	},
	{
		title: "Name",
		dataIndex: "Name",
		key: "name"
	},
	{
		title: "Age",
		dataIndex: "Age",
		key: "age"
	},
	{
		title: "City",
		dataIndex: "City",
		key: "city"
	},
	{
		title: "Action",
		key: "action",
		render: record => {
			return (
				<span>
					<Link to={`/users/${record.UserID}`}>Edit</Link>
					<Divider type="vertical" />
				</span>
			);
		}
	}
];
export class UserList extends React.Component<{}, UserListState> {
	constructor(p: {}) {
		super(p);
		this.state = {
			dataSource: []
		};
	}

	render() {
		return (
			<Table
				columns={tableColumns}
				dataSource={this.state.dataSource}
				rowKey="UserID"
			/>
		);
	}

	componentDidMount() {
		fetch("http://localhost:8000/users")
			.then(response => {
				console.log(response.status);
				return response.json();
			})
			.then((myJson: User[]) => {
				console.log(myJson);
				this.setState({
					dataSource: myJson
				});
			});
	}
}

export default UserList;
