import { Svg } from '../svg/Svg';
import * as React from 'react';


export interface ITableCollapsibleRowToggleProps extends React.ClassAttributes<TableCollapsibleRowToggle> {
  isExpanded: boolean;
}

export class TableCollapsibleRowToggle extends React.Component<ITableCollapsibleRowToggleProps, any> {

  render() {
    let collapseState = this.props.isExpanded ? 'expanded' : 'collapsed';

    return (
      <td>
        <span data-collapse-state={collapseState}>
          <Svg svgName='arrowBottom' className='state-collapsed' svgClass='icon' />
          <Svg svgName='arrowTop' className='state-expanded' svgClass='icon' />
        </span>
      </td>
    );
  }
}
