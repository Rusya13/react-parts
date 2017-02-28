import { configure, storybook,  setAddon } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';


setOptions({
    name: 'React-parts',
    url: 'https://github.com/rusya13/react-parts',
    goFullScreen: false,
    showLeftPanel: true,
    showDownPanel: true,
    showSearchBox: false,
    downPanelInRight: false,
    sortStoriesByKind: false,
});


function loadStories() {
    require('../Stories');
    // You can require as many stories as you need.
}


configure(loadStories, module);