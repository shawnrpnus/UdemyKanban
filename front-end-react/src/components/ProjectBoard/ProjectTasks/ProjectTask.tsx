import * as React from "react";

export interface IProjectTaskProps {}

export interface IProjectTaskState {}

export default class ProjectTask extends React.Component<
	IProjectTaskProps,
	IProjectTaskState
> {
	constructor(props: IProjectTaskProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <div />;
	}
}
