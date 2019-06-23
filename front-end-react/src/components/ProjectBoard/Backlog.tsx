import * as React from "react";

export interface IBacklogProps {}

export interface IBacklogState {}

export default class Backlog extends React.Component<IBacklogProps, IBacklogState> {
	constructor(props: IBacklogProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <div />;
	}
}
