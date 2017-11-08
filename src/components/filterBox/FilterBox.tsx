import * as React from 'react';
import { Svg } from '../svg/Svg';
import * as classNames from 'classnames';

export interface IFilterBoxOwnProps extends React.ClassAttributes<FilterBox> {
  id: string;
  containerClasses?: string[];
  filterPlaceholder?: string;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isAutoFocus?: boolean;
  maxWidth?: number;
  withTitleOnInput?: boolean;
  truncate?: boolean;
}

export interface IFilterBoxStateProps {
  filterText?: string;
}

export interface IFilterBoxDispatchProps {
  onRender?: (id: string) => void;
  onDestroy?: (id: string) => void;
  onFilter?: (id: string, filterText: string) => void;
}

export interface IFilterBoxProps extends IFilterBoxOwnProps, IFilterBoxStateProps, IFilterBoxDispatchProps { }

export const FILTER_PLACEHOLDER: string = 'Filter';

export class FilterBox extends React.Component<IFilterBoxProps, any> {
  filterInput: HTMLInputElement;

  static defaultProps: Partial<IFilterBoxProps> = {
    isAutoFocus: false,
  };

  private handleChange = () => {
    this.filterInput.nextElementSibling.setAttribute('class', this.filterInput.value.length ? '' : 'hidden');

    if (this.props.onFilter) {
      this.props.onFilter(this.props.id, this.filterInput.value);
    }
  }

  private handleOnBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  private handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  private clearValue = () => {
    this.filterInput.value = '';
    this.filterInput.focus();
    this.handleChange();
  }

  placeCursorAtEndOfInputValue(e: React.FocusEvent<any>) {
    const input = e.target as HTMLInputElement;
    const temp = input.value; input.value = ''; input.value = temp;
  }

  componentWillMount() {
    if (this.props.onRender) {
      this.props.onRender(this.props.id);
    }
  }

  componentWillUnmount() {
    if (this.props.onDestroy) {
      this.props.onDestroy(this.props.id);
    }
  }

  render() {
    const inputMaxWidth = { maxWidth: `${this.props.maxWidth}px` };
    const filterPlaceholder = this.props.filterPlaceholder || FILTER_PLACEHOLDER;
    const filterBoxContainerClasses = classNames('filter-container', this.props.containerClasses);
    const filterInputClasses = classNames('filter-box', { 'truncate': this.props.truncate });

    return (
      <div
        id={this.props.id}
        className={filterBoxContainerClasses}
        style={inputMaxWidth}
        title={this.filterInput && this.props.withTitleOnInput ? this.filterInput.value : undefined}>
        <input
          ref={(filterInput: HTMLInputElement) => this.filterInput = filterInput}
          type='text'
          className={filterInputClasses}
          placeholder={filterPlaceholder}
          onChange={() => this.handleChange()}
          onBlur={() => this.handleOnBlur()}
          onFocus={(e: React.FocusEvent<any>) => { this.placeCursorAtEndOfInputValue(e); }}
          onKeyDown={(e) => this.handleOnKeyDown(e)}
          value={this.props.filterText}
          style={inputMaxWidth}

          autoFocus={this.props.isAutoFocus}
        />
        <Svg svgName='clear' className='hidden' svgClass='icon mod-lg fill-medium-grey' onClick={() => this.clearValue()} />
        <Svg svgName='filter' className='filter-icon' svgClass='icon fill-medium-grey mod-lg' />
      </div>
    );
  }
}