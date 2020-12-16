import { combineReducers } from 'redux';
import newFeed , { NewFeedState } from './new'
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
    readonly newFeed: NewFeedState;
}

const rootReducer = combineReducers<IRootState>({
    newFeed,
});

export default rootReducer;
