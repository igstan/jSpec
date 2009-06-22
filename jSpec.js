(function () {
    var global = this;

    var jSpec = global.jSpec = global.$ = function (underTest) {
        return new Matcher(underTest);
    };

    var queue = [];

    jSpec.describe = function (specsMessage, specs) {
        queue.push({
            message : specsMessage,
            specs   : specs,
        });
    };

    /**
     * @param {String}   specMessage
     * @param {Function} specTest
     */
    jSpec.it = function (specMessage, specTest) {
        try {
            specTest();
            print(specMessage);
        } catch (e) {
            print("FAILURE: " + specMessage);
        }
    };

    jSpec.run = function () {
        queue.forEach(function (suite, i, suites) {
            print(suite.message);
            suite.specs();
        });
    };

    var Matcher = function (testObject) {
        this.testObject = testObject;
    };

    Matcher.prototype = {
        constructor : Matcher,

        get should () {
            return this;
        },

        equal : function (value) {
            if (this.testObject != value) {
                throw new NonEqualityMatch;
            }
        }
    };

    var NonEqualityMatch = function (message) {
        this.message = message;
    };
    NonEqualityMatch.prototype = new Error();

})();
