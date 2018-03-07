import { IActionOptions } from './components/actions/Action';
import { IActionBarState } from './components/actions/ActionBarReducers';
import { IItemFilterState } from './components/actions/filters/ItemFilterReducers';
import { ICheckboxState } from './components/checkbox/CheckboxReducers';
import { ICollapsibleContainerState } from './components/collapsibleContainer/CollapsibleContainerReducers';
import { IDatePickerState } from './components/datePicker/DatePickerReducers';
import { IDropdownState } from './components/dropdown/DropdownReducers';
import { IDropdownOption } from './components/dropdownSearch/DropdownSearch';
import { IDropdownSearchState } from './components/dropdownSearch/DropdownSearchReducers';
import { IFacet } from './components/facets/Facet';
import { IFacetState } from './components/facets/FacetReducers';
import { IFilterState } from './components/filterBox/FilterBoxReducers';
import { IFlatSelectState } from './components/flatSelect/FlatSelectReducers';
import { IInlinePromptOptions } from './components/inlinePrompt/InlinePrompt';
import { IPromptState } from './components/inlinePrompt/InlinePromptReducers';
import { IInputState } from './components/input/InputReducers';
import { ILastUpdatedState } from './components/lastUpdated/LastUpdatedReducers';
import { ILoadingState } from './components/loading/LoadingReducers';
import { IModalState } from './components/modal/ModalReducers';
import { IPaginationState } from './components/navigation/pagination/NavigationPaginationReducers';
import { IPerPageState } from './components/navigation/perPage/NavigationPerPageReducers';
import { IOptionPickerState } from './components/optionPicker/OptionPickerReducers';
import { IOptionsCycleState } from './components/optionsCycle/OptionsCycleReducers';
import { ISubNavigationState } from './components/subNavigation/SubNavigationReducers';
import { ITabGroupState } from './components/tab/TabReducers';
import { ITablePredicate } from './components/tables/Table';
import { ITableStateModifier } from './components/tables/TableActions';
import { ITableHeaderCellsState } from './components/tables/TableHeaderCellReducers';
import { ITableData, ITablesState } from './components/tables/TableReducers';
import { ITableRowState } from './components/tables/TableRowReducers';
import { IToastsState } from './components/toast/ToastReducers';

export interface IReactVaporState {
  lastUpdatedComposite?: ILastUpdatedState[];
  facets?: IFacetState[];
  filters?: IFilterState[];
  perPageComposite?: IPerPageState[];
  paginationComposite?: IPaginationState[];
  loadings?: ILoadingState[];
  prompts?: IPromptState[];
  actionBars?: IActionBarState[];
  dropdowns?: IDropdownState[];
  dropdownSearch?: IDropdownSearchState[];
  flatSelect?: IFlatSelectState[];
  rows?: ITableRowState[];
  optionsCycles?: IOptionsCycleState[];
  datePickers?: IDatePickerState[];
  optionPickers?: IOptionPickerState[];
  itemFilters?: IItemFilterState[];
  modals?: IModalState[];
  subNavigations?: ISubNavigationState[];
  tabs?: ITabGroupState[];
  toastContainers?: IToastsState[];
  tableHeaderCells?: ITableHeaderCellsState;
  tables?: ITablesState;
  checkboxes?: ICheckboxState[];
  inputs?: IInputState[];
  collapsibleContainers?: ICollapsibleContainerState[];
}

export interface IReduxActionsPayload {
  id?: string;
  ids?: string[];
  isCollapsible?: boolean;
  facet?: string;
  facetRow?: IFacet;
  filterText?: string;
  pageNb?: number;
  perPage?: number;
  options?: IInlinePromptOptions;
  actions?: IActionOptions[];
  currentOption?: number;
  color?: string;
  date?: Date;
  calendarId?: string;
  value?: string;
  isRange?: boolean;
  limit?: string;
  item?: string;
  label?: string;
  selected?: string;
  tableId?: string;
  isInError?: boolean;
  attributeToFormat?: string;
  attributeToSort?: string;
  initialTableData?: ITableData;
  initialPerPage?: number;
  tableStateModifier?: ITableStateModifier;
  totalEntries?: number;
  totalPages?: number;
  addedSelectedOption?: IDropdownOption;
  predicates?: ITablePredicate[];
  shouldResetPage?: boolean;
  valid?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}