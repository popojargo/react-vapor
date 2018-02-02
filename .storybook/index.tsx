import * as React from 'react';
import {Provider} from 'react-redux';
import {ReactVaporStore} from '../docs/ReactVaporStore';
import * as $ from 'jquery';
import '../docs/style.scss';
import 'coveo-styleguide/dist/css/CoveoStyleGuide.css';
import {storiesOf, addDecorator} from '@storybook/react';
import {UserFeedbackExample} from '../src/components/userFeedback/examples/UserFeedbackExample';
import {SyncFeedbackExample} from '../src/components/syncFeedback/examples/SyncFeedbackExample';
import {MembersExample} from '../docs/members-example/MembersExample';
import {LastUpdatedExamples} from '../src/components/lastUpdated/examples/LastUpdatedExamples';
import {LastUpdatedConnectedExamples} from '../src/components/lastUpdated/examples/LastUpdatedConnectedExamples';
import {LoadingExamples} from '../src/components/loading/LoadingExamples';
import {FilterBoxExamples} from '../src/components/filterBox/examples/FilterBoxExamples';
import {FilterBoxConnectedExamples} from '../src/components/filterBox/examples/FilterBoxConnectedExamples';
import {FacetConnectedExamples} from '../src/components/facets/examples/FacetConnectedExamples';
import {FacetExamples} from '../src/components/facets/examples/FacetExamples';
import {ModalConnectedExamples} from '../src/components/modal/examples/ModalConnectedExamples';
import {NavigationExamples} from '../src/components/navigation/examples/NavigationExamples';
import {NavigationConnectedExamples} from '../src/components/navigation/examples/NavigationConnectedExamples';
import {ActionBarExamples} from '../src/components/actions/examples/ActionBarExamples';
import {ActionBarConnectedExamples} from '../src/components/actions/examples/ActionBarConnectedExamples';
import {TableExamples} from '../src/components/tables/examples/TableExamples';
import {TableRowExamples} from '../src/components/tables/examples/TableRowExamples';
import {TableRowConnectedExamples} from '../src/components/tables/examples/TableRowConnectedExamples';
import {TableHeaderExamples} from '../src/components/tables/examples/TableHeaderExamples';
import {ItemFilterExamples} from '../src/components/actions/filters/examples/ItemFilterExamples';
import {ItemFilterConnectedExamples} from '../src/components/actions/filters/examples/ItemFilterConnectedExamples';
import {TableEmptyRowExamples} from '../src/components/tables/examples/TableEmptyRowExamples';
import {OptionsCycleExamples} from '../src/components/optionsCycle/examples/OptionsCycleExamples';
import {SubNavigationExamples} from '../src/components/subNavigation/examples/SubNavigationExamples';
import {SubNavigationConnectedExamples} from '../src/components/subNavigation/examples/SubNavigationConnectedExamples';
import {OptionsCycleConnectedExamples} from '../src/components/optionsCycle/examples/OptionsCycleConnectedExamples';
import {CalendarConnectedExamples} from '../src/components/calendar/examples/CalendarConnectedExamples';
import {DatePickerBoxExamples} from '../src/components/datePicker/examples/DatePickerBoxExamples';
import {DatesSelectionExamples} from '../src/components/datePicker/examples/DatesSelectionExamples';
import {DatesSelectionConnectedExamples} from '../src/components/datePicker/examples/DatesSelectionConnectedExamples';
import {DatePickerBoxConnectedExamples} from '../src/components/datePicker/examples/DatePickerBoxConnectedExamples';
import {DatePickerDropdownConnectedExamples} from '../src/components/datePicker/examples/DatePickerDropdownConnectedExamples';
import {DatePickerDropdownConnectedSingleDateExamples} from '../src/components/datePicker/examples/DatePickerDropdownConnectedSingleDateExamples';
import {ModalExamples} from '../src/components/modal/examples/ModalExamples';
import {TabsExamples} from '../src/components/tab/examples/TabConnectedExample';
import {ModalPromptExamples} from '../src/components/modalPrompt/exemples/ModalPromptExamples';
import {MultilineInputExamples} from '../src/components/multilineInput/examples/MultilineInputExamples';
import {TooltipExamples} from '../src/components/tooltip/examples/TooltipExamples';
import {ButtonExamples} from '../src/components/button/examples/ButtonExamples';
import {BlankSlateExample} from '../src/components/blankSlate/examples/BlankSlateExample';
import {ChosenSelectExamples} from '../src/components/chosen/examples/ChosenSelectExamples';
import {DropdownSearchExamples} from '../src/components/dropdownSearch/examples/DropdownSearchExamples';
import {ToastExamples} from '../src/components/toast/examples/ToastExamples';
import {ToastConnectedExamples} from '../src/components/toast/examples/ToastConnectedExamples';
import {RadioExamples} from '../src/components/radio/examples/RadioExamples';
import {ChildFormExamples} from '../src/components/childForm/examples/ChildFormExamples';
import {CheckboxExamples} from '../src/components/checkbox/examples/CheckboxExamples';
import {ContentExamples} from '../src/components/content/examples/ContentExamples';
import {ListBoxExamples} from '../src/components/listBox/examples/ListBoxExamples';
import {ItemBoxExamples} from '../src/components/itemBox/examples/ItemBoxExamples';
import {InputAndInputConnectedExamples} from '../src/components/input/examples/InputAndInputConnectedExamples';
import {LinkSvgExamples} from '../src/components/svg/examples/LinkSvgExamples';
import {SvgExamples} from '../src/components/svg/examples/SvgExamples';
import {TitleExamples} from '../src/components/title/examples/TitleExamples';
import {BreadcrumbsExamples} from '../src/components/breadcrumbs/examples/BreadcrumbsExamples';
import {BasicHeaderExamples} from '../src/components/headers/examples/BasicHeaderExamples';
import {BreadcrumbHeaderExample} from '../src/components/headers/examples/BreadcrumbHeaderExample';
import {FlatSelectExamples} from '../src/components/flatSelect/examples/FlatSelectExamples';
import {SliderExamples} from '../src/components/slider/examples/SliderExamples';
import {SideNavigationLoadingExample} from '../src/components/sideNavigation/examples/SideNavigationLoadingExample';
import {CheckboxConnectedExamples} from '../src/components/checkbox/examples/CheckboxConnectedExamples';
import {StepProgressBarExamples} from '../src/components/stepProgressBar/examples/StepProgressBarExamples';
import {LabeledValueExamples} from '../src/components/labeledValue/examples/LabeledValueExamples';
import {CollapsibleContainerExamples} from '../src/components/collapsibleContainer/examples/CollapsibleContainerExamples';
import {SplitLayoutExamples} from '../src/components/splitlayout/examples/SplitLayoutExamples';
import {TableWithDisabledRowsExamples} from '../src/components/tables/examples/TableDisabledRowsExamples';

