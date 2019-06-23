import * as React from "react";

export interface IUpdateProjectTaskProps {}

export interface IUpdateProjectTaskState {}

export default class UpdateProjectTask extends React.Component<
	IUpdateProjectTaskProps,
	IUpdateProjectTaskState
> {
	constructor(props: IUpdateProjectTaskProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <div />;
	}
}
