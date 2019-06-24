import * as React from "react";
import { Card, Button } from "antd";
import { ProjectTask } from "../../../models/ProjectTask";
import { Link } from "react-router-dom";

export interface IProjectTaskComponentProps {
	projectTask: ProjectTask;
}

export interface IProjectTaskComponentState {}

export default class ProjectTaskComponent extends React.Component<
	IProjectTaskComponentProps,
	IProjectTaskComponentState
> {
	constructor(props: IProjectTaskComponentProps) {
		super(props);

		this.state = {};
	}

	public render() {
		let projectTask = this.props.projectTask;
		let background = "";
		let priority = "";
		switch (projectTask.priority) {
			case 1:
				background = "red";
				priority = "HIGH";
				break;
			case 2:
				background = "yellow";
				priority = "MEDIUM";
				break;
			case 3:
				background = "green";
				priority = "LOW";
				break;
		}

		return (
			<Card
				title={`ID: ${projectTask.projectSequence} --- Priority: ${priority} `}
				headStyle={{ background: background }}
				actions={[
					<Button type="primary">View/Update Project</Button>,
					<Button type="danger">Delete</Button>
				]}
			>
				<p style={{ fontWeight: "bold", fontSize: "2vw" }}>{projectTask.summary}</p>
				<p>{projectTask.acceptanceCriteria}</p>
			</Card>
		);
	}
}
