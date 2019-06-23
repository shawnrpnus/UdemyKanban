import { GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from "../actions/types";
import { ProjectTask } from "../models/ProjectTask";

const initialState = {
	projectTasks: [],
	projectTask: {}
};

interface Action {
	projectTasks: ProjectTask[];
	projectTask: ProjectTask;
}

export default function(state = initialState, action: Action | any) {
	switch (action.type) {
		case GET_BACKLOG:
			return {
				...state,
				projectTasks: action.projectTasks
			};
		case GET_PROJECT_TASK:
			return {
				...state,
				projectTask: action.projectTask
			};
		case DELETE_PROJECT_TASK:
			return {
				...state
			}; // TODO: put logic
		default:
			return state;
	}
}
