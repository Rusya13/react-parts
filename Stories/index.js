import React from "react";
import {  storiesOf } from "@kadira/storybook";
import './index.css';

import '../dist/style.css';

import {ButtonController} from './Button';
import {InputController} from './Input';
import {IconsController} from './Icon';
import {SelectController} from './Select';

const stories = storiesOf('React-parts', module);



stories.add('Button', () => {
    return (
        <ButtonController/>
    )
});

stories.add('Input', () => {
    return (
        <InputController/>
    )
});

stories.add('Select', () => {
    return (
        <SelectController/>
    )
});


stories.add('Icon', () => {
    return (
        <IconsController/>
    )
});












