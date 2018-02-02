import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

// Option defaults:
setOptions({
    name: 'React Vapor by Coveo',
    url: 'https://github.com/coveo/react-vapor',
    addonPanelInRight: true,

});

function loadStories() {
    require('./index.tsx');
}

configure(loadStories, module);
