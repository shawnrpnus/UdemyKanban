import * as React from "react";
import { Form, Button, DatePicker, Input, Select, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { addProjectTask } from "../../../actions/backlogActions";
import { ProjectTask } from "../../../models/ProjectTask";
import { clearStateErrors } from "../../../actions/projectActions";

const { Option } = Select;
const { Title } = Typography;
export interface IAddProjectTaskProps extends FormComponentProps {
	errors: any;
	match: RouteComponentProps<IRouteParams>["match"];
	addProjectTask: typeof addProjectTask;
	history: RouteComponentProps["history"];
	clearStateErrors: typeof clearStateErrors;
}

export interface IAddProjectTaskState {}

interface IRouteParams {
	id: string;
}

class AddProjectTask extends React.Component<IAddProjectTaskProps, IAddProjectTaskState> {
	constructor(props: IAddProjectTaskProps) {
		super(props);

		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let routeParams: IRouteParams = this.props.match.params;
		let projectIdentifier = routeParams.id;
		let fieldValues = this.props.form.getFieldsValue();
		let newProjectTask = new ProjectTask(
			projectIdentifier,
			fieldValues.summary,
			fieldValues.acceptanceCriteria,
			fieldValues.status,
			fieldValues.priority,
			fieldValues.dueDate
				? fieldValues.dueDate.format("YYYY-MM-DD HH:mm:ss ZZ")
				: undefined
		);
		console.log(newProjectTask);
		this.props.addProjectTask(projectIdentifier, newProjectTask, this.props.history);
	}

	componentWillUnmount() {
		this.props.form.resetFields();
		this.props.clearStateErrors();
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let routeParams: IRouteParams = this.props.match.params;
		return (
			<div style={{ paddingLeft: "9vw", paddingRight: "9vw", paddingTop: "4vw" }}>
				<Link to={`/projectBoard/${routeParams.id}`}>
					<Button type="primary">Back to Project Board</Button>
				</Link>
				<Title style={{ textAlign: "center" }}>Add a Project Task</Title>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item
						validateStatus={this.props.errors.summary ? "error" : ""}
						help={this.props.errors.summary}
						hasFeedback={true}
					>
						{getFieldDecorator("summary")(<Input placeholder="Summary" />)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.acceptanceCriteria ? "error" : ""}
						help={this.props.errors.acceptanceCriteria}
						hasFeedback={true}
					>
						{getFieldDecorator("acceptanceCriteria")(
							<Input placeholder="Acceptance Criteria" />
						)}
					</Form.Item>

					<Form.Item
						label="Due Date"
						validateStatus={this.props.errors.dueDate ? "error" : ""}
						help={this.props.errors.dueDate}
						hasFeedback={true}
					>
						{getFieldDecorator("dueDate", {
							initialValue: moment()
						})(<DatePicker style={{ width: "100%" }} />)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.priority ? "error" : ""}
						help={this.props.errors.priority}
						hasFeedback={true}
					>
						{getFieldDecorator("priority")(
							<Select placeholder="Select Priority">
								<Option value={3}>Low</Option>
								<Option value={2}>Medium</Option>
								<Option value={1}>High</Option>
							</Select>
						)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.status ? "error" : ""}
						help={this.props.errors.status}
						hasFeedback={true}
					>
						{getFieldDecorator("status")(
							<Select placeholder="Select Status">
								<Option value="TO_DO">To Do</Option>
								<Option value="IN_PROGRESS">In Progress</Option>
								<Option value="DONE">Done</Option>
							</Select>
						)}
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

const wrappedAddProjectTaskForm = Form.create({ name: "add_project_task" })(
	AddProjectTask
);

const mapStateToProps = (state: any) => ({
	errors: state.errors
});
const mapDispatchToProps = {
	addProjectTask,
	clearStateErrors
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedAddProjectTaskForm);
