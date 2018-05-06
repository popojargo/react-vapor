import {ReactWrapper} from 'enzyme';
import * as Redux from 'redux';
import thunk from 'redux-thunk';
import {noop} from 'underscore';

import {actionBarsReducer} from '../components/actions/ActionBarReducers';
import {itemFiltersReducer} from '../components/actions/filters/ItemFilterReducers';
import {autocompletesReducer} from '../components/autocomplete/AutocompleteReducers';
import {checkboxesReducer} from '../components/checkbox/CheckboxReducers';
import {groupableCheckboxesReducer} from '../components/checkbox/GroupableCheckboxReducers';
import {collapsibleContainersReducer} from '../components/collapsibleContainer/CollapsibleContainerReducers';
import {datePickersReducer} from '../components/datePicker/DatePickerReducers';
import {dropdownsReducer} from '../components/dropdown/DropdownReducers';
import {dropdownsSearchReducer} from '../components/dropdownSearch/DropdownSearchReducers';
import {facetsReducer} from '../components/facets/FacetReducers';
import {filterBoxesReducer} from '../components/filterBox/FilterBoxReducers';
import {flatSelectsReducer} from '../components/flatSelect/FlatSelectReducers';
import {flippablesReducer} from '../components/flippable/FlippableReducers';
import {promptsReducer} from '../components/inlinePrompt/InlinePromptReducers';
import {inputsReducer} from '../components/input/InputReducers';
import {lastUpdatedCompositeReducer} from '../components/lastUpdated/LastUpdatedReducers';
import {listBoxesReducer} from '../components/listBox/ListBoxReducers';
import {loadingsReducer} from '../components/loading/LoadingReducers';
import {modalsReducer} from '../components/modal/ModalReducers';
import {paginationCompositeReducer} from '../components/navigation/pagination/NavigationPaginationReducers';
import {perPageCompositeReducer} from '../components/navigation/perPage/NavigationPerPageReducers';
import {optionPickersReducer} from '../components/optionPicker/OptionPickerReducers';
import {optionsCyclesReducer} from '../components/optionsCycle/OptionsCycleReducers';
import {searchBarsReducer} from '../components/searchBar/SearchBarReducers';
import {selectCompositeReducer} from '../components/select/SelectReducers';
import {subNavigationsReducer} from '../components/subNavigation/SubNavigationReducers';
import {ISvgProps} from '../components/svg/Svg';
import {tabGroupsReducer} from '../components/tab/TabReducers';
import {tableHeaderCellsReducer} from '../components/tables/TableHeaderCellReducers';
import {tablesReducer} from '../components/tables/TableReducers';
import {tableRowsReducer} from '../components/tables/TableRowReducers';
import {textAreasReducer} from '../components/textarea/TextAreaReducers';
import {toastsContainerReducer} from '../components/toast/ToastReducers';
import {ITooltipProps} from '../components/tooltip/Tooltip';
import {IReactVaporState} from '../ReactVapor';
import {CommonActions, IReduxAction} from './ReduxUtils';

export interface IReactVaporTestState extends IReactVaporState {
    lastAction?: Redux.Action;
}

export class TestUtils {
    static buildStore() {
        const lastActionReducer = (state: IReactVaporTestState = null, action: Redux.Action): Redux.Action => {
            return action;
        };

        const reactVaporReducers = Redux.combineReducers<IReactVaporState>({
            autocompletes: autocompletesReducer,
            lastAction: lastActionReducer,
            lastUpdatedComposite: lastUpdatedCompositeReducer,
            filters: filterBoxesReducer,
            facets: facetsReducer,
            paginationComposite: paginationCompositeReducer,
            perPageComposite: perPageCompositeReducer,
            loadings: loadingsReducer,
            listBoxes: listBoxesReducer,
            prompts: promptsReducer,
            actionBars: actionBarsReducer,
            dropdowns: dropdownsReducer,
            dropdownSearch: dropdownsSearchReducer,
            flatSelect: flatSelectsReducer,
            rows: tableRowsReducer,
            tableHeaderCells: tableHeaderCellsReducer,
            optionsCycles: optionsCyclesReducer,
            optionPickers: optionPickersReducer,
            datePickers: datePickersReducer,
            itemFilters: itemFiltersReducer,
            modals: modalsReducer,
            selects: selectCompositeReducer,
            subNavigations: subNavigationsReducer,
            tabs: tabGroupsReducer,
            toastContainers: toastsContainerReducer,
            tables: tablesReducer,
            checkboxes: checkboxesReducer,
            collapsibleContainers: collapsibleContainersReducer,
            inputs: inputsReducer,
            searchBars: searchBarsReducer,
            flippables: flippablesReducer,
            groupableCheckboxes: groupableCheckboxesReducer,
            textAreas: textAreasReducer,
        });

        const reactVapor = (state: IReactVaporTestState, action: Redux.Action) => {
            state = action.type === CommonActions.clearState ? undefined : state;
            return reactVaporReducers(state, action as any);
        };

        return Redux.createStore(reactVapor, Redux.applyMiddleware(thunk));
    }

    static randomDate() {
        return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
    }

    /**
     * Hack to make sure the enzyme wrapper has been updated after a state or prop change.
     *
     * Because of the new version of enzyme (v3) wrappers are now immutable so we must call wrapper.update() after a change,
     * but it doesn't seem to work as advertised. See https://github.com/airbnb/enzyme/issues/1153 and https://github.com/airbnb/enzyme/issues/1229
     */
    static buildRefreshFunction = (refresh: (wrapper: ReactWrapper<any, any>) => void) => (wrapper: ReactWrapper<any, any>, exec = noop) => {
        exec();
        wrapper.update();
        refresh(wrapper);
    }

    /**
     * Hack to safely dispatch an action while making sure the enzyme wrapper is refreshed afterward.
     *
     * Because of the new version of enzyme (v3) wrappers are now immutable so we must call wrapper.update() after a change,
     * but it doesn't seem to work as advertised. See https://github.com/airbnb/enzyme/issues/1153 and https://github.com/airbnb/enzyme/issues/1229
     */
    static buildSafeDispatchFunction = (
        store: Redux.Store<any>,
        wrapper: ReactWrapper<any, any>,
        refreshFunction: (wrapper: ReactWrapper<any, any>, exec?: () => void) => void,
    ) => (action: IReduxAction<any>) => {
        refreshFunction(wrapper, () => {
            store.dispatch(action);
        });
    }
}

export const defaultSvgProps: ISvgProps = {
    svgName: 'domain-google',
    svgClass: 'icon mod-2x',
};

export const defaultTooltipProps: ITooltipProps = {
    title: 'default tooltip description',
    placement: 'bottom',
    container: 'body',
};
