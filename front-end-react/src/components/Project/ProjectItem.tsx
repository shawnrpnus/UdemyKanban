import { Card, Col, Menu, Row } from "antd";
import * as React from "react";

export interface IProjectItemProps {
	id: string;
	name: string;
	description: string;
}

export interface IProjectItemState {}

class ProjectItem extends React.Component<
	IProjectItemProps,
	IProjectItemState
> {
	constructor(props: IProjectItemProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div>
				<Card title={this.props.id + ": " + this.props.name}>
					<Row>
						<Col span={18} style={{ textAlign: "left" }}>
							<p>{this.props.description}</p>
						</Col>
						<Col span={6}>
							<Menu mode="vertical">
								<Menu.Item>Project Board</Menu.Item>
								<Menu.Item>Update Project Info</Menu.Item>
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
