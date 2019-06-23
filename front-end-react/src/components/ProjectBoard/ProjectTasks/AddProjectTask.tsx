import * as React from "react";
import { Form, Button, DatePicker, Input, Select, Typography } from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;
export interface IAddProjectTaskProps extends FormComponentProps {
	errors: any;
	match: RouteComponentProps["match"];
}

export interface IAddProjectTaskState {}

interface IRouteParams {
	id?: string;
}

class AddProjectTask extends React.Component<IAddProjectTaskProps, IAddProjectTaskState> {
	constructor(props: IAddProjectTaskProps) {
		super(props);

		this.state = {};
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {}

	handleSelectChange() {}

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
						validateStatus={this.props.errors.projectName ? "error" : ""}
						help={this.props.errors.projectName}
						hasFeedback={true}
					>
						{getFieldDecorator("summary")(<Input placeholder="Summary" />)}
					</Form.Item>

					<Form.Item
						validateStatus={this.props.errors.projectIdentifier ? "error" : ""}
						help={this.props.errors.projectIdentifier}
						hasFeedback={true}
					>
						{getFieldDecorator("acceptanceCriteria")(
							<Input placeholder="Acceptance Criteria" />
						)}
					</Form.Item>

					<Form.Item
						label="Due Date"
						validateStatus={this.props.errors.start_date ? "error" : ""}
						help={this.props.errors.start_date}
						hasFeedback={true}
					>
						{getFieldDecorator("dueDate", {
							initialValue: moment()
						})(<DatePicker style={{ width: "100%" }} />)}
					</Form.Item>

					<Form.Item>
						<Select placeholder="Select Priority" onChange={this.handleSelectChange}>
							<Option value="low">Low</Option>
							<Option value="medium">Medium</Option>
							<Option value="high">High</Option>
						</Select>
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
	// createProject,
	// clearStateErrors
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedAddProjectTaskForm);
