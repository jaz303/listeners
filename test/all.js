var test = require('tape');
var Listeners = require('..');

test('add, fire', function(assert) {

    var ls = new Listeners();

    var called = false;
    ls.add(function() { called = true; });

    ls.fire();
    assert.ok(called);

    assert.end();

});

test('fire - multiple', function(assert) {

    var ls = new Listeners();

    var i = 0;
    ls.add(function() { i += 1; });
    ls.add(function() { i += 2; });
    ls.add(function() { i += 3; });

    ls.fire();
    assert.equal(i, 6);

    assert.end();

});

test('fire - context', function(assert) {

    var ls = new Listeners();

    var foo = { x: 0 }
    ls.add(function() { this.x += 1; }, foo);

    ls.fire();
    assert.equal(foo.x, 1);

    assert.end();

});

test('fire - arg passing', function(assert) {

    var ls = new Listeners();

    var out = 0;
    ls.add(function(a, b) { out = a + b; });

    ls.fire(10, 5);
    assert.equal(out, 15);

    assert.end();

});

test('fire array - context', function(assert) {

    var ls = new Listeners();

    var foo = { x: 0 }
    ls.add(function() { this.x += 1; }, foo);

    ls.fireArray([]);
    assert.equal(foo.x, 1);

    assert.end();

});

test('fire array - arg passing', function(assert) {

    var ls = new Listeners();

    var out = 0;
    ls.add(function(a, b) { out = a + b; });

    ls.fireArray([10, 5]);
    assert.equal(out, 15);

    assert.end();

});

test('remove - removes one listener only', function(assert) {

    var ls = new Listeners();

    var x = 0;
    var fn = function() { x++; };

    ls.add(fn);
    ls.add(fn);
    ls.add(fn);

    ls.remove(fn);

    ls.fire();
    assert.equal(x, 2);

    assert.end();

});

test('remove - removes correct context', function(assert) {

    var ls = new Listeners();

    var a = { x: 0 };
    var b = { x: 0 };
    var fn = function() { this.x++; };

    ls.add(fn, a);
    ls.add(fn, b);

    ls.remove(fn, a);

    ls.fire();

    assert.equal(a.x, 0);
    assert.equal(b.x, 1);

    assert.end();

});

test('clear', function(assert) {

    var ls = new Listeners();

    var i = 0;
    ls.add(function() { i += 1; });
    ls.add(function() { i += 2; });
    ls.add(function() { i += 3; });

    ls.clear();

    ls.fire();
    assert.equal(i, 0);

    assert.end();

});

test('error handling - fire', function(assert) {

    var triggered = false;
    var ls = new Listeners(function() {
        triggered = true;
    });

    ls.add(function() { xyzzy(); });
    ls.fire();

    assert.ok(triggered);

    assert.end();

});

test('error handling - fireArray', function(assert) {

    var triggered = false;
    var ls = new Listeners(function() {
        triggered = true;
    });

    ls.add(function() { xyzzy(); });
    ls.fireArray([]);

    assert.ok(triggered);
    
    assert.end();

});