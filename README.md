# Init Style Project

This repository contains various styles to get starting with project markup.

Stack:
- `gulp` - build project
- `pug` - write html
- `styl` - write styles.


## Installation

Install with [npm](http://www.npmjs.com/):

```sh
$ npm install
```
or with [yarn](https://yarnpkg.com/)
```sh
$ yarn install
```

## Developing

Run develop with command
>`yarn run start:dev`

Get prod builded files with command
>`yarn run build`

## Contains

### Pure CSS toggler

Allows you to reproduce hide/show logic without any JS.

Use [general sibling selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors)
to set CSS rules on elements when checkbox change state.

Use attribute [for](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
on label to link with input state (checked/unchecked).

#### Expamle

[Codepen](https://codepen.io/xenikopa/pen/YzXaMYx)

```html
<input type='checkbox' id='toggler' name='toggler' />
<label for='toggler'>Toggler</label>
<div class='toggler-box'>I can hide and show with checkbox!</div>
```

```css
input[type='checkbox'] {
    display: none;
}
input[type='checkbox'] ~ label {
    cursor: pointer;
}
input[type='checkbox'] ~ .toggler-box {
    display: block;
}
input[type='checkbox']:checked ~ .toggler-box {
    display: none;
}
```



