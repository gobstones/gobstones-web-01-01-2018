# gs-board

Gobstones Board: A Polymer component that renders a board.

## install
```
npm install
bower install
```

## run
```
grunt
```

## usage

### install
```
bower install --save gobstones/gs-board
```

### one-file compiled version
It is bundled every time `grunt` runs. See `test.html` for an example.

### import
```html
<link rel="import" href="{BOWER_COMPONENTS}/gs-board/dist/components/gs-board.html">
```

### simple board (from GBB)
```html
<gs-board>
  GBB/1.0
  size 4 3
  cell 1 2 Azul 0 Negro 0 Rojo 8 Verde 0
  cell 3 2 Azul 2 Negro 0 Rojo 5 Verde 1
  cell 2 1 Azul 0 Negro 6 Rojo 0 Verde 0
  head 1 2
</gs-board>
```

### initial board (editable)
```html
<gs-board size='{ "x": 4, "y": 4 }' options='{ "editable": true }'></gs-board>
```

### final board (fixed)
```html
<template is="dom-if" if="{{finalState}}" restamp="true">
  <gs-board table='{{finalState.table}}' header="{{finalState.header}}"></gs-board>
</template>
```
```
finalState.table = [[{}, { "red": 3 }], [{ "black": 1 }, {}]]
```

### setting header position
```html
<gs-board size='{ "x": 4, "y": 4 }' header='{ "x": 1, "y": 3 }'></gs-board>
```

### with boom
```html
<gs-board size='{ "x": 4, "y": 4 }' boom></gs-board>
```

### with attire
```html
<gs-board size='{ "x": 4, "y": 4 }' attire="{{attire}}"></gs-board>
```

#### Example of attire definition:
```json
{
  "enabled": true,
  "rules": [
    {
      "when": { "blue": "*", "black": "+", "red": 4, "green": "*" },
      "image": "tnt.png"
    },

    {
      "when": { "blue": 0, "black": 0, "red": 0, "green": 0 },
      "image": "back.png"
    },

    {
      "when": { "blue": 0, "black": 0, "red": 0, "green": 1 },
      "image": "green.png"
    },

    {
      "when": { "blue": 1, "black": 0, "red": 0, "green": 0 },
      "image": "blue.png"
    },

    {
      "when": { "blue": 0, "black": 1, "red": 0, "green": 0 },
      "image": "black.png"
    },

    {
      "when": { "blue": 0, "black": 0, "red": 1, "green": 0 },
      "image": "red.png"
    }
  ]
}
```

## considerations
- `size` will not change the size of the board automatically. You've to call to `fillTable()` manually. It's not pretty, but we have our reasons to do that.

## deploy

Create tags in `#master`.
