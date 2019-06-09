import * as React from "react";
import { Typography } from "antd";
const { Title } = Typography;

export interface IAddProjectProps {}

export interface IAddProjectState {}

class AddProject extends React.Component<IAddProjectProps, IAddProjectState> {
	constructor(props: IAddProjectProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div style={{ padding: "30px" }}>
				<Title style={{ textAlign: "center" }}>Add a Project</Title>
			</div>
		);
	}
}

export default AddProject;
