import * as React from "react";
import { Typography, Form, Input, DatePicker, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Moment } from "moment";
import moment from "moment";

const { Title } = Typography;

export interface IAddProjectProps extends FormComponentProps {}

export interface IAddProjectState {
	projectIdentifier: string;
	projectName: string;
	projectDescription: string;
	start_date: Moment | Date | null;
	end_date: Moment | Date | null;
}

export interface formResponse {
	projectIdentifier: string;
	projectName: string;
	description: string;
	start_date: Moment | null;
	end_date: Moment | null;
}

class AddProject extends React.Component<IAddProjectProps, IAddProjectState> {
	constructor(props: IAddProjectProps) {
		super(props);
		this.state = {
			projectName: "",
			projectIdentifier: "",
			projectDescription: "",
			start_date: null,
			end_date: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((errors, values: formResponse) => {
			if (!errors) {
				// let keys = Object.keys(values);
				// let formData2: IAddProjectState = Object.assign({}, values);
				// if (keys.includes("start_date") && values["start_date"] != undefined) {
				// 	formData["start_date"] = values["start_date"].toDate();
				// }
				// if (keys.includes("end_date") && values["end_date"] != undefined) {
				// 	formData["end_date"] = values["end_date"].toDate();
				// }
				// console.log(formData);
				const formData = {
					projectName: values["projectName"],
					projectIdentifier: values["projectIdentifier"],
					description: values["description"],
					start_date: !values["start_date"]
						? null
						: values["start_date"].format("YYYY-MM-DD HH:mm:ss ZZ"),
					end_date: !values["end_date"]
						? null
						: values["end_date"].format("YYYY-MM-DD HH:mm:ss ZZ")
				};
				console.log(formData);
			} else {
				console.log(errors);
			}
		});
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div style={{ padding: "30px" }}>
				<Title style={{ textAlign: "center" }}>Create / Update a Project</Title>
				<Form
					onSubmit={this.handleSubmit}
					style={{ paddingLeft: "5vw", paddingRight: "5vw" }}
				>
					<Form.Item>
						{getFieldDecorator("projectName", {
							rules: [{ required: true, message: "Project Name is Required!" }]
						})(<Input placeholder="Project Name" />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("projectIdentifier", {
							rules: [{ required: true, message: "Project ID is Required!" }]
						})(<Input placeholder="Unique Project ID" />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("description", {
							rules: [
								{ required: true, message: "Project Description is Required!" }
							]
						})(<Input placeholder="Project Description" />)}
					</Form.Item>
					<Form.Item label="Start Date">
						{getFieldDecorator("start_date", {
							initialValue: moment()
						})(<DatePicker style={{ width: "100%" }} />)}
					</Form.Item>
					<Form.Item label="End Date">
						{getFieldDecorator("end_date")(
							<DatePicker style={{ width: "100%" }} />
						)}
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							onSubmit={this.handleSubmit}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const wrappedAddProjectForm = Form.create({ name: "add_project" })(AddProject);
export default wrappedAddProjectForm;
