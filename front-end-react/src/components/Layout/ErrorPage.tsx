import * as React from "react";

export interface IErrorPageProps {}

export interface IErrorPageState {
	hasError: boolean;
}

export default class ErrorPage extends React.Component<IErrorPageProps, IErrorPageState> {
	constructor(props: IErrorPageProps) {
		super(props);

		this.state = {
			hasError: false
		};
	}

	componentDidCatch(error: any, info: any) {
		this.setState((state, props) => ({
			hasError: true
		}));
		console.log("error", error);
		console.log("info", info);
	}

	public render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}
