import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

const req = require.context('../src', true, /\.stories\.tsx$/)

// Option defaults:
setOptions({
    name: 'React Vapor by Coveo',
    url: 'https://github.com/coveo/react-vapor',
    addonPanelInRight: true,
});

function loadStories() {
    require('./index.tsx');
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
