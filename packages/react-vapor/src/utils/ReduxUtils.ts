import {connect} from 'react-redux';
import * as Redux from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {extend} from 'underscore';

import {IReactVaporState} from '../ReactVapor';

export type IThunkAction<R = any, S extends IReactVaporState = IReactVaporState> = ThunkAction<
    R,
    S,
    any,
    IReduxAction<any>
>;
export type IDispatch<S extends IReactVaporState = IReactVaporState> = ThunkDispatch<S, any, IReduxAction<any>>;

export class ReduxUtils {
    static mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
        return extend({}, stateProps, dispatchProps, ownProps);
    }

    // Default MergeProps by react-redux
    // https://github.com/reduxjs/react-redux/blob/master/docs/api.md
    static defaultMergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
        return extend({}, ownProps, stateProps, dispatchProps);
    }
}

export const CommonActions = {
    clearState: 'CLEAR_STATE',
};

export const clearState = (): Redux.Action => ({
    type: CommonActions.clearState,
});

/* @deprecated use react-redux connect instead */
export function ReduxConnect(
    mapStateToProps?: any,
    mapDispatchToProps?: any,
    mergeProps?: any,
    options?: any
): (target: any) => any {
    return (target) =>
        connect(
            mapStateToProps,
            mapDispatchToProps,
            mergeProps,
            options
        )(target) as any;
}

export interface BasePayload {
    id: string;
}

export interface IReduxAction<T = {}> extends Redux.Action {
    type: string;
    payload?: T;
}

export interface IReduxProps {
    dispatch?: (
        action: IReduxAction<any> | JQueryDeferred<any> | JQueryXHR | ((dispatch: Redux.Dispatch<any>) => void)
    ) => void;
}

export interface IReduxStatePossibleProps {
    withReduxState?: boolean;
}
