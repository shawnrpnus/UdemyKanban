import { Card, Col, Row, Alert } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getBacklog } from "../../actions/backlogActions";
import { ProjectTask } from "../../models/ProjectTask";
import ProjectTaskComponent from "./ProjectTasks/ProjectTask";

export interface IBacklogProps {
	match?: RouteComponentProps<any>["match"];
	getBacklog: Function;
	projectTasks: Array<ProjectTask>;
	id: string | undefined;
	errors: any;
}

export interface IBacklogState {}

class Backlog extends React.Component<IBacklogProps, IBacklogState> {
	constructor(props: IBacklogProps) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.props.getBacklog(this.props.id);
	}

	public render() {
		let todoTasks = this.props.projectTasks
			.filter(projectTask => projectTask.status === "TO_DO")
			.sort((task1, task2) => {
				return task1.priority - task2.priority;
			});
		let inProgressTasks = this.props.projectTasks
			.filter(projectTask => projectTask.status === "IN_PROGRESS")
			.sort((task1, task2) => {
				return task1.priority - task2.priority;
			});
		let doneTasks = this.props.projectTasks
			.filter(projectTask => projectTask.status === "DONE")
			.sort((task1, task2) => {
				return task1.priority - task2.priority;
			});
		return (
			<div>
				{this.props.projectTasks.length < 1 ? (
					this.props.errors.projectNotFound ? (
						<Alert
							message={this.props.errors.projectNotFound}
							type="error"
							showIcon
							style={{ textAlign: "center", fontSize: "2vw", fontWeight: "bold" }}
						/>
					) : (
						<Alert
							message="No Projects on this Board"
							type="error"
							showIcon
							style={{ textAlign: "center", fontSize: "2vw", fontWeight: "bold" }}
						/>
					)
				) : (
					""
				)}
				<Row gutter={16}>
					<Col span={8}>
						<Card style={{ textAlign: "center", background: "#95A5A6" }}>
							<h1 style={{ margin: "0", color: "white" }}>To Do</h1>
						</Card>
						{todoTasks.map(task => (
							<ProjectTaskComponent key={task.projectSequence} projectTask={task} />
						))}
					</Col>
					<Col span={8}>
						<Card style={{ textAlign: "center", background: "#3498DB" }}>
							<h1 style={{ margin: "0", color: "white" }}>In Progress</h1>
						</Card>
						{inProgressTasks.map(task => (
							<ProjectTaskComponent key={task.projectSequence} projectTask={task} />
						))}
					</Col>
					<Col span={8}>
						<Card style={{ textAlign: "center", background: "#27AE60" }}>
							<h1 style={{ margin: "0", color: "white" }}>Done</h1>
						</Card>
						{doneTasks.map(task => (
							<ProjectTaskComponent key={task.projectSequence} projectTask={task} />
						))}
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	projectTasks: state.backlog.projectTasks,
	errors: state.errors
});
const mapDispatchToProps = {
	getBacklog
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Backlog);
