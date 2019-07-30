import * as classNames from 'classnames';
import * as React from 'react';
import * as _ from 'underscore';

import {mod} from '../../utils/DataStructuresUtils';
import {callIfDefined} from '../../utils/FalsyValuesUtils';
import {IItemBoxProps, ItemBox} from '../itemBox/ItemBox';

export interface IListBoxOwnProps {
    noResultItem?: IItemBoxProps;
    classes?: string[];
    id?: string;
    multi?: boolean;
    items?: IItemBoxProps[];
    wrapItems?: (items: React.ReactNode) => React.ReactNode;
}

export interface IListBoxStateProps {
    selected?: string[];
    active?: number;
}

export interface IListBoxDispatchProps {
    onRender?: () => void;
    onDestroy?: () => void;
    onOptionClick?: (option: IItemBoxProps) => void;
}

export interface IListBoxProps extends IListBoxOwnProps, IListBoxStateProps, IListBoxDispatchProps {}

export class ListBox extends React.Component<IListBoxProps, {}> {
    static defaultProps: Partial<IListBoxProps> = {
        noResultItem: {
            value: 'No Items',
        },
        wrapItems: _.identity,
    };

    componentWillMount() {
        callIfDefined(this.props.onRender);
    }

    componentWillUnmount() {
        callIfDefined(this.props.onDestroy);
    }

    private getClasses(): string {
        return classNames('list-box bg-pure-white relative', this.props.classes);
    }

    protected getItems(): React.ReactNode {
        const shouldShow = (item: IItemBoxProps) =>
            !item.hidden && (!this.props.multi || !_.contains(this.props.selected, item.value));
        const visibleLength = _.filter(this.props.items, (item: IItemBoxProps) => shouldShow(item) && !item.disabled)
            .length;

        let index = 0;
        let activeSet = false;
        const items = _.chain(this.props.items)
            .filter(shouldShow)
            .map((item: IItemBoxProps) => {
                let active = false;
                if (!item.disabled) {
                    if (this.props.active === null) {
                        active = _.contains(this.props.selected, item.value);
                    } else {
                        active = mod(this.props.active, visibleLength) === index;
                    }
                    activeSet = active || activeSet;
                    index++;
                }
                return {...item, active};
            })
            .map((item: IItemBoxProps) => {
                let active = item.active;
                if (!item.disabled && activeSet === false) {
                    active = true;
                    activeSet = true;
                }
                return {...item, active};
            })
            .map((item: IItemBoxProps) => (
                <ItemBox
                    key={item.value}
                    {...item}
                    onOptionClick={(option: IItemBoxProps) => this.onSelectItem(item)}
                    selected={_.contains(this.props.selected, item.value)}
                />
            ))
            .value();

        const emptyItem = (
            <ItemBox
                {...this.props.noResultItem}
                classes={[classNames('multi-line', this.props.noResultItem.classes)]}
            />
        );

        return _.isEmpty(items) ? emptyItem : items;
    }

    render() {
        return (
            <ul className={this.getClasses()} id={this.props.id}>
                {this.props.wrapItems(this.getItems())}
            </ul>
        );
    }

    private onSelectItem(item: IItemBoxProps) {
        if (!item.disabled) {
            callIfDefined(this.props.onOptionClick, item);
            callIfDefined(item.onOptionClick, item);
        }
    }
}
