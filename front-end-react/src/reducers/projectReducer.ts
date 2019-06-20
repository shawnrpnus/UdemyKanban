import { GET_PROJECTS, GET_PROJECT_BY_ID, DELETE_PROJECT } from "../actions/types";
import { Project } from "../models/Project";

const initialState = {
	//initialState of the project attribute in the global redux store (defined in index.ts)
	projects: [],
	project: {}
};

// const initialState: Array<Project> = [];

interface Action {
	type: string;
	projects: Project[];
	project: Project;
	projectIdentifier: string;
}

export default function(state = initialState, action: Action | any) {
	switch (action.type) {
		case GET_PROJECTS:
			console.log(action.projects);
			return {
				...state,
				projects: action.projects //override the projects field in state
			};
		case GET_PROJECT_BY_ID:
			return {
				...state,
				project: action.project
			};
		case DELETE_PROJECT:
			let projectIdentifierToDelete = action.projectIdentifier;
			let newProjects = state.projects.filter((project: Project) => {
				return project.projectIdentifier !== projectIdentifierToDelete;
			});
			return {
				...state,
				projects: newProjects
			};
		default:
			return state;
	}
}
