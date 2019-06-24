import { Button, Card } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/backlogActions";
import { ProjectTask } from "../../../models/ProjectTask";

export interface IProjectTaskComponentProps {
	projectTask: ProjectTask;
	deleteProjectTask: Function;
}

export interface IProjectTaskComponentState {}

class ProjectTaskComponent extends React.Component<
	IProjectTaskComponentProps,
	IProjectTaskComponentState
> {
	constructor(props: IProjectTaskComponentProps) {
		super(props);

		this.state = {};
		this.deleteProjectTask = this.deleteProjectTask.bind(this);
	}

	deleteProjectTask() {
		let backlog_id = this.props.projectTask.projectIdentifier;
		this.props.deleteProjectTask(backlog_id, this.props.projectTask);
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
					<Button type="primary">
						<Link
							to={`/updateProjectTask/${projectTask.projectIdentifier}/${
								projectTask.projectSequence
							}`}
						>
							View/Update Project
						</Link>
					</Button>,
					<Button type="danger" onClick={this.deleteProjectTask}>
						Delete
					</Button>
				]}
			>
				<p style={{ fontWeight: "bold", fontSize: "2vw" }}>{projectTask.summary}</p>
				<p>{projectTask.acceptanceCriteria}</p>
			</Card>
		);
	}
}

const mapDispatchToProps = {
	deleteProjectTask
};

export default connect(
	null,
	mapDispatchToProps
)(ProjectTaskComponent);
