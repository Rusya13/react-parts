import React from "react";
import "./index.css";
import "../dist/style.css";
import "./Styles/flexboxgrid.css";

import { ButtonController } from "./Button";
import { InputController } from "./Input";
import { SelectController } from "./Select";
import { RadioController } from "./Radio";
import { CheckBoxController } from "./CheckBox";
import { AuthForm } from "./AuthForm";
import { UserProfileForm } from "./UserProfileForm";
import { TodoList } from "./TodoList";
import { TreeEx } from "./TreeEx";
import { TransferController } from "./Transfer";
import { BadgeController } from "./Badge";
import { UploadController } from "./Upload";

export default {
    title: 'React-parts',
};

export const Button = () => <ButtonController/>;
export const Input = () => <InputController/>;
export const Select = () => <SelectController/>;
export const Radio = () => <RadioController/>;
export const CheckBox = () => <CheckBoxController/>;
export const Auth = () => <AuthForm/>;
export const UserProfile = () => <UserProfileForm/>;
export const Todo = () => <TodoList/>;
export const Tree = () => <TreeEx/>;
export const Transfer = () => <TransferController/>;
export const Badge = () => <BadgeController/>;
export const Upload = () => <UploadController/>;
