# listeners

Represents a collection of registered listener functions, with methods for adding, removing and calling all functions.

## Installation

### npm

Get it:

```shell
npm install --save listeners
```

Require it:

```javascript
var Listeners = require('listeners');
```

## API

#### `var listeners = new Listeners([onError])`

#### `listeners.add(fn, [ctx])`

#### `listeners.remove(fn, [ctx])`

#### `listeners.clear()`

#### `listeners.fire(args...)`

#### `listeners.fireArray(args)`

#### `Listeners.onError(errorHandler)`

Set the default error handler for new instances.