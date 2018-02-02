import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Button} from '../Button';
import {text, boolean, select} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';

storiesOf('Buttons', module).add('Better button example', withInfo(
    'This is a button used for clicking on stuff'
)(() => {
    const isLink = boolean('is a link', false);
    const linkURL = text('link url', 'http://perdu.com/');
    const hasTooltip = boolean('has a tooltip', false);
    const tooltipText = text('tooltip text', 'Here is a helpful text');
    const tooltipPlacement = select(
        'tooltip placement',
        {top: 'top', bottom: 'bottom', right: 'right', left: 'left'},
        'bottom');

    return (
        <Button
            small={boolean('is small', false)}
            enabled={boolean('is enabled', true)}
            primary={boolean('is primary', true)}
            name={text('name', 'Nice button')}
            link={isLink ? linkURL : null} target={isLink ? '_blank' : null}
            onClick={action('button-click')}
            tooltip={hasTooltip ? tooltipText : null}
            tooltipPlacement={hasTooltip ? tooltipPlacement : null}
        />
    );
}));
