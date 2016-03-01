Visualizer.Accumulator = function (aggregator) {
    this.data = [];
    this.fields = [];
    this.aggregator = aggregator;

    var self = this;

    this.aggregator.reader.onComplete(function () {

        var tmp = {},
            items = self.aggregator.data;

        for (var uniqid in items) {
            var key = Visualizer.Facade.makeObjectAttributesKey(items[uniqid].key, self.fields);
            Visualizer.Facade.groupItemIntoDictionary(tmp, key, items[uniqid]);
        }

        self.data = tmp;
    });
};

Visualizer.Accumulator.prototype = Object.create(Visualizer.Aggregator.prototype);