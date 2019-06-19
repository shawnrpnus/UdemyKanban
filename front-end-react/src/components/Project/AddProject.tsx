import * as React from "react";
import { Typography, Form, Input, DatePicker, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import { clearState } from "../../actions/projectActions";
import { History } from "history";

const { Title } = Typography;

export interface IAddProjectProps extends FormComponentProps {
	createProject: Function;
	history: History; //route props are match, location and history
	errors: any;
	clearState: Function;
}

export interface IAddProjectState {}

class AddProject extends React.Component<IAddProjectProps, IAddProjectState> {
	constructor(props: IAddProjectProps) {
		super(props);
		//form state handled by antd
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let fieldValues = this.props.form.getFieldsValue();
		this.props.createProject(fieldValues, this.props.history);
	}

	componentWillUnmount() {
		this.props.form.resetFields();
		this.props.clearState();
	}

	render() {
		/*getFieldDecorator binds values from input to the unique id values (field names) in the 
		  value object*/
		const { getFieldDecorator } = this.props.form;
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
						{getFieldDecorator("projectName")(<Input placeholder="Project Name" />)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.projectIdentifier ? "error" : ""}
						help={this.props.errors.projectIdentifier}
						hasFeedback={true}
					>
						{getFieldDecorator("projectIdentifier")(
							<Input placeholder="Unique Project ID" />
						)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.description ? "error" : ""}
						help={this.props.errors.description}
						hasFeedback={true}
					>
						{getFieldDecorator("description")(
							<Input placeholder="Project Description" />
						)}
					</Form.Item>

					<Form.Item
						label="Start Date"
						validateStatus={this.props.errors.start_date ? "error" : ""}
						help={this.props.errors.start_date}
						hasFeedback={true}
					>
						{getFieldDecorator("start_date", {
							initialValue: moment()
						})(<DatePicker style={{ width: "100%" }} />)}
					</Form.Item>

					<Form.Item
						label="End Date"
						validateStatus={this.props.errors.end_date ? "error" : ""}
						help={this.props.errors.end_date}
						hasFeedback={true}
					>
						{getFieldDecorator("end_date")(<DatePicker style={{ width: "100%" }} />)}
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

//Form.create supplies this.props.form to the AddProject component
//this.props.form is an object with several methods (getFieldDecorator, getFieldsError etc.)
const wrappedAddProjectForm = Form.create({ name: "add_project" })(AddProject);
const mapStateToProps = (state: any) => ({
	errors: state.errors
});
const mapDispatchToProps = {
	createProject,
	clearState
}; //will wrap to become this.props.createProject = (project, history) => dispatch(createProject(project,history))
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedAddProjectForm);
