import {IReduxAction} from '../../utils/ReduxUtils';

export interface IModalActionPayload {
    id?: string;
    ids?: string[];
    isOpened?: boolean;
    isDirty?: boolean;
}

export const ModalAction = {
    openModal: 'OPEN_MODAL',
    setDirtyModal: 'SET_DIRTY_MODAL',
    addModal: 'ADD_MODAL',
    removeModal: 'REMOVE_MODAL',
    closeModals: 'CLOSE_MODALS',
};

export const closeModal = (id: string): IReduxAction<IModalActionPayload> => ({
    type: ModalAction.closeModals,
    payload: {
        ids: [id],
    },
});

export const openModal = (id: string): IReduxAction<IModalActionPayload> => ({
    type: ModalAction.openModal,
    payload: {
        id,
    },
});

export const setDirtyModal = (id: string, isDirty: boolean): IReduxAction<IModalActionPayload> => ({
    type: ModalAction.setDirtyModal,
    payload: {
        id,
        isDirty,
    },
});

export const addModal = (id: string, isOpened?: boolean): IReduxAction<IModalActionPayload> => ({
    type: ModalAction.addModal,
    payload: {
        id,
        isOpened,
    },
});

export const removeModal = (id: string): IReduxAction<IModalActionPayload> => ({
    type: ModalAction.removeModal,
    payload: {
        id,
    },
});

export const closeModals = (ids: string[]): IReduxAction<IModalActionPayload> => ({
    type: ModalAction.closeModals,
    payload: {
        ids,
    },
});
