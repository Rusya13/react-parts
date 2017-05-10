# react-parts

Component library for ReactJS

## Installation

```npm install```

## Storybook

```npm run dev_story```

Open localhost:9001 and Enjoy

## Last releases


### v0.4.8

#### SelectAsync

- list can be null

#### Input

- fixed input width



### v0.4.7


#### Button

- public methods added :

    - blur
    - focus


### v0.4.6

#### Tree

- add getNodeParents function in the Tree




### v0.4.5

#### Tree

- selected removed from node



### v0.4.4

#### Tree

- onSelect, onUnSelect now return Node

#### Upload

- new component


### v0.4.3

#### Tree

- new props added: contextMenuItems, contextMenuWidth, onRightClick

Use "contextMenuItems(node)-> [{title, onClickHandler}]" function to make a context menu


### v0.4.2

#### Tree

- remove async from function


### v0.4.1

#### Tree

- new props onExpandAsync


### v0.4.0

#### New component Badge

#### New component Transfer

#### Tree

- added full update on componentWillReceiveProps


### v0.3.0

#### New component Tree




### v0.2.0

#### All Components

- new props "required" (?boolean)

- PropTypes from library


### v0.1.4

##### Input

- fixed 0 value when type number



### v0.1.3

##### Input

- close suggest on Tab
- fixed crash on Enter with not selected item from suggest list


### v0.1.2

##### Input

- close suggest obBlur


### v0.1.1

##### Select

- minHeight fixed



### v0.1.0

- all inputs have height = 34px

##### Input

- new prop: onSelectFromSuggest
- prop castTo deprecated
- autocast to number if type === number
- prop value is no more required

##### MultiSelect, MultiSelectAsync

- keyboard error fixed
- clear input after select

##### Select

- new prop showFullValue
- keyboard error fixed
- selected now safe

##### SelectAsync

- new prop showFullValue
- keyboard error fixed
- safe renderList



### v0.0.15

##### Input

- value = "" if null or undefined


### v0.0.14

#### New Features

##### Input, Select, SelectAsync, MultiSelect, MultiSelectAsync

- autoFocus property added



### v0.0.13

#### New Features

##### Input, Select, SelectAsync

- in callback "onChange" added item as second argument



### v0.0.12

#### Fixes

- lists styles fixed


### v0.0.11

#### New Features

##### Input

- listItemRender added



### v0.0.10


#### Fixes

#### Input

- key="prefix"

##### Select

- fixed boolean id


### v0.0.9

#### Fixes

- width:100%
- no wrap in Select


#### New Features

##### Input

- prefix added




### v0.0.8

#### Fixes

##### Select

- fixed li key

### v0.0.7

#### Fixes

##### Select

- fixed delete item

### v0.0.6

#### Fixes

##### Select

- fixed keyboard select

#### New Features

- Select now is static
- add new component SelectAsync - only with dynamic list (async function)
- add new component MultiSelectAsync - only with dynamic list (async function)




### v0.0.5

#### Fixes

- SubmitForm removed
- fixed tabIndex in MultiSelect


### v0.0.4

#### New Features

##### MultiSelect

- list can be async
- keyboard works in the list
- uniqueKey (id by default)
- labelKey (value by default)
- addControls
- added tabIndex
- custom listItemRender
- custom inputItemRender
- added tabIndex
- add cancel

##### Select

- onChange now returns an item instead of value of "key" field
- noResultsText
- list can be async
- keyboard works in the list
- custom listItemRender
- custom inputRender
- uniqueKey (id by default)
- labelKey (value by default)
- onKeyDown event with (e:KeyboardEvent, value: SearchInput.value)
- list scrolls when use arrows
- added tabIndex
- addControls

##### Input

- remove suggestText
- list scrolls when use arrows
- added tabIndex
- add cancel

### v0.0.3

#### Fixes

- CheckBoxGroup styles
- CheckBox styles


### v0.0.2

#### New Features

- CheckBox now can be a button
- CheckBoxGroup can be a Group of buttons

#### Fixes

- CheckBoxGroup styles


## TODO


