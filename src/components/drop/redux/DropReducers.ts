import {IReactVaporState} from '../../../ReactVapor';
import {IReduxAction} from '../../../utils/ReduxUtils';
import {DefaultGroups, DropReducerActions, IDropPayload} from './DropActions';

export interface IDropState {
    [group: string]: {
        id: string,
        isOpen: boolean,
    };
}

export const dropInitialState: IDropState = {[DefaultGroups.default]: {id: undefined, isOpen: false}};

export const dropReducer = (
    state: IDropState = dropInitialState,
    action: IReduxAction<IDropPayload>,
): IDropState => {
    switch (action.type) {
        case DropReducerActions.toggle:
            const group = state[action.payload.group];
            if (group && group.id === action.payload.id) {
                if (action.payload.id === group.id) {
                    return {
                        ...state,
                        [action.payload.group]: {
                            ...group,
                            isOpen: !group.isOpen,
                        },
                    };
                }

                return {
                    ...state,
                    [action.payload.group]: {
                        ...group,
                    },
                };
            }
            return {
                ...state,
                [action.payload.group]: {
                    id: action.payload.id,
                    isOpen: action.payload.isOpen,
                },
            };
        default:
            return state;
    }
};

const getDrop = (state: IReactVaporState, {group}: {group: string}) => state.drop && state.drop[group] || undefined;

const isDropOpen = (state: IReactVaporState, {id, group}: {id: string, group: string}): boolean => {
    const drop = getDrop(state, {group});
    return drop && drop.id === id ? drop.isOpen : false;
};

export const DropSelectors = {
    isOpen: isDropOpen,
    get: getDrop,
};