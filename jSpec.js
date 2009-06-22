/**
 * @author  Ionut G. Stan
 * @license See LICENSE in the root of the project
 */

(function () {
    // The initialization of the jSpec object is inspired by the jQuery library
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
            print("SUCCESS: " + specMessage);
        } catch (e) {
            if (e instanceof PendingMessage) {
                print("PENDING: " + e.message);
            } else {
                print("FAILURE: " + specMessage);
            }
        }
    };

    jSpec.run = function () {
        queue.forEach(function (suite, i, suites) {
            print(suite.message);
            suite.specs();
        });
    };

    jSpec.fail = function (message) {
        throw new Error;
    };

    jSpec.pending = function (message) {
        throw new PendingMessage(message);
    };

    var Matcher = function (testObject) {
        this.testObject = testObject;
    };

    Matcher.prototype = {
        constructor : Matcher,

        negativeAssertion : false,

        get should () {
            return this;
        },

        get not () {
            this.negativeAssertion = true;
            return this;
        },

        equal : function (value) {
            if (this.testObject == value && this.negativeAssertion) {
                throw new NonEqualityMatch;
            }

            if (this.testObject != value && !this.negativeAssertion) {
                throw new NonEqualityMatch;
            }
        }
    };

    var NonEqualityMatch = function (message) {
        this.message = message;
    };
    NonEqualityMatch.prototype = new Error();

    var PendingMessage = function (message) {
        this.message = message;
    };
    PendingMessage.prototype = new Error();

})();
