import * as React from 'react';
import * as _ from 'underscore';
import {UUID} from '../../../utils/UUID';
import {IFlatSelectOptionProps} from '../../flatSelect/FlatSelectOption';
import {IItemBoxProps} from '../../itemBox/ItemBox';
import {
    SingleSelectWithFilter,
    SingleSelectWithPredicate,
    SingleSelectWithPredicateAndFilter,
} from '../SelectComponents';
import {SingleSelectConnected} from '../SingleSelectConnected';

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

export interface ISingleSelectExamplesState {
    first: IItemBoxProps[];
    second: IItemBoxProps[];
    hoc: IItemBoxProps[];
    lotsOfValues: IItemBoxProps[];
}

export class SingleSelectExamples extends React.Component<{}, ISingleSelectExamplesState> {
    constructor() {
        super();

        const second = _.map(defaultItems, (item) => _.clone(item));
        second[0].selected = true;

        const hoc = _.map(defaultItems, (item) => _.extend({}, item, {append: {content: () => <span className='text-medium-grey ml1'>{item.value}</span>}}));
        hoc[0].selected = true;

        const lotsOfValues = _.map(_.range(1000), (i: number) => ({displayValue: `test ${i}`, value: `${i}`}));

        this.state = {
            first: _.clone(defaultItems),
            second,
            hoc,
            lotsOfValues,
        };
    }

    render() {
        return (
            <div>
                <h1>Single Select</h1>
                <div className='form-group'>
                    <label className='form-control-label'>A Simple Single Select</label>
                    <br />
                    <SingleSelectConnected id={UUID.generate()} items={this.state.first} />
                </div>
                <div className='form-group'>
                    <label className='form-control-label'>A Single Select With Filter</label>
                    <br />
                    <SingleSelectWithFilter id={UUID.generate()} items={this.state.hoc} />
                </div>
                <div className='form-group'>
                    <label className='form-control-label'>A Single Select With Filter that only match display value</label>
                    <br />
                    <SingleSelectWithFilter id={UUID.generate()} items={this.state.hoc} matchFilter={(filter: string, item: IItemBoxProps) => item.displayValue.indexOf(filter) !== -1} />
                </div>
                <div className='form-group'>
                    <label className='form-control-label'>A Single Select With Predicates</label>
                    <br />
                    <SingleSelectWithPredicate id={UUID.generate()} items={this.state.hoc} options={defaultFlatSelectOptions} matchPredicate={(p: string, i: IItemBoxProps) => this.matchPredicate(p, i)} />
                </div>
                <div className='form-group'>
                    <label className='form-control-label'>A Single Select With Filter and Predicates</label>
                    <br />
                    <SingleSelectWithPredicateAndFilter
                        id={UUID.generate()}
                        items={this.state.hoc}
                        options={defaultFlatSelectOptions}
                        matchPredicate={(p: string, i: IItemBoxProps) => this.matchPredicate(p, i)}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-control-label'>A Single Select With Filter and Predicates And Lots Of Values</label>
                    <br />
                    <SingleSelectWithPredicateAndFilter
                        id={UUID.generate()}
                        items={this.state.lotsOfValues}
                        options={defaultFlatSelectOptions}
                        matchPredicate={(p: string, i: IItemBoxProps) => this.matchPredicate(p, i)}
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