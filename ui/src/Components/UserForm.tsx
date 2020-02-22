import React from "react";
import "../App.css";
import { Form, Icon, Input, Button, message } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";

interface UserProps extends FormComponentProps {
	model: number;
	isUpdate: boolean;
}
interface InsertState {
	UserID: number;
	Name: string;
	Age: number | undefined;
	City: string;
}

type InsertStateKeys = keyof InsertState;
class UserForm extends React.Component<UserProps, InsertState> {
	constructor(props: UserProps) {
		super(props);

		this.state = {
			UserID: 0,
			Name: "",
			Age: undefined,
			City: ""
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.isUpdate) {
			fetch("http://localhost:8000/user/" + this.props.model)
				.then(response => {
					return response.json();
				})
				.then((myJson: InsertState) => {
					this.setState({
						UserID: myJson.UserID,
						Name: myJson.Name,
						Age: myJson.Age,
						City: myJson.City
					});
					this.props.form.setFieldsValue({
						Name: myJson.Name,
						Age: myJson.Age,
						City: myJson.City
					});
				});
		}
	}
	handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const key = event.currentTarget.name as keyof InsertState;
		const targetValue = event.currentTarget.value;
		let value: string | number = targetValue;
		if (key === "Age") {
			value = Number(targetValue);
		}
		this.setState<never>({
			[key]: value
		});
	}

	handleSubmit(event: React.FormEvent<EventTarget>) {
		event.preventDefault();
		let url = this.props.isUpdate
			? "http://localhost:8000/user/" + this.state.UserID
			: "http://localhost:8000/users";
		let method = this.props.isUpdate ? "PUT" : "POST";

		fetch(url, {
			method: method, // 'POST' or 'PUT'
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(this.state)
		})
			.then(response => {
				let t = response.json();
				return t;
			})
			.then(data => {
				if (!this.props.isUpdate) {
					this.success("Successfully added.");
					this.props.form.resetFields();
					this.setState({});
				} else {
					this.success("Succesfully updated: " + data.Name);
				}
			})
			.catch(error => {
				this.fail(error);
			});
	}

	success = (text: string) => {
		message.success(text);
	};

	fail = (text: string) => {
		message.error(text);
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 8 }
		};
		const buttonStyle = {
			width: "100%"
		};
		return (
			<Form
				{...formItemLayout}
				onSubmit={this.handleSubmit}
				className="login-form"
			>
				<Form.Item>
					{getFieldDecorator("Name", {
						rules: [
							{
								required: true,
								message: "Please input your name!"
							}
						]
					})(
						<Input
							prefix={
								<Icon
									type="user"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							placeholder="Name"
							name="Name"
							onChange={this.handleInputChange}
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("City")(
						<Input
							prefix={
								<Icon
									type="lock"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
							placeholder="City"
							name="City"
							onChange={this.handleInputChange}
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("Age")(
						<Input
							prefix={
								<Icon
									type="lock"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="number"
							placeholder="Age"
							name="Age"
							onChange={this.handleInputChange}
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={buttonStyle}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

export const WrappedUserForm = Form.create<UserProps>({
	name: "user"
})(UserForm);