// Force add class to body
$('body').addClass('coveo-styleguide');

addDecorator(story => (
  <Provider store={ReactVaporStore}>
    <div className='coveo-form m4'>{story()}</div>
  </Provider>
));

// Basic React Vapor stories
const componentGroups: any = {
  Buttons: {ButtonExamples},
  'Components/Header': {
    BasicHeaderExamples,
    BreadcrumbsExamples,
    BreadcrumbHeaderExample
  },
  'Components/Members': {MembersExample},
  'Components/Modals': {
    ModalExamples,
    ModalConnectedExamples,
    ModalPromptExamples,
  },
  'Components/Slider': {SliderExamples},
  'Components/Svg': {SvgExamples, LinkSvgExamples},
  'Components/Boxes': {
    ItemBoxExamples,
    ListBoxExamples
  },
  'Components/Tooltip': {TooltipExamples},
  'Components/Facets': {
    FacetExamples,
    FacetConnectedExamples
  },
  'Components/Blank Slate': {
    BlankSlateExample,
  },
  'Components/Toast': {
    ToastExamples,
    ToastConnectedExamples
  },
  'Components/FeedBack': {
    UserFeedbackExample,
    SyncFeedbackExample
  },
  'Components/Step Progress Bar': {
    StepProgressBarExamples,
  },
  'Form Controls/Selects': {
    FlatSelectExamples,
    DropdownSearchExamples,
    ChosenSelectExamples
  },
  'Form Controls/Last Updated': {
    LastUpdatedExamples,
    LastUpdatedConnectedExamples
  },
  'Form Controls/Loading': {LoadingExamples},
  'Form Controls/FilterBox': {
    FilterBoxExamples,
    FilterBoxConnectedExamples
  },
  'Form Controls/Options': {
    OptionsCycleExamples,
    OptionsCycleConnectedExamples,
  },
  'Form Controls/Radio': {
    RadioExamples,
  },
  'Form Controls/Labeled Value': {
    LabeledValueExamples
  },
  'Form Controls': {CollapsibleContainerExamples},
  'Form Controls/Inputs': {
    InputAndInputConnectedExamples,
    MultilineInputExamples,
  },
  'Form Controls/Checkboxes': {
    CheckboxExamples,
    CheckboxConnectedExamples,
  },
  'Form Controls/Date': {
    CalendarConnectedExamples,
    DatesSelectionExamples,
    DatesSelectionConnectedExamples,
    DatePickerBoxExamples,
    DatePickerBoxConnectedExamples,
    DatePickerDropdownConnectedExamples,
    DatePickerDropdownConnectedSingleDateExamples,
  },
  'Form Layouts': {
    ChildFormExamples,
    SplitLayoutExamples,
  },
  Navigation: {
    NavigationExamples,
    NavigationConnectedExamples,
    SubNavigationExamples,
    SubNavigationConnectedExamples,
    SideNavigationLoadingExample,
    TabsExamples
  },
  Tables: {
    TableExamples,
    TableWithDisabledRowsExamples,
  },
  'Tables/Header': {
    ActionBarExamples,
    ActionBarConnectedExamples,
    ItemFilterExamples,
    ItemFilterConnectedExamples,
    TableHeaderExamples,
  },
  'Tables/Rows': {
    TableRowExamples,
    TableRowConnectedExamples,
    TableEmptyRowExamples,
  },
  'Typography/Title': {TitleExamples},
  'Typography/Content': {ContentExamples},
};

// Make stories dynamically with the componentGroup object
for (const componentGroup in componentGroups) {
  for (const component in componentGroups[componentGroup]) {
    storiesOf(componentGroup, module).add(component, () => {
      const ReactComponent = componentGroups[componentGroup][component];
      return <ReactComponent />;
    });
  }
};
