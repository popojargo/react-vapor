import * as classNames from 'classnames';
import * as React from 'react';
import {keys} from 'ts-transformer-keys';
import * as _ from 'underscore';

import {WithServerSideProcessingProps} from '../../hoc/withServerSideProcessing/withServerSideProcessing';
import {IReactVaporState} from '../../ReactVapor';
import {callIfDefined} from '../../utils/FalsyValuesUtils';
import {ConfigSupplier, HocUtils} from '../../utils/HocUtils';
import {ReduxConnect} from '../../utils/ReduxUtils';
import {IItemBoxProps} from '../itemBox/ItemBox';
import {SelectSelector} from '../select/SelectSelector';
import {SingleSelectConnected} from '../select/SingleSelectConnected';
import * as styles from './styles/TableWithPredicates.scss';
import {ITableHOCOwnProps} from './TableHOC';
import {TableHOCUtils} from './TableHOCUtils';

export interface ITableWithPredicateConfig extends WithServerSideProcessingProps {
    id: string;
    values: IItemBoxProps[];
    prepend?: React.ReactNode;
    matchPredicate?: (predicate: string, datum: any) => boolean;
}

export interface ITableWithPredicateStateProps {
    predicate: string;
}

export interface ITableWithPredicateProps
    extends Partial<ITableWithPredicateStateProps>,
        ITableHOCOwnProps,
        WithServerSideProcessingProps {}

const TableWithPredicatePropsToOmit = keys<ITableWithPredicateStateProps>();

const defaultMatchPredicate = (predicate: string, datum: any) =>
    !predicate || _.some(_.values(datum), (value: string) => value === predicate);

type TableWithPredicateComponent = React.ComponentType<ITableWithPredicateProps>;

export const tableWithPredicate = (supplier: ConfigSupplier<ITableWithPredicateConfig>) => (
    Component: TableWithPredicateComponent
): TableWithPredicateComponent => {
    const config = HocUtils.supplyConfig(supplier);

    const mapStateToProps = (
        state: IReactVaporState,
        ownProps: ITableWithPredicateProps
    ): ITableWithPredicateStateProps | ITableHOCOwnProps => {
        const predicate = SelectSelector.getListBoxSelected(state, {
            id: TableHOCUtils.getPredicateId(ownProps.id, config.id),
        })[0];
        const matchPredicate = config.matchPredicate || defaultMatchPredicate;
        const predicateData = () =>
            !ownProps.isServer && !config.isServer && predicate
                ? _.filter(ownProps.data, (datum: any) => matchPredicate(predicate, datum))
                : ownProps.data;
        return {
            predicate: predicate,
            data: ownProps.data && predicateData(),
        };
    };

    @ReduxConnect(mapStateToProps)
    class TableWithPredicate extends React.Component<ITableWithPredicateProps> {
        componentDidUpdate(prevProps: ITableWithPredicateProps) {
            if (prevProps.predicate !== this.props.predicate) {
                callIfDefined(this.props.onUpdate);
            }
        }

        render() {
            const key = TableHOCUtils.getPredicateId(this.props.id, config.id);
            const actions = this.props.actions || [];
            const predicateAction = (
                <div
                    className={classNames('coveo-table-actions predicate-filters', styles.tablePredicateFilters)}
                    key={key}
                >
                    <SingleSelectConnected id={key} items={config.values} buttonPrepend={config.prepend} />
                </div>
            );

            const newActions = [...actions, predicateAction];
            const newProps = _.omit(this.props, [...TableWithPredicatePropsToOmit]);
            return (
                <Component {...newProps} actions={newActions}>
                    {this.props.children}
                </Component>
            );
        }
    }

    return TableWithPredicate;
};
