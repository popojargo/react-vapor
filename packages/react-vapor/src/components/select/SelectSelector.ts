import {createSelector} from 'reselect';
import * as _ from 'underscore';

import {IReactVaporState} from '../../ReactVapor';
import {convertStringListToItemsBox} from '../../reusableState/customList/StringListReducers';
import {MatchFilter} from '../../utils/FilterUtils';
import {DropSelectors} from '../drop/redux/DropReducers';
import {FilterBoxSelectors} from '../filterBox/FilterBoxSelectors';
import {IItemBoxProps} from '../itemBox/ItemBox';
import {IListBoxState} from '../listBox/ListBoxReducers';
import {ISelectWithFilterProps} from './hoc/SelectWithFilter';
import {IMultiSelectProps} from './MultiSelectConnected';
import {ISelectProps, SelectConnected} from './SelectConnected';

const getListState = (state: IReactVaporState, ownProps: ISelectProps): string[] =>
    state.selectWithFilter && state.selectWithFilter[ownProps.id] ? state.selectWithFilter[ownProps.id].list : [];

const getListBox = (state: IReactVaporState, ownProps: ISelectProps): Partial<IListBoxState> =>
    _.findWhere(state.listBoxes, {id: ownProps.id}) || {};

const getItems = (state: IReactVaporState, ownProps: ISelectProps): IItemBoxProps[] => ownProps.items || [];

const itemsWithFilterCombiner = (
    items: IItemBoxProps[],
    filterText: string,
    matchFilter: MatchFilter
): IItemBoxProps[] =>
    _.map(items, (item: IItemBoxProps) => ({...item, hidden: !matchFilter(filterText, item) || !!item.hidden}));

const getItemsWithFilter: (
    state: IReactVaporState,
    ownProps: ISelectWithFilterProps
) => IItemBoxProps[] = createSelector(
    getItems,
    (state: IReactVaporState, ownProps: ISelectWithFilterProps) =>
        FilterBoxSelectors.getFilterText(state, {id: ownProps.id}),
    (state: IReactVaporState, ownProps: ISelectWithFilterProps) =>
        FilterBoxSelectors.getMatchFilter(state, {matchFilter: ownProps.matchFilter}),
    itemsWithFilterCombiner
);

const customItemsCombiner = (items: IItemBoxProps[], listState: string[]): IItemBoxProps[] => {
    const valueToRemove: string[] = _.map(items, (item: IItemBoxProps) => item.value);
    return convertStringListToItemsBox(_.difference(listState, valueToRemove), {hidden: true, selected: true});
};

const getCustomItems: (state: IReactVaporState, ownProps: ISelectWithFilterProps) => IItemBoxProps[] = createSelector(
    [getItems, getListState],
    customItemsCombiner
);

const getCustomItemsWithFilter: (state: IReactVaporState, ownProps: ISelectProps) => IItemBoxProps[] = createSelector(
    getItemsWithFilter,
    getCustomItems,
    (filteredItems: IItemBoxProps[], customItems: IItemBoxProps[]) => [...filteredItems, ...customItems]
);

const getServerFilteredItems = createSelector(
    getItems,
    getCustomItems,
    (serverSideProcessedItems, customValuesFiltered) => [...serverSideProcessedItems, ...customValuesFiltered]
);

const listBoxSelectedCombiner = (listBox: IListBoxState): string[] =>
    listBox && listBox.selected ? listBox.selected : [];

const getListBoxSelected: (state: IReactVaporState, ownProps: ISelectProps) => string[] = createSelector(
    getListBox,
    listBoxSelectedCombiner
);

const getListBoxActive: (state: IReactVaporState, ownProps: ISelectProps) => number = createSelector(
    getListBox,
    (listBox: IListBoxState) => listBox.active
);

const getSelectOpened = (state: IReactVaporState, ownProps: ISelectProps) =>
    DropSelectors.isOpen(state, {id: ownProps.id, groupId: SelectConnected.DropGroup});

const multiSelectSelectedValuesCombiner = (listBoxSelected: string[], listState: string[]): string[] =>
    _.uniq([...listBoxSelected, ...listState]);

const getMultiSelectSelectedValues: (state: IReactVaporState, ownProps: IMultiSelectProps) => string[] = createSelector(
    getListBoxSelected,
    getListState,
    multiSelectSelectedValuesCombiner
);

export const SelectSelector = {
    getListState,
    getListBox,
    getItems,
    getListBoxSelected,
    getListBoxActive,
    getSelectOpened,
    getCustomItemsWithFilter,
    getMultiSelectSelectedValues,
    getServerFilteredItems,
};

export const SelectCombiners = {
    listBoxSelectedCombiner,
    customItemsCombiner,
    itemsWithFilterCombiner,
};
