import { GET_ERRORS } from "../actions/types";

const initialState = {};

interface Action {
	type: string;
	payload: any;
}

export default function(state = initialState, action: Action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;

		default:
			return state;
	}
}
