import * as types from '../actions/types';


export function visible(state=false, action)
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

export function item(state=null, action)
{
	switch(action.type)
	{
		case types.CROPPER_OPEN:
			return action.value;

		default:
			return state;
	}
}