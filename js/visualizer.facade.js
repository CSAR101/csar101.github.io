Visualizer.Facade = new function (reader) {
};

Visualizer.Facade.makeObjectAttributesKey = function (object, attributes) {
    var keyValuePair = {};

    for (var i = 0; i < attributes.length; i++) {
        var field = attributes[i],
            attribute = object[field];

        keyValuePair[field] = attribute;
    }

    return keyValuePair;
};

Visualizer.Facade.groupItemIntoDictionary = function (dictionary, key, object) {
    var uniqid = _.values(key).join('-');

    if (!(uniqid in dictionary)) {
        dictionary[uniqid] = {
            key: key,
            uniqid: uniqid,
            items: []
        };
    }

    dictionary[uniqid]['items'].push(object);
};

Visualizer.Facade.createNameFromKeyByAttributeExclusion = function (key, attribute) {
    delete key[attribute];
    return _.values(key).join(', ');
};

Visualizer.Facade.parseFieldNames = function (raw) {
    return raw.split(',').map(function (str) {
        return str.trim();
    });
}