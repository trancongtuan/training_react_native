import { NEW_FEED } from '../common/constants/new'
import { REQUEST, SUCCESS, FAILURE } from '../reducer/action-type';
const initialState = {
    count: 1
};

export type NewFeedState = Readonly<typeof initialState>;

// Reducer
export default (state: NewFeedState = initialState, action: any): NewFeedState => {
    switch (action.type) {
        case REQUEST(NEW_FEED.GET_NUMBER_NEW_FEED):
            return {
                ...state,
            };
        case FAILURE(NEW_FEED.GET_NUMBER_NEW_FEED):
            return {
                ...state,
            };

        case NEW_FEED.GET_NUMBER_NEW_FEED:
            return {
                ...state,
                count: action.payload
            };

        default:
            return state;
    }
};
