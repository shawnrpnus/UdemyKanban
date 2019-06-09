import { Button, Typography } from "antd";
import * as React from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";

const { Title } = Typography;

export interface IDashboardProps {}

export interface IDashboardState {}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
	constructor(props: IDashboardProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div style={{ padding: "30px" }}>
				<Title style={{ textAlign: "center" }}>Projects</Title>
				<CreateProjectButton />
				<hr />
				<ProjectItem
					id="TEST1"
					name="TEST TITLE"
					description="TEST DESCRIPTION"
				/>
			</div>
		);
	}
}

export default Dashboard;
