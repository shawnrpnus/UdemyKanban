import { Menu } from "antd";
import * as React from "react";

export interface IHeaderProps {}

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
					defaultSelectedKeys={["2"]}
					style={{ lineHeight: "64px" }}
				>
					<Menu.Item key="1" style={{ float: "left" }}>
						Dashboard
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

export default Header;
