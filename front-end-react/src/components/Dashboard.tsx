import { Typography } from "antd";
import * as React from "react";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import { Project } from "../models/Project";

const { Title } = Typography;

export interface IDashboardProps {
	projects: Array<Project>;
	getProjects: Function;
}

export interface IDashboardState {}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
	constructor(props: IDashboardProps) {
		super(props);

		this.state = {};
	}

	componentWillMount() {
		this.props.getProjects();
		console.log(this.props.projects);
	}

	public render() {
		return (
			<div style={{ padding: "30px" }}>
				<Title style={{ textAlign: "center" }}>Projects</Title>
				<CreateProjectButton />
				<hr />
				{this.props.projects.map((project: Project) => {
					return <ProjectItem project={project} key={project.projectIdentifier} />;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	projects: state.project.projects
});
const mapDispatchToProps = {
	getProjects
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
