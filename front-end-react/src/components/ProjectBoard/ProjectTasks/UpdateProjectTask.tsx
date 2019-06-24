import * as React from "react";
import { Form, Button, DatePicker, Input, Select, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { updateProjectTask, getProjectTask } from "../../../actions/backlogActions";
import { ProjectTask } from "../../../models/ProjectTask";
import { clearStateErrors } from "../../../actions/projectActions";

const { Option } = Select;
const { Title } = Typography;

export interface IUpdateProjectTaskProps
	extends FormComponentProps,
		RouteComponentProps<IRouteParams> {
	errors: any;
	updateProjectTask: typeof updateProjectTask;
	projectTaskToUpdate: ProjectTask;
	getProjectTask: typeof getProjectTask;
	clearStateErrors: typeof clearStateErrors;
}

export interface IUpdateProjectTaskState {}

interface IRouteParams {
	backlogId: string;
	ptId: string;
}

class UpdateProjectTask extends React.Component<
	IUpdateProjectTaskProps,
	IUpdateProjectTaskState
> {
	constructor(props: IUpdateProjectTaskProps) {
		super(props);

		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let routeParams: IRouteParams = this.props.match.params;
		let projectIdentifier = routeParams.backlogId;
		let fieldValues = this.props.form.getFieldsValue();
		let updatedProjectTask = new ProjectTask(
			projectIdentifier,
			fieldValues.summary,
			fieldValues.acceptanceCriteria,
			fieldValues.status,
			fieldValues.priority,
			fieldValues.dueDate
				? fieldValues.dueDate.format("YYYY-MM-DD HH:mm:ss ZZ")
				: undefined
		);
		updatedProjectTask.id = this.props.projectTaskToUpdate.id;
		updatedProjectTask.projectSequence = this.props.projectTaskToUpdate.projectSequence;
		this.props.updateProjectTask(
			projectIdentifier,
			updatedProjectTask,
			this.props.history
		);
	}

	componentWillMount() {
		let routeParams: IRouteParams = this.props.match.params;
		this.props.getProjectTask(
			routeParams.backlogId,
			routeParams.ptId,
			this.props.history
		);
	}

	componentWillUnmount() {
		this.props.form.resetFields();
		this.props.clearStateErrors();
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let routeParams: IRouteParams = this.props.match.params;
		let projectTaskToUpdate = this.props.projectTaskToUpdate;
		return (
			<div style={{ paddingLeft: "9vw", paddingRight: "9vw", paddingTop: "4vw" }}>
				<Link to={`/projectBoard/${routeParams.backlogId}`}>
					<Button type="primary">Back to Project Board</Button>
				</Link>
				<Title style={{ textAlign: "center" }}>Update Project Task</Title>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item
						validateStatus={this.props.errors.summary ? "error" : ""}
						help={this.props.errors.summary}
						hasFeedback={true}
					>
						{getFieldDecorator("summary", { initialValue: projectTaskToUpdate.summary })(
							<Input placeholder="Summary" />
						)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.acceptanceCriteria ? "error" : ""}
						help={this.props.errors.acceptanceCriteria}
						hasFeedback={true}
					>
						{getFieldDecorator("acceptanceCriteria", {
							initialValue: projectTaskToUpdate.acceptanceCriteria
						})(<Input placeholder="Acceptance Criteria" />)}
					</Form.Item>

					<Form.Item
						label="Due Date"
						validateStatus={this.props.errors.dueDate ? "error" : ""}
						help={this.props.errors.dueDate}
						hasFeedback={true}
					>
						{getFieldDecorator("dueDate", {
							initialValue: projectTaskToUpdate.dueDate
								? moment(projectTaskToUpdate.dueDate, "YYYY-MM-DD HH:mm:ss Z")
								: null
						})(<DatePicker style={{ width: "100%" }} />)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.priority ? "error" : ""}
						help={this.props.errors.priority}
						hasFeedback={true}
					>
						{getFieldDecorator("priority", {
							initialValue: projectTaskToUpdate.priority
						})(
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
						{getFieldDecorator("status", {
							initialValue: projectTaskToUpdate.status
						})(
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

const wrappedUpdateProjectTaskForm = Form.create({ name: "update_project_task" })(
	UpdateProjectTask
);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	projectTaskToUpdate: state.backlog.projectTask
});
const mapDispatchToProps = {
	updateProjectTask,
	clearStateErrors,
	getProjectTask
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedUpdateProjectTaskForm);
