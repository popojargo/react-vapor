import * as classNames from 'classnames';
import * as React from 'react';
import {IItemBoxProps} from '../itemBox/ItemBox';
import {ListBox} from '../listBox/ListBox';
import {PopoverConnected} from '../popover/PopoverConnected';
import {Svg} from '../svg/Svg';
import {actionableItemContainer, actionableItemContent, actionableItemDots, actionableItemDotsWidthWithPadding} from './styles/ActionableItem.scss';

export interface IActionableItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    actions?: IItemBoxProps[];
}

export class ActionableItem extends React.Component<any> {
    static defaultProps: Partial<IActionableItemProps> = {
        actions: [],
    };

    render() {
        return (
            <div {...this.props}>
                <div className={classNames('actionable-item-content inline-block text-medium-blue border-color-medium-grey mod-border bg-pure-white', actionableItemContent, actionableItemContainer)}>
                    {this.props.children}
                </div>
                {
                    this.props.actions && this.props.actions.length
                        ? (
                            <PopoverConnected
                                id={this.props.id}
                                attachment='top right'
                                classPrefix='actionable-item'
                                className='show-on-top'
                                offset={`0 -${actionableItemDotsWidthWithPadding}`}
                            >
                                <div className={classNames('actionable-item-dots cursor-pointer inline-block mod-border-top mod-border-right border-color-medium-grey mod-border-bottom bg-pure-white', actionableItemDots, actionableItemContainer)}>
                                    <Svg svgName='more-append' svgClass='icon mod-12 fill-medium-blue' />
                                </div>
                                <ListBox items={this.props.actions} />
                            </PopoverConnected>
                        )
                        : null
                }
            </div>
        );
    }
}