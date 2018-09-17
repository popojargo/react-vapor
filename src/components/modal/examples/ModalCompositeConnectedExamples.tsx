import * as React from 'react';

import * as _ from 'underscore';
import {IReactVaporState} from '../../../ReactVapor';
import {IReduxAction, ReduxConnect} from '../../../utils/ReduxUtils';
import {Input} from '../../input/Input';
import {closeModal, IModalActionPayload, openModal, setDirtyModal} from '../ModalActions';
import {ModalCompositeConnected} from '../ModalCompositeConnected';
import {ModalDirtyConnected} from '../ModalDirtyConnected';

export interface IModalExamplesProps {
    isDirty?: boolean;
    openModal?: (id: string) => void;
    closeModal?: (id: string) => void;
    closeThirdModal?: (isDirty: boolean) => void;
    setIsDirty?: (id: string) => void;
}

const modalId: string = 'modal-composite-connected';
const secondModalId: string = 'second-modal-composite';
const insideModalId: string = 'inside-modal';
const thirdModalId: string = 'third-modal-composite';
const dirtyModalId: string = 'dirty-modal-composite';

const mapStateToProps = (state: IReactVaporState) => {
    const thirdModal = _.findWhere(state.modals, {id: thirdModalId});
    return {
        isDirty: thirdModal && thirdModal.isDirty,
    };
};

const mapDispatchToProps = (dispatch: (action: IReduxAction<IModalActionPayload>) => void): IModalExamplesProps => ({
    openModal: (id: string) => dispatch(openModal(id)),
    closeModal: (id: string) => dispatch(closeModal(id)),
    closeThirdModal: (isDirty: boolean) => {
        if (isDirty) {
            dispatch(openModal(dirtyModalId));
        } else {
            dispatch(closeModal(thirdModalId));
        }
    },
    setIsDirty: (id: string) => dispatch(setDirtyModal(id, true)),
});

@ReduxConnect(mapStateToProps, mapDispatchToProps)
export class ModalCompositeConnectedExamples extends React.Component<IModalExamplesProps, any> {

    openModal(id: string) {
        this.props.openModal(id);
    }

    closeModal(id: string) {
        this.props.closeModal(id);
    }

    closeThirdModal() {
        this.props.closeThirdModal(this.props.isDirty);
    }

    setIsDirty(id: string) {
        this.props.setIsDirty(id);
    }

    render() {
        return (
            <div>
                <div className='mt2'>
                    <label className='form-control-label'>Modal Composite Connected (initialize a modal with just one component)</label>
                    <div className='form-group'>
                        <button className='btn' onClick={() => this.openModal(modalId)}>Open Modal</button>
                        <ModalCompositeConnected
                            id={modalId}
                            title='Modal composite'
                            modalBodyChildren='The content of the modal'
                            modalFooterChildren={<button className='btn' onClick={() => this.closeModal(modalId)}>Close</button>}
                            modalBodyClasses={['mod-header-padding', 'mod-form-top-bottom-padding']}
                            docLink={{url: 'https://www.coveo.com', tooltip: 'Go to coveo.com'}}
                        />
                    </div>
                </div>
                <div className='mt2'>
                    <label className='form-control-label'>Modal Composite Connected with another modal inside</label>
                    <div className='form-group'>
                        <button className='btn' onClick={() => this.openModal(secondModalId)}>Open Modal</button>
                        <ModalCompositeConnected
                            id={secondModalId}
                            title='Modal composite'
                            modalBodyChildren={
                                <div>
                                    <button className='btn' onClick={() => this.openModal(insideModalId)}>Open inside modal</button>
                                    <ModalCompositeConnected
                                        id={insideModalId}
                                        title='Nested modal composite'
                                        modalBodyChildren='The content of the modal'
                                        modalFooterChildren={<button className='btn' onClick={() => this.closeModal(insideModalId)}>Close</button>}
                                        modalBodyClasses={['mod-header-padding', 'mod-form-top-bottom-padding']}
                                    />
                                </div>
                            }
                            modalFooterChildren={<button className='btn' onClick={() => this.closeModal(secondModalId)}>Close</button>}
                            modalBodyClasses={['mod-header-padding', 'mod-form-top-bottom-padding']}
                        />
                    </div>
                </div>
                <div className='mt2'>
                    <label className='form-control-label'>Modal Composite Connected with Dirty Modal</label>
                    <div className='form-group'>
                        <button className='btn' onClick={() => this.openModal(thirdModalId)}>Open Modal</button>
                        <ModalCompositeConnected
                            id={thirdModalId}
                            modalDirtyId={dirtyModalId}
                            title='Modal composite'
                            modalBodyChildren={
                                <div>
                                    <Input
                                        id='someid'
                                        labelTitle='Enter something to make the modal dirty, and close the modal.'
                                        onClick={() => this.props.setIsDirty(thirdModalId)}
                                    />
                                    <ModalDirtyConnected
                                        id={dirtyModalId}
                                        parentModalId={thirdModalId}
                                        title='The modal was dirty'
                                        message={
                                            <span>
                                                Confirm or cancel to checkout the behaviors. Or, take a look at <a href='https://www.coveo.com/en' target='_blank'>our amazing website</a>
                                            </span>
                                        }
                                        confirmLabel='Confirm'
                                        cancelLabel='Cancel'
                                    />
                                </div>
                            }
                            modalFooterChildren={<button className='btn' onClick={() => this.closeThirdModal()}>Close</button>}
                            modalBodyClasses={['mod-header-padding', 'mod-form-top-bottom-padding']}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
