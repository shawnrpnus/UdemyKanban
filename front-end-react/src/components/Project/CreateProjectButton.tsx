import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

interface ICreateProjectButtonProps {}

const CreateProjectButton: React.FunctionComponent<
	ICreateProjectButtonProps
> = (props: ICreateProjectButtonProps) => {
	return (
		<React.Fragment>
			<Link to="/addProject">
				<Button type="primary">Create a Project</Button>
			</Link>
		</React.Fragment>
	);
};

export default CreateProjectButton;
