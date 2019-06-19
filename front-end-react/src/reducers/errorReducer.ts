import { GET_ERRORS } from "../actions/types";

const initialState = {};

interface Action {
	type: string;
	errorObj: Object;
}

export default function(state = initialState, action: Action | any) {
	switch (action.type) {
		case GET_ERRORS:
			return action.errorObj; //payload is a key:value mapping of fieldName:errorMessage
		case "CLEAR":
			return {};
		default:
			return state;
	}
}
