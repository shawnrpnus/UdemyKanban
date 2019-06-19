import { Card, Col, Menu, Row } from "antd";
import * as React from "react";
import { Project } from "../../models/Project";
import { Link } from "react-router-dom";

export interface IProjectItemProps {
	project: Project;
}

export interface IProjectItemState {}

class ProjectItem extends React.Component<IProjectItemProps, IProjectItemState> {
	constructor(props: IProjectItemProps) {
		super(props);

		this.state = {};
		this.updateProject = this.updateProject.bind(this);
	}

	updateProject() {}

	public render() {
		let project = this.props.project;
		return (
			<div>
				<Card
					title={project.projectIdentifier + ": " + project.projectName}
					style={{ marginBottom: "1vw" }}
				>
					<Row>
						<Col span={18} style={{ textAlign: "left" }}>
							<p>{project.description}</p>
						</Col>
						<Col span={6}>
							<Menu mode="vertical">
								<Menu.Item>Project Board</Menu.Item>
								<Menu.Item>
									<Link to={`/updateProject/${project.projectIdentifier}`}>
										Update Project Info
									</Link>
								</Menu.Item>
								<Menu.Item>Delete Project</Menu.Item>
							</Menu>
						</Col>
					</Row>
				</Card>
			</div>
		);
	}
}

export default ProjectItem;
