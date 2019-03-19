import * as classNames from 'classnames';
import * as React from 'react';
import * as styles from './StickyFooter.scss';

export interface IStickyFooterProps {
    isOpened: boolean;
    id?: string;
    className?: string;
}

export class StickyFooter extends React.Component<IStickyFooterProps> {
    static ID = 'StickyFooter';

    render() {
        const {id, className, isOpened} = this.props;
        return (
            <div id={id || StickyFooter.ID} className={classNames(styles.stickyFooter, {[styles.stickyFooterOpened]: isOpened}, className)}>
                {this.props.children}
            </div>
        );
    }
}
