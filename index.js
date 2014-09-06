module.exports = Listeners;

module.exports.onError = function(fn) {
    defaultErrorHandler = fn;
}

var defaultErrorHandler = function(err) {
    console.error("Error in Listeners callback:");
    console.error(err);
}

function Listeners(onError) {
    this._listeners = [];
    this._onError = onError || defaultErrorHandler;
}

Listeners.prototype.add = function(fn, ctx) {
    this._listeners.push(fn, ctx);
    return fn;
}

Listeners.prototype.remove = function(fn, ctx) {
    for (var i = 0, ls = this._listeners; i < ls.length; i += 2) {
        if (ls[i] === fn && (!ctx || ls[i+1] === ctx)) {
            ls.splice(i, 2);
            return;
        }
    }
}

Listeners.prototype.clear = function() {
    this._listeners = [];
}

Listeners.prototype.fire = function() {
    for (var ls = this._listeners, i = ls.length - 2; i >= 0; i -= 2) {
        try {
            ls[i].apply(ls[i+1], arguments);
        } catch (err) {
            if (this.onError(err) === false) {
                break;
            }
        }
    }
}

Listeners.prototype.fireArray = function(ary) {
    for (var ls = this._listeners, i = ls.length - 2; i >= 0; i -= 2) {
        try {
            ls[i].apply(ls[i+1], ary);
        } catch (err) {
            if (this.onError(err) === false) {
                break;
            }
        }
    }
}