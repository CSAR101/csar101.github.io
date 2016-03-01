Visualizer.Formatter = function (configuration) {

    this.config = configuration;

};

Visualizer.Formatter.prototype.formatForHighcharts = function (accumulator) {
    var result = {
        series: [],
        drilldown: {
            series: []
        }
    };

    var seriesDictionary = {};
    var seriesDataDictionary = {};
    var drilldownDictionary = {};

    for (var accumulatedKey in accumulator.data) {
        var accumulated = accumulator.data[accumulatedKey],
            accumulatedName = accumulated.key[this.config.accumulatorLabel];

        if (accumulatedName in seriesDictionary) {

            accumulatedSerie = seriesDictionary[accumulatedName];

        } else {

            seriesDictionary[accumulatedName] = accumulatedSerie = {
                name: accumulated.key[this.config.accumulatorLabel],
                data: []
            };

        }

        for (var i = 0; i < accumulated.items.length; i++) {
            var aggregated = accumulated.items[i];

            if (accumulatedKey in seriesDataDictionary) {

                seriesDataDictionary[accumulatedKey].y += aggregated.items.length;

            } else {

                accumulatedSerie.data.push(seriesDataDictionary[accumulatedKey] = {
                    name: Visualizer.Facade.createNameFromKeyByAttributeExclusion(accumulated.key, this.config.accumulatorLabel),
                    y: aggregated.items.length,
                    drilldown: accumulatedKey
                });

            }

            if (accumulatedKey in drilldownDictionary) {

                aggregatedSerie = drilldownDictionary[accumulatedKey];

            } else {

                drilldownDictionary[accumulatedKey] = aggregatedSerie = {
                    id: accumulatedKey,
                    data: []
                };

            }

            aggregatedSerie.data.push([
                aggregated.key[this.config.aggregatorLabel] || '(Empty)',
                aggregated.items.length]
            );
        }
    }

    for (var serieKey in seriesDictionary) {
        result.series.push(seriesDictionary[serieKey]);
    }

    for (var drilldownKey in drilldownDictionary) {
        result.drilldown.series.push(drilldownDictionary[drilldownKey]);
    }

    return result;
};