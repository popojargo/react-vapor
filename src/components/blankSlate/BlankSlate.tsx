import * as React from 'react';
import * as _ from 'underscore';
import { IBaseActionOptions } from '../actions/Action';
import { Button } from '../button/Button';

export interface IBlankSlateProps extends React.ClassAttributes<BlankSlate> {
  title: string;
  description?: string;
  buttons?: IBaseActionOptions[];
  withModal?: boolean;
}

export class BlankSlate extends React.Component<IBlankSlateProps, any> {

  static defaultProps: Partial<IBlankSlateProps> = {
    title: '',
    buttons: [],
    withModal: false,
  };

  getDescriptionTemplate(): JSX.Element {
    return this.props.description
      ? (<p>{this.props.description}</p>)
      : null;
  }

  getButtonsTemplate(): JSX.Element[] {
    let buttonElements: Array<JSX.Element> = [];
    _.each(this.props.buttons, (buttonProps: IBaseActionOptions) => {
      buttonElements.push((<Button
        enabled={buttonProps.enabled}
        name={buttonProps.name}
        link={buttonProps.link}
        target={buttonProps.target}
        primary={buttonProps.primary}
        tooltip={buttonProps.tooltip}
        tooltipPlacement={buttonProps.tooltipPlacement}
        onClick={buttonProps.onClick} />));
    });

    return buttonElements;
  }

  render() {
    const blankSlateClasses: string = `blankslate ${this.props.withModal ? 'mt2 mb2' : 'm2'}`;
    const modalClasses: string = this.props.withModal ? 'mod-header-padding' : '';

    return (
      <div className={modalClasses}>
        <div className={blankSlateClasses}>
          <h1>{this.props.title}</h1>
          {this.getDescriptionTemplate()}
          {this.getButtonsTemplate()}
        </div>
      </div>
    );
  }
}
