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

## Error Handling

Should a listener function throw an error, the default behaviour is to log it and continue firing any remaining listeners. This behaviour can be overridden by passing an error handling to the `Listeners` constructor, or by setting a default error handler. An error handler can return `false` to indicate that no further listener functions should be triggered for this event, or alternatively you can rethrow the exception and it will be propagated to as usual.