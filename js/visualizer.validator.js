Visualizer.Validator = new function () {
};

Visualizer.Validator.assert = function (expression, exception) {
    if (!expression) throw exception;
};

Visualizer.Validator.assertArgumentIsNotNull = function (object, variableName) {
    this.assert(
        object != null,
        variableName + ' argument value is null.'
    );
}

Visualizer.Validator.assertIsHTMLElement = function (object) {
    this.assert(
        object instanceof HTMLElement,
        'The specified element is not of the HTMLElement type.'
    );
};

Visualizer.Validator.assertIsFile = function (object) {
    this.assert(
        object instanceof File,
        'The specified parameter is not a valid HTML5 File instance.'
    );
};

Visualizer.Validator.assertIsCallback = function (object) {
    this.assert(
        object instanceof Function,
        'The specified parameter is not a valid callback.'
    );
};

Visualizer.Validator.assertIsReader = function (object) {
    this.assert(
        object instanceof Visualizer.Reader,
        'The specified parameter is not a valid Visualizer.Reader instance.'
    );
};