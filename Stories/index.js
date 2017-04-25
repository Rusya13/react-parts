import React from "react";
import {  storiesOf } from "@kadira/storybook";
import './index.css';

import '../dist/style.css';

import {ButtonController} from './Button';
import {InputController} from './Input';
import {SelectController} from './Select';
import {RadioController} from './Radio';
import {CheckBoxController} from './CheckBox';

import {AuthForm} from './AuthForm'
import {UserProfileForm} from './UserProfileForm'
import {TodoList} from './TodoList'
import {TreeEx} from './TreeEx'

import './Styles/flexboxgrid.css';



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


stories.add('Radio', () => {
    return (
        <RadioController/>
    )
});

stories.add('CheckBox', () => {
    return (
        <CheckBoxController/>
    )
});

stories.add('AuthForm', () => {
    return (
        <AuthForm/>
    )
});

stories.add('UserProfileForm', () => {
    return (
        <UserProfileForm/>
    )
});

stories.add('TodoList', () => {
    return (
        <TodoList/>
    )
});


stories.add('Tree', () => {
    return (
        <TreeEx/>
    )
});



