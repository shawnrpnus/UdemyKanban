import { GET_ERRORS } from "./types";
import axios from "axios";
import { Project } from "../models/Project";
import { History } from "history";

//MUST explicity call DISPATCH in an async function
//function must return an action object
//action creator must return a function (function IS the action)
//function can take in dispatch, getState, extraArgument (react-thunk)
export const createProject = (project: Project, history: History) => {
	return (dispatch: any) => {
		axios
			.post("http://localhost:8080/api/project", project)
			.then(response => {
				dispatch(createProjectSuccess(response));
				history.push("/dashboard");
			})
			.catch(err => {
				dispatch(createProjectError(err));
				console.log(err.response.data);
			});
	};
};

//action creator
const createProjectError = (errorData: any) => ({
	type: GET_ERRORS,
	payload: errorData
});

const createProjectSuccess = (payload: any) => ({
	type: "SUCCESS",
	payload: payload
});

export const getProjects = () => {
	return (dispatch: any) => {
		axios
			.get("http://localhost:8080/api/project/all")
			.then(response => {
				dispatch(getProjectSuccess(response.data));
			})
			.catch(err => {
				dispatch(createProjectError(err.response.data));
			});
	};
};

const getProjectSuccess = (projects: any) => ({
	type: "GET_PROJECTS",
	projects: projects
});
