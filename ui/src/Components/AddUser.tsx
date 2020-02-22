import React from "react";
import "../App.css";
import { WrappedUserForm } from "./UserForm";

export default function AddUser() {
	return (
		<div>
			<WrappedUserForm isUpdate={false} model={-1} />
		</div>
	);
}
