import * as React from 'react';

import {PopoverConnected} from '../PopoverConnected';

export const PopoverConnectedExamples = () => (
    <div className="mt2">
        <h1 className="text-blue mb1 bold">Popover Connected</h1>
        <PopoverConnected id="popover-connected-example1" attachment="top left" targetAttachment="bottom left">
            <div className="btn">Click to toggle the popover</div>
            <div className="coveo-child">I am popping under the button</div>
        </PopoverConnected>
    </div>
);
