import React from "react";
import "../App.css";
import { Table, Divider, message, Popconfirm } from "antd";

import { ColumnProps } from "antd/es/table";
import { Link } from "react-router-dom";

type User = {
	UserID: number;
	Name: string;
	Age: number;
	City: string;
};

type UserListState = {
	dataSource: User[];
};

export class UserList extends React.Component<{}, UserListState> {
	constructor(p: {}) {
		super(p);
		this.state = {
			dataSource: []
		};
	}
	tableColumns: ColumnProps<User>[] = [
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
						<button>
							<Link to={`/users/${record.UserID}`}>Edit</Link>
						</button>
						<Divider type="vertical" />
						<Popconfirm
							title="Are you sure delete this task?"
							onConfirm={e => this.handleDelete(record.UserID)}
							okText="Yes"
							cancelText="No"
						>
							<button>
								<a href="#">Delete</a>
							</button>
						</Popconfirm>
					</span>
				);
			}
		}
	];
	handleDelete(UserID: number) {
		fetch("http://localhost:8000/user/" + UserID, {
			method: "DELETE", // 'POST' or 'PUT'
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(() => {
				message.success("Successfully deleted " + UserID + ".");
				const dataSource = [...this.state.dataSource];
				this.setState({
					dataSource: dataSource.filter(
						item => item.UserID !== UserID
					)
				});
			})
			.catch(error => {
				message.error("Error occured: " + error);
			});
	}

	render() {
		return (
			<Table
				columns={this.tableColumns}
				dataSource={this.state.dataSource}
				rowKey="UserID"
			/>
		);
	}

	componentDidMount() {
		fetch("http://localhost:8000/users")
			.then(response => {
				return response.json();
			})
			.then((myJson: User[]) => {
				this.setState({
					dataSource: myJson
				});
			});
	}
}

export default UserList;
