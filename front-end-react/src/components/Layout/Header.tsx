import { Menu } from "antd";
import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

export interface IHeaderProps extends RouteComponentProps {}

export interface IHeaderState {}

class Header extends React.Component<IHeaderProps, IHeaderState> {
	constructor(props: IHeaderProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<div>
				<div
					style={{
						float: "left",
						fontSize: "20px",
						color: "white",
						marginRight: "1vw"
					}}
				>
					Personal Kanban Tool
				</div>
				<Menu
					theme="dark"
					mode="horizontal"
					selectedKeys={[this.props.location.pathname]}
					style={{ lineHeight: "64px" }}
				>
					<Menu.Item key="/dashboard" style={{ float: "left" }}>
						<Link to="/dashboard">Dashboard</Link>
					</Menu.Item>
					<Menu.Item key="2" style={{ float: "right" }}>
						Sign Up
					</Menu.Item>
					<Menu.Item key="3" style={{ float: "right" }}>
						Sign Out
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
