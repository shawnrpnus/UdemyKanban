import {
	GET_ERRORS,
	GET_PROJECTS,
	GET_PROJECT_BY_ID,
	CLEAR_ERRORS,
	DELETE_PROJECT
} from "./types";
import axios from "axios";
import { Project } from "../models/Project";
import { History } from "history";

//MUST explicity call DISPATCH in an async function, cause using thunk
//action function must return an action object
//action creator must return a function (function IS the action) --> redux thunk will call the function
//function can take in dispatch, getState, extraArgument (redux-thunk)
export const createProject = (newProject: Project, history: History) => {
	return (dispatch: any) => {
		//redux thunk passes dispatch

		axios
			.post("/api/project", newProject)
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
		axios.get("/api/project/all").then(response => {
			dispatch(getProjectsSuccess(response.data));
		});
	};
};

export const getProjectById = (projectIdentifier: string, history: History) => {
	return (dispatch: any) => {
		axios
			.get(`/api/project/${projectIdentifier}`)
			.then(response => {
				dispatch(getProjectByIdSuccess(response.data));
			})
			.catch(error => {
				history.push("/dashboard");
			});
	};
};

const getProjectsSuccess = (projects: any) => ({
	type: GET_PROJECTS,
	projects: projects
});

const getProjectByIdSuccess = (project: Project) => ({
	type: GET_PROJECT_BY_ID,
	project: project
});

export const deleteProject = (projectIdentifier: string) => {
	return (dispatch: any) => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			axios
				.delete(`/api/project/delete?projectId=${projectIdentifier}`)
				.then(response => {
					dispatch(deleteProjectSuccess(response.data.projectIdentifier));
				});
		}
	};
};

const deleteProjectSuccess = (projectIdentifier: string) => ({
	type: DELETE_PROJECT,
	projectIdentifier: projectIdentifier
});

export const clearStateErrors = () => ({
	type: CLEAR_ERRORS
});
