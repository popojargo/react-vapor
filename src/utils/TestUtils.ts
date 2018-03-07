import * as Redux from 'redux';
import thunk from 'redux-thunk';
import { actionBarsReducer } from '../components/actions/ActionBarReducers';
import { itemFiltersReducer } from '../components/actions/filters/ItemFilterReducers';
import { checkboxesReducer } from '../components/checkbox/CheckboxReducers';
import { collapsibleContainersReducer } from '../components/collapsibleContainer/CollapsibleContainerReducers';
import { datePickersReducer } from '../components/datePicker/DatePickerReducers';
import { dropdownsReducer } from '../components/dropdown/DropdownReducers';
import { dropdownsSearchReducer } from '../components/dropdownSearch/DropdownSearchReducers';
import { facetsReducer } from '../components/facets/FacetReducers';
import { filterBoxesReducer } from '../components/filterBox/FilterBoxReducers';
import { flatSelectsReducer } from '../components/flatSelect/FlatSelectReducers';
import { promptsReducer } from '../components/inlinePrompt/InlinePromptReducers';
import { inputsReducer } from '../components/input/InputReducers';
import { lastUpdatedCompositeReducer } from '../components/lastUpdated/LastUpdatedReducers';
import { loadingsReducer } from '../components/loading/LoadingReducers';
import { modalsReducer } from '../components/modal/ModalReducers';
import { paginationCompositeReducer } from '../components/navigation/pagination/NavigationPaginationReducers';
import { perPageCompositeReducer } from '../components/navigation/perPage/NavigationPerPageReducers';
import { optionPickersReducer } from '../components/optionPicker/OptionPickerReducers';
import { optionsCyclesReducer } from '../components/optionsCycle/OptionsCycleReducers';
import { subNavigationsReducer } from '../components/subNavigation/SubNavigationReducers';
import { ISvgProps } from '../components/svg/Svg';
import { tabGroupsReducer } from '../components/tab/TabReducers';
import { tableHeaderCellsReducer } from '../components/tables/TableHeaderCellReducers';
import { tablesReducer } from '../components/tables/TableReducers';
import { tableRowsReducer } from '../components/tables/TableRowReducers';
import { toastsContainerReducer } from '../components/toast/ToastReducers';
import { ITooltipProps } from '../components/tooltip/Tooltip';
import { IReactVaporState } from '../ReactVapor';
import { CommonActions } from './ReduxUtils';

export interface IReactVaporTestState extends IReactVaporState {
  lastAction?: Redux.Action;
}

export class TestUtils {
  static buildStore() {
    const lastActionReducer = (state: IReactVaporTestState = null, action: Redux.Action): Redux.Action => {
      return action;
    };

    const reactVaporReducers = Redux.combineReducers<IReactVaporState>({
      lastAction: lastActionReducer,
      lastUpdatedComposite: lastUpdatedCompositeReducer,
      filters: filterBoxesReducer,
      facets: facetsReducer,
      paginationComposite: paginationCompositeReducer,
      perPageComposite: perPageCompositeReducer,
      loadings: loadingsReducer,
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
      subNavigations: subNavigationsReducer,
      tabs: tabGroupsReducer,
      toastContainers: toastsContainerReducer,
      tables: tablesReducer,
      checkboxes: checkboxesReducer,
      collapsibleContainers: collapsibleContainersReducer,
      inputs: inputsReducer,
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