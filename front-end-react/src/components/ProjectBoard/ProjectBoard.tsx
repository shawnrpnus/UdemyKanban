import * as React from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import { Link, RouteComponentProps } from "react-router-dom";

const { Title } = Typography;

export interface IProjectBoardProps extends RouteComponentProps {}

export interface IProjectBoardState {}

interface IRouteParams {
	id?: string;
}

class ProjectBoard extends React.Component<IProjectBoardProps, IProjectBoardState> {
	constructor(props: IProjectBoardProps) {
		super(props);

		this.state = {};
	}

	public render() {
		let routeParams: IRouteParams = this.props.match.params;
		return (
			<div style={{ padding: "5vw" }}>
				<Title style={{ textAlign: "center" }}> Project Board </Title>
				<Link to={`/addProjectTask/${routeParams.id}`}>
					<Button type="primary">Create Project Task</Button>
				</Link>
				<hr />
				<Row gutter={16}>
					<Col span={8}>
						<Card style={{ textAlign: "center", background: "#95A5A6" }}>
							<h1 style={{ margin: "0", color: "white" }}>To Do</h1>
						</Card>
					</Col>
					<Col span={8}>
						<Card style={{ textAlign: "center", background: "#3498DB" }}>
							<h1 style={{ margin: "0", color: "white" }}>In Progress</h1>
						</Card>
					</Col>
					<Col span={8}>
						<Card style={{ textAlign: "center", background: "#27AE60" }}>
							<h1 style={{ margin: "0", color: "white" }}>Done</h1>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ProjectBoard;
