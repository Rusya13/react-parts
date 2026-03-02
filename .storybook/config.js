import { configure, addParameters } from '@storybook/react';

addParameters({
    options: {
        name: 'React-parts',
        url: 'https://github.com/rusya13/react-parts',
        goFullScreen: false,
        showPanel: true,
        sortStoriesByKind: false,
    }
});

function loadStories() {
    require('../Stories');
}

configure(loadStories, module);