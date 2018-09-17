import * as React from 'react';
import * as s from 'underscore.string';
import {callIfDefined} from '../../utils/FalsyValuesUtils';
import {IDispatch, ReduxConnect} from '../../utils/ReduxUtils';
import {closeModal} from './ModalActions';
import {ModalCompositeConnected} from './ModalCompositeConnected';

export interface IModalDirtyPossibleProps {
    modalDirtyId?: string;
    isDirty?: boolean;
}

export interface IModalDirtyOwnProps {
    id: string;
    parentModalId: string;
    title: string;
    message: React.ReactNode;
    confirmLabel: string;
    cancelLabel: string;
}

export interface IModalDirtyDispatchProps {
    onConfirm?: () => void;
    onCancel?: () => void;
}

export interface IModalDirtyProps extends IModalDirtyOwnProps, IModalDirtyDispatchProps {}

export const mapDispatchToProps = (dispatch: IDispatch, ownProps: IModalDirtyOwnProps): IModalDirtyDispatchProps => ({
    onConfirm: () => [ownProps.id, ownProps.parentModalId].forEach((modalId) => dispatch(closeModal(modalId))),
    onCancel: () => dispatch(closeModal(ownProps.id)),
});

@ReduxConnect(undefined, mapDispatchToProps)
export class ModalDirtyConnected extends React.Component<IModalDirtyProps> {
    render() {
        return (
            <ModalCompositeConnected
                id={this.props.id}
                title={s.titleize(this.props.title)}
                classes={['mod-prompt']}
                modalHeaderClasses={['mod-confirmation']}
                modalBodyChildren={this.props.message}
                modalFooterChildren={
                    <span>
                        <button className='btn mod-primary' onClick={() => callIfDefined(this.props.onConfirm)}>{this.props.confirmLabel}</button>
                        <button className='btn' onClick={() => callIfDefined(this.props.onCancel)}>{this.props.cancelLabel}</button>
                    </span>
                }
                modalBodyClasses={['mod-header-padding', 'mod-form-top-bottom-padding']}
            />
        );
    }
}
