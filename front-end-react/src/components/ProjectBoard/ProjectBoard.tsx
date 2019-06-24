import { Button, Typography } from "antd";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Backlog from "./Backlog";

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
				<Backlog id={routeParams.id} />
			</div>
		);
	}
}

export default ProjectBoard;
