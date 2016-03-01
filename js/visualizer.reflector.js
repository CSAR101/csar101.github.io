Visualizer.Reflector = new function () {
};

Visualizer.Reflector.invoke = function (object, method /*, args... */) {
    object[method].apply(Array.prototype.slice.call(arguments, 2));
};

Visualizer.Reflector.safeInvoke = function (object, method /*, args... */) {
    if (method in object) {
        this.invoke.apply(this, arguments);
    }
};