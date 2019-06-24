import {
	GET_BACKLOG,
	GET_PROJECT_TASK,
	DELETE_PROJECT_TASK,
	CLEAR_BACKLOG
} from "../actions/types";
import { ProjectTask } from "../models/ProjectTask";

const initialState = {
	projectTasks: [],
	projectTask: {}
};

interface Action {
	projectTasks: ProjectTask[];
	projectTask: ProjectTask;
	deletedId: string;
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
			let deletedId = action.deletedId;
			let newProjectTasks = state.projectTasks.filter(
				(task: ProjectTask) => task.projectSequence !== deletedId
			);
			return {
				...state,
				projectTasks: newProjectTasks
			};
		case CLEAR_BACKLOG:
			return {
				...state,
				projectTask: {}
			};
		default:
			return state;
	}
}
