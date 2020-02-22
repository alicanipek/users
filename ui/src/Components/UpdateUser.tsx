import React, { Component } from "react";
import "../App.css";
import { WrappedUserForm } from "./UserForm";
import { RouteComponentProps } from "react-router-dom";

interface UserId {
	userid: string;
}
interface RouteProp extends RouteComponentProps<UserId> {}
export default class UpdateUser extends Component<RouteProp> {
	render() {
		return (
			<div>
				Update
				<WrappedUserForm
					isUpdate={true}
					model={Number(this.props.match.params.userid)}
				/>
			</div>
		);
	}
}
