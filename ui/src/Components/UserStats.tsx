import React from "react";
import "../App.css";

type User = {
	UserID: number;
	Name: string;
	Age: number;
	City: string;
};

interface Dictionary<T> {
	[key: string]: T;
}

type UserStatsState = {
	error: string;
	isLoaded: boolean;
	UserList: User[];
	Cities: Dictionary<number>;
};

export default class UserStats extends React.Component<{}, UserStatsState> {
	constructor(prop: {}) {
		super(prop);
		this.state = {
			error: "",
			isLoaded: false,
			UserList: [],
			Cities: {}
		};
	}
	CountOfCities(UserList: User[]): Dictionary<number> {
		let cities: Dictionary<number> = {};
		UserList.forEach(user => {
			if (cities[user.City]) {
				cities[user.City] += 1;
			} else {
				cities[user.City] = 1;
			}
		});
		return cities;
	}
	componentDidMount() {
		fetch("http://localhost:8000/users")
			.then(response => {
				return response.json();
			})
			.then(
				(myJson: User[]) => {
					this.setState({
						isLoaded: true,
						UserList: myJson
					});
					this.setState({
						Cities: this.CountOfCities(this.state.UserList)
					});
				},
				error => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	render() {
		const { error, isLoaded, Cities } = this.state;
		if (error) {
			return <div>Error: {error}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			let cities = [];
			for (const city in Cities) {
				cities.push(
					<li key={city} style={{ textAlign: "left" }}>
						{city} | {Cities[city]}
					</li>
				);
			}
			return (
				<div>
					User Stats
					<ul>{cities.map(city => city)}</ul>
				</div>
			);
		}
	}
}
