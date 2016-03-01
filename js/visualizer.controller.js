Visualizer.Controller = function () {

    this.file = null;
    this.aggregatorLabel = null;
    this.aggregatorFields = null;
    this.accumulatorLabel = null;
    this.accumulatorFields = null;

    this.defaults = {
        aggregatorLabel: 'negativereason',
        aggregatorFields: ['airline', 'airline_sentiment', 'negativereason'],
        accumulatorLabel: 'airline_sentiment',
        accumulatorFields: ['airline', 'airline_sentiment']
    };

};

Visualizer.Controller.prototype.initialize = function () {
    var self = this;

    $('#aggregator-label').val(this.defaults.aggregatorLabel);
    $('#aggregator-fields').val(this.defaults.aggregatorFields);
    $('#accumulator-label').val(this.defaults.accumulatorLabel);
    $('#accumulator-fields').val(this.defaults.accumulatorFields);

    $('#process').click(function () {
        self.process();
    });
};

Visualizer.Controller.prototype.process = function () {

    this.file = $('#input-file')[0].files[0];
    this.aggregatorLabel = $('#aggregator-label').val();
    this.aggregatorFields = $('#aggregator-fields').val();
    this.accumulatorLabel = $('#accumulator-label').val();
    this.accumulatorFields = $('#accumulator-fields').val();

    var reader = new Visualizer.Reader(this.file);
    var aggregator = new Visualizer.Aggregator(reader);
    var accumulator = new Visualizer.Accumulator(aggregator);
    var formatter = new Visualizer.Formatter({
        aggregatorLabel: this.aggregatorLabel,
        accumulatorLabel: this.accumulatorLabel
    });

    aggregator.addManyFields(Visualizer.Facade.parseFieldNames(this.aggregatorFields));
    accumulator.addManyFields(Visualizer.Facade.parseFieldNames(this.accumulatorFields));

    reader.onComplete(function () {

        var data = formatter.formatForHighcharts(accumulator);

        data.title = 'Title';
        data.subtitle = 'Subtitle';

        data.chart = {type: 'column'};
        data.xAxis = {type: 'category'};
        data.plotOptions = {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        };

        $('#viewport').highcharts(data);
    });

    reader.parse();
};