import {connect} from 'react-redux';
import * as _ from 'underscore';
import {IReactVaporState} from '../../ReactVapor';
import {ReduxUtils} from '../../utils/ReduxUtils';
import {IModalCompositeDispatchProps, IModalCompositeOwnProps, IModalCompositeProps, IModalCompositeStateProps, ModalComposite} from './ModalComposite';

const mapStateToProps = (state: IReactVaporState, ownProps: IModalCompositeOwnProps): IModalCompositeStateProps => {
    const modal = _.findWhere(state.modals, {id: ownProps.id});
    return {
        withReduxState: true,
        isDirty: modal && modal.isDirty,
    };
};

const mapDispatchToProps = (): IModalCompositeDispatchProps => ({});

export const ModalCompositeConnected: React.ComponentClass<IModalCompositeProps> =
    connect(mapStateToProps, mapDispatchToProps, ReduxUtils.mergeProps)(ModalComposite);
