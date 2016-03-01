Visualizer.Reader = function (file) {
    Visualizer.Validator.assertIsFile(file);

    this.file = file;
    this.stepHandlers = [];
    this.completeHandlers = [];
};

Visualizer.Reader.prototype.onStep = function (callback) {
    Visualizer.Validator.assertIsCallback(callback);
    this.stepHandlers.push(callback);
};

Visualizer.Reader.prototype.onComplete = function (callback) {
    Visualizer.Validator.assertIsCallback(callback);
    this.completeHandlers.push(callback);
};

Visualizer.Reader.prototype.parse = function () {
    var self = this,
        invokeThrough = function (array, args) {
            for (var i = 0; i < array.length; i++) {
                array[i].apply(this, args);
            }
        },
        config = {
            worker: true,
            header: true,
            skipEmptyLines: true,

            step: function (e, w) {
                invokeThrough.call(this, self.stepHandlers, [e.data[0], w]);
            },
            complete: function () {
                invokeThrough.call(this, self.completeHandlers);
            }
        };

    Papa.parse(this.file, config);
};