import { GET_PROJECTS } from "../actions/types";

const initialState = {
	//initialState of the project attribute in the global redux store (defined in index.ts)
	projects: [],
	project: {}
};

// const initialState: Array<Project> = [];

interface Action {
	type: string;
	projects: any;
}

export default function(state = initialState, action: Action) {
	switch (action.type) {
		case GET_PROJECTS:
			console.log(action.projects);
			return {
				...state,
				projects: action.projects //override the projects field in state
			};

		default:
			return state;
	}
}
