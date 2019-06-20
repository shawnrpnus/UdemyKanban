import * as React from "react";
import { Typography, Form, Input, DatePicker, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { Project } from "../../models/Project";
import { RouteComponentProps } from "react-router-dom";
import {
	getProjectById,
	createProject,
	clearStateErrors
} from "../../actions/projectActions";
import moment from "moment";
const { Title } = Typography;

export interface IUpdateProjectProps extends FormComponentProps, RouteComponentProps {
	errors: any; //from mapState
	projectToUpdate: Project; //from mapState
	getProjectById: Function; //from mapDispatch
	createProject: Function; //from mapDispatch
	clearStateErrors: Function;
}

export interface IUpdateProjectState {}

interface IRouteParams {
	projectIdentifier?: string;
}

class UpdateProject extends React.Component<IUpdateProjectProps, IUpdateProjectState> {
	constructor(props: IUpdateProjectProps) {
		super(props);

		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		//when updaet form loads, get project, save it to redux state, which will then
		//be passed down to the component as props
		let routeParams: IRouteParams = this.props.match.params;
		this.props.getProjectById(routeParams.projectIdentifier, this.props.history);
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let fieldValues = this.props.form.getFieldsValue();
		let newProject = new Project(
			fieldValues.projectIdentifier,
			fieldValues.projectName,
			fieldValues.description,
			fieldValues.start_date
				? fieldValues.start_date.format("YYYY-MM-DD HH:mm:ss ZZ")
				: undefined,
			fieldValues.end_date
				? fieldValues.end_date.format("YYYY-MM-DD HH:mm:ss ZZ")
				: undefined
		);
		newProject.id = this.props.projectToUpdate.id;
		this.props.createProject(newProject, this.props.history);
	}

	componentWillUnmount() {
		this.props.form.resetFields();
		this.props.clearStateErrors();
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let projectToUpdate: Project = this.props.projectToUpdate;
		return (
			<div style={{ padding: "30px" }}>
				<Title style={{ textAlign: "center" }}>Create / Update a Project</Title>
				<Form
					onSubmit={this.handleSubmit}
					style={{ paddingLeft: "5vw", paddingRight: "5vw" }}
				>
					<Form.Item
						validateStatus={this.props.errors.projectName ? "error" : ""}
						help={this.props.errors.projectName}
						hasFeedback={true}
					>
						{getFieldDecorator("projectName", {
							initialValue: projectToUpdate.projectName
						})(<Input placeholder="Project Name" />)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.projectIdentifier ? "error" : ""}
						help={this.props.errors.projectIdentifier}
						hasFeedback={true}
					>
						{getFieldDecorator("projectIdentifier", {
							initialValue: projectToUpdate.projectIdentifier
						})(<Input placeholder="Unique Project ID" readOnly={true} />)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.description ? "error" : ""}
						help={this.props.errors.description}
						hasFeedback={true}
					>
						{getFieldDecorator("description", {
							initialValue: projectToUpdate.description
						})(<Input placeholder="Project Description" />)}
					</Form.Item>

					<Form.Item
						label="Start Date"
						validateStatus={this.props.errors.start_date ? "error" : ""}
						help={this.props.errors.start_date}
						hasFeedback={true}
					>
						{getFieldDecorator("start_date", {
							initialValue: moment(projectToUpdate.start_date, "YYYY-MM-DD HH:mm:ss Z")
						})(<DatePicker style={{ width: "100%" }} />)}
					</Form.Item>

					<Form.Item
						label="End Date"
						validateStatus={this.props.errors.end_date ? "error" : ""}
						help={this.props.errors.end_date}
						hasFeedback={true}
					>
						{getFieldDecorator("end_date", {
							initialValue: projectToUpdate.end_date
								? moment(projectToUpdate.end_date, "YYYY-MM-DD HH:mm:ss Z")
								: null
						})(<DatePicker style={{ width: "100%" }} />)}
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" onSubmit={this.handleSubmit}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const wrappedUpdateProjectForm = Form.create({ name: "add_project" })(UpdateProject);
const mapStateToProps = (state: any) => ({
	errors: state.errors,
	projectToUpdate: state.project.project
});
const mapDispatchToProps = {
	getProjectById,
	createProject,
	clearStateErrors
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedUpdateProjectForm);
