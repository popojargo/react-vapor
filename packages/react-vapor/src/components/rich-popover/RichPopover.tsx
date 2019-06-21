import * as React from 'react';
import * as Markdown from 'react-markdown';

import {Defaults} from '../../Defaults';
import {DropPodPosition} from '../drop/DomPositionCalculator';
import {Drop} from '../drop/Drop';
import {Svg} from '../svg/Svg';

const input = '# This is a header\n\nAnd this is a paragraph';

export interface RichPopoverProps {
    id: string;
}

export function RichPopover({id}: RichPopoverProps) {
    return (
        <div>
            <Drop
                id={id}
                selector={Defaults.DROP_ROOT}
                positions={[DropPodPosition.bottom, DropPodPosition.top]}
                renderOpenButton={(onClick: () => void) => (
                    <a onClick={onClick}>
                        <Svg svgName="help" svgClass="icon fill-orange mod-lg" />
                    </a>
                )}
                buttonContainerProps={{
                    className: 'coveo-parent',
                }}
            >
                <Markdown source={input} className="coveo-child" />
            </Drop>
        </div>
    );
}
