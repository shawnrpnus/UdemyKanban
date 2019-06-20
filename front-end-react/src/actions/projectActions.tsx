import { GET_ERRORS, GET_PROJECTS, GET_PROJECT_BY_ID } from "./types";
import axios from "axios";
import { Project } from "../models/Project";
import { History } from "history";
import { Moment } from "moment";

//MUST explicity call DISPATCH in an async function, cause using thunk
//action function must return an action object
//action creator must return a function (function IS the action) --> redux thunk will call the function
//function can take in dispatch, getState, extraArgument (redux-thunk)
export interface IFormFieldValues {
	projectIdentifier: string;
	projectName: string;
	description: string;
	start_date: Moment;
	end_date: Moment;
}

export const createProject = (newProject: Project, history: History) => {
	return (dispatch: any) => {
		//redux thunk passes dispatch

		axios
			.post("http://localhost:8080/api/project", newProject)
			.then(response => {
				console.log(response);
				dispatch(createProjectSuccess(response));
				history.push("/dashboard");
			})
			.catch(err => {
				dispatch(createProjectError(err.response.data));
				console.log(err.response.data);
			});
	};
};

//action creator
const createProjectError = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
});

const createProjectSuccess = (payload: any) => ({
	type: "SUCCESS",
	payload: payload
});

export const getProjects = () => {
	return (dispatch: any) => {
		axios.get("http://localhost:8080/api/project/all").then(response => {
			dispatch(getProjectSuccess(response.data));
		});
	};
};

export const getProjectById = (projectIdentifier: string) => {
	return (dispatch: any) => {
		axios.get(`http://localhost:8080/api/project/${projectIdentifier}`).then(response => {
			dispatch(getProjectByIdSuccess(response.data));
		});
	};
};

const getProjectSuccess = (projects: any) => ({
	type: GET_PROJECTS,
	projects: projects
});

const getProjectByIdSuccess = (project: Project) => ({
	type: GET_PROJECT_BY_ID,
	project: project
});

export const clearStateErrors = () => ({
	type: "CLEAR"
});
