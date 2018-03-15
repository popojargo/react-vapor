import * as React from 'react';
import * as _ from 'underscore';
import {IReactVaporState} from '../../ReactVapor';
import {ReduxConnect} from '../../utils/ReduxUtils';
import {FilterBoxConnected} from '../filterBox/FilterBoxConnected';
import {IItemBoxProps} from '../itemBox/ItemBox';
import {ISelectProps} from './SelectConnected';

export interface ISelectWithFilterProps extends ISelectProps {
  matchFilter?: (filterValue: string, item: IItemBoxProps) => boolean;
}

export const selectWithFilter = (Component: (React.ComponentClass<ISelectWithFilterProps> | React.StatelessComponent<ISelectWithFilterProps>)): React.ComponentClass<ISelectWithFilterProps> => {
  const defaultMatchFilter = (filterValue: string, item: IItemBoxProps) => {
    if (filterValue === '') {
      return true;
    }

    const regex = new RegExp(filterValue, 'gi');
    return regex.test(item.value) || regex.test(item.displayValue);
  };

  const mapStateToProps = (state: IReactVaporState, ownProps: ISelectWithFilterProps): Partial<ISelectProps> => {
    const filter = _.findWhere(state.filters, {id: ownProps.id});
    const filterValue = filter && filter.filterText || '';

    const items = _.map(ownProps.items, (item: IItemBoxProps) => {
      const visible = _.isUndefined(ownProps.matchFilter)
        ? defaultMatchFilter(filterValue, item)
        : ownProps.matchFilter(filterValue, item);

      return {...item, hidden: !visible || item.hidden};
    });

    return {
      items,
    };
  };

  @ReduxConnect(mapStateToProps)
  class WrappedComponent extends React.Component<ISelectWithFilterProps> {
    render() {
      return (
        <Component {...this.props}>
          {this.props.children}
          <FilterBoxConnected containerClasses={[!!this.props.children ? 'mt2' : '']} id={this.props.id}/>
        </Component>
      );
    }
  }

  return WrappedComponent;
};
