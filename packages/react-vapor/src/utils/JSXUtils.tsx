import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as _ from 'underscore';
import * as s from 'underscore.string';

import {decodeHtml} from './InputUtils';

export type JSXRenderable = JSX.Element | JSX.Element[] | string | number;

export const getReactNodeTextContent = (node: React.ReactNode): string => {
    return _.compose(
        s.clean,
        decodeHtml,
        s.stripTags
    )(renderToStaticMarkup(<div>{node}</div>));
};
