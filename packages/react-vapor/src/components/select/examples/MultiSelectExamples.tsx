import * as React from 'react';
import * as _ from 'underscore';

import {getReactNodeTextContent} from '../../../utils/JSXUtils';
import {UUID} from '../../../utils/UUID';
import {IFlatSelectOptionProps} from '../../flatSelect/FlatSelectOption';
import {IItemBoxProps} from '../../itemBox/ItemBox';
import {
    MultiSelectWithFilter,
    MultiSelectWithPredicate,
    MultiSelectWithPredicateAndFilter,
} from '../hoc/SelectComponents';
import {MultiSelectConnected} from '../MultiSelectConnected';

const defaultItems: IItemBoxProps[] = [
    {displayValue: 'Test', value: '0'},
    {displayValue: 'Test One', value: '1'},
    {displayValue: 'Disabled', value: 'disabled', disabled: true},
    {displayValue: 'Three', value: '3'},
    {displayValue: 'Four', value: '4'},
    {displayValue: 'Five', value: '5'},
    {displayValue: 'Six', value: '6'},
    {displayValue: 'Seven', value: '7'},
];

const defaultFlatSelectOptions: IFlatSelectOptionProps[] = [
    {id: UUID.generate(), option: {content: 'All'}, selected: true},
    {id: UUID.generate(), option: {content: 'even'}},
    {id: UUID.generate(), option: {content: 'odd'}},
];

export interface IMultiSelectExamplesState {
    first: IItemBoxProps[];
    drag: IItemBoxProps[];
    second: IItemBoxProps[];
    hoc: IItemBoxProps[];
}

export class MultiSelectExamples extends React.Component<{}, IMultiSelectExamplesState> {
    constructor(props: {}, state: IMultiSelectExamplesState) {
        super(props, state);

        const second = _.map(defaultItems, (item) => _.clone(item));
        second[0].selected = true;

        const hoc = _.map(defaultItems, (item) =>
            _.extend({}, item, {append: {content: () => <span className="text-medium-grey ml1">{item.value}</span>}})
        );
        hoc[0].selected = true;

        this.state = {
            first: _.clone(defaultItems),
            drag: _.clone(defaultItems),
            second,
            hoc,
        };
    }

    render() {
        return (
            <div className="mb2">
                <h1>Multi Select</h1>
                <div className="form-group">
                    <label className="form-control-label">A Simple Multi Select without items</label>
                    <br />
                    <MultiSelectConnected id={UUID.generate()} items={[]} />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Simple Multi Select with only one items</label>
                    <br />
                    <MultiSelectConnected id={UUID.generate()} items={[{value: 'Single Item'}]} />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select with filter, disabled</label>
                    <br />
                    <MultiSelectWithFilter id={UUID.generate()} items={[{value: 'Single Item'}]} disabled />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Simple Multi Select with Custom Strings</label>
                    <br />
                    <MultiSelectConnected
                        id={UUID.generate()}
                        items={this.state.first}
                        placeholder="Select something"
                        deselectAllTooltipText="Remove all"
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Sortable Multi Select with Custom Strings</label>
                    <br />
                    <MultiSelectConnected
                        id={UUID.generate()}
                        items={this.state.first}
                        placeholder="Select something"
                        deselectAllTooltipText="Remove all"
                        sortable
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select With Filter</label>
                    <br />
                    <MultiSelectWithFilter id={UUID.generate()} items={this.state.hoc} />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select With Filter and Custom Values</label>
                    <br />
                    <MultiSelectWithFilter id={UUID.generate()} items={this.state.hoc} customValues />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select With Filter, Custom Values and no items</label>
                    <br />
                    <MultiSelectWithFilter id={UUID.generate()} items={[]} customValues />
                </div>
                <div className="form-group">
                    <label className="form-control-label">
                        A Multi Select With Filter, Custom Values and list of items selectable
                    </label>
                    <br />
                    <MultiSelectWithFilter id={UUID.generate()} items={[{value: 'a'}, {value: 'b'}]} customValues />
                </div>
                <div className="form-group">
                    <label className="form-control-label">
                        A Multi Select With Filter and list of items selectable
                    </label>
                    <br />
                    <MultiSelectWithFilter id={UUID.generate()} items={[{value: 'a'}, {value: 'b'}]} />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select With Filter and default list</label>
                    <br />
                    <MultiSelectWithFilter
                        id={UUID.generate()}
                        defaultCustomValues={['c', 'd']}
                        items={[{value: 'a'}, {value: 'b'}]}
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">
                        A Multi Select With Filter, default list and Custom Values{' '}
                    </label>
                    <br />
                    <MultiSelectWithFilter
                        id={UUID.generate()}
                        defaultCustomValues={['c', 'd']}
                        items={[{value: 'a'}, {value: 'b'}]}
                        customValues
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">
                        A Multi Select With Filter that only match display value
                    </label>
                    <br />
                    <MultiSelectWithFilter
                        id={UUID.generate()}
                        items={this.state.hoc}
                        matchFilter={(filter: string, item: IItemBoxProps) =>
                            getReactNodeTextContent(item.displayValue).indexOf(filter) !== -1
                        }
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select With Predicates</label>
                    <br />
                    <MultiSelectWithPredicate
                        id={UUID.generate()}
                        items={this.state.hoc}
                        options={defaultFlatSelectOptions}
                        matchPredicate={(p: string, i: IItemBoxProps) => this.matchPredicate(p, i)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select With 500px width</label>
                    <br />
                    <MultiSelectConnected
                        id={UUID.generate()}
                        items={this.state.hoc}
                        multiSelectStyle={{width: '500px'}}
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select with width 100%</label>
                    <br />
                    <MultiSelectConnected
                        id={'test'}
                        items={this.state.hoc}
                        selectClasses="mod-width-100"
                        multiSelectStyle={{width: '100%'}}
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">A Multi Select With Filter and Predicates</label>
                    <br />
                    <MultiSelectWithPredicateAndFilter
                        id={UUID.generate()}
                        items={this.state.hoc}
                        options={defaultFlatSelectOptions}
                        matchPredicate={(p: string, i: IItemBoxProps) => this.matchPredicate(p, i)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">
                        A Multi Select With Filter, Predicate and Custom Values
                    </label>
                    <br />
                    <MultiSelectWithPredicateAndFilter
                        id={UUID.generate()}
                        items={this.state.hoc}
                        options={defaultFlatSelectOptions}
                        matchPredicate={(p: string, i: IItemBoxProps) => this.matchPredicate(p, i)}
                        customValues
                    />
                </div>
                <div className="form-group">
                    <label className="form-control-label">
                        A Multi Select With Filter, default list and Custom Values{' '}
                    </label>
                    <br />
                    <MultiSelectWithFilter
                        id={UUID.generate()}
                        defaultCustomValues={['b'.repeat(100)]}
                        items={[{value: 'a'.repeat(100)}]}
                        customValues
                    />
                </div>
            </div>
        );
    }

    private matchPredicate(predicate: string, item: IItemBoxProps) {
        const value = parseInt(item.value, 10);
        if (predicate === defaultFlatSelectOptions[0].id) {
            return true;
        } else if (predicate === defaultFlatSelectOptions[1].id) {
            return value % 2 === 0;
        } else if (predicate === defaultFlatSelectOptions[2].id) {
            return value % 2 === 1;
        } else {
            return true;
        }
    }
}
