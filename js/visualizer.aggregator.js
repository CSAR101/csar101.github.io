Visualizer.Aggregator = function (reader) {
    this.data = [];
    this.fields = [];
    this.reader = reader;

    var tmp = {},
        self = this;

    reader.onStep(function (object) {
        var key = Visualizer.Facade.makeObjectAttributesKey(object, self.fields);
        Visualizer.Facade.groupItemIntoDictionary(tmp, key, object);
    });

    reader.onComplete(function () {
        self.data = tmp;
    });
};

Visualizer.Aggregator.prototype.addField = function (field) {
    this.fields.push(field);
};

Visualizer.Aggregator.prototype.addManyFields = function (fields) {
    for (var i = 0; i < fields.length; i++) {
        this.addField(fields[i]);
    }
};