import * as React from "react";

export interface IAddProjectTaskProps {}

export interface IAddProjectTaskState {}

export default class AddProjectTask extends React.Component<
	IAddProjectTaskProps,
	IAddProjectTaskState
> {
	constructor(props: IAddProjectTaskProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <div />;
	}
}
