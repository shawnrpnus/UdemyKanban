import axios from "axios";
import { History } from "history";
import {
	GET_ERRORS,
	GET_BACKLOG,
	GET_PROJECT_TASK,
	DELETE_PROJECT_TASK,
	CLEAR_BACKLOG
} from "./types";
import { ProjectTask } from "../models/ProjectTask";

export const addProjectTask = (
	backlog_id: string,
	project_task: ProjectTask,
	history: History
) => {
	return (dispatch: any) => {
		axios
			.post(`/api/backlog/${backlog_id}`, project_task)
			.then(response => {
				dispatch(addProjectTaskSuccess(response.data));
				history.push(`/projectBoard/${backlog_id}`);
			})
			.catch(error => {
				console.log(error.response.data);
				dispatch(addProjecTaskError(error.response.data));
			});
	};
};

const addProjecTaskError = (errorData: any) => ({
	type: GET_ERRORS,
	errorObj: errorData
});

const addProjectTaskSuccess = (payload: any) => ({
	type: "SUCCESS",
	payload: payload
});

export const getBacklog = (backlog_id: string) => {
	return (dispatch: any) => {
		axios
			.get(`/api/backlog/${backlog_id}`)
			.then(response => {
				dispatch(getBacklogSuccess(response.data));
			})
			.catch(error => {
				dispatch(addProjecTaskError(error.response.data));
			});
	};
};

const getBacklogSuccess = (projectTasks: any) => ({
	type: GET_BACKLOG,
	projectTasks: projectTasks
});

export const updateProjectTask = (
	backlog_id: string,
	project_task: ProjectTask,
	history: History
) => {
	return (dispatch: any) => {
		axios
			.post(`/api/backlog/${backlog_id}/${project_task.projectSequence}`, project_task)
			.then(response => {
				dispatch(addProjectTaskSuccess(response.data));
				history.push(`/projectBoard/${backlog_id}`);
			})
			.catch(error => {
				dispatch(addProjecTaskError(error.response.data));
			});
	};
};

export const getProjectTask = (
	backlog_id: string,
	project_task_id: string,
	history: History
) => {
	return (dispatch: any) => {
		axios
			.get(`/api/backlog/${backlog_id}/${project_task_id}`)
			.then(response => {
				dispatch(getProjectTaskSuccess(response.data));
			})
			.catch(error => {
				dispatch(addProjecTaskError(error.response.data));
				// history.push(`/projectBoard/${backlog_id}`);
				// alert("Invalid project task");
			});
	};
};

const getProjectTaskSuccess = (projectTask: ProjectTask) => ({
	type: GET_PROJECT_TASK,
	projectTask: projectTask
});

export const deleteProjectTask = (backlog_id: string, project_task: ProjectTask) => {
	return (dispatch: any) => {
		if (window.confirm("Are you sure you want to delete?")) {
			axios
				.delete(`/api/backlog/${backlog_id}/${project_task.projectSequence}`)
				.then(response => {
					dispatch(deleteProjectTaskSuccess(response.data));
				})
				.catch(error => {
					dispatch(addProjecTaskError(error.response.data));
					console.log(error.response.data);
				});
		}
	};
};

interface deleteRsp {
	projectTaskId: string;
}

const deleteProjectTaskSuccess = (deleteResponse: deleteRsp) => ({
	type: DELETE_PROJECT_TASK,
	deletedId: deleteResponse.projectTaskId
});

export const clearStateBacklog = () => ({
	type: CLEAR_BACKLOG
});
