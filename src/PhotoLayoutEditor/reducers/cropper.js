import { combineReducers } from 'redux';
import * as types from '../actions/types';


const initialOptions = {
	image: null,
	color: '#fff',
	imageResize: false,
	style: null,
};


function visible(state=false, action)
{
	switch(action.type)
	{
		case types.CROPPER_OPEN:
			return true;

		case types.CROPPER_CLOSE:
			return false;

		default:
			return state;
	}
}

function setting(state=initialOptions, action)
{
	switch(action.type)
	{
		case types.CROPPER_OPEN:
			return {
				...action.value
			};

		default:
			return state;
	}
}


export default combineReducers({
	visible,
	setting,
});