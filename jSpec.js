/**
 * @author  Ionut G. Stan
 * @license See LICENSE in the root of the project
 */

(function () {
    var ARRAY_TOSTRING = "[object Array]";

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
            } else if (e instanceof NonEqualityMatch) {
                print("FAILURE: " + specMessage);
            } else {
                print("FAILURE: " + e.message);
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
    
    var isArray = function (test) {
        return Object.prototype.toString.apply(test) === ARRAY_TOSTRING;
    };

    var compareArrays = function (a, b) {
        if (a.length !== b.length) {
            throw new NonEqualityMatch("Failed asserting length of arrays: " + a.length + " does not equal " + b.length);
        }

        a.forEach(function (item, i) {
            if (isArray(a[i]) && isArray(b[i])) {
                compareArrays(a[i], b[i]);
            } else {
                if (a[i] != b[i]) {
                    throw new NonEqualityMatch("Failed asserting that " + a[i] + " equals " + b[i]);
                }
            }
        });
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
            if (isArray(this.testObject) && isArray(value)) {
                compareArrays(this.testObject, value);
            } else {
                if (this.testObject == value && this.negativeAssertion) {
                    throw new NonEqualityMatch("Failed asserting that " + this.testObject + " does not equals " + value);
                }

                if (this.testObject != value && !this.negativeAssertion) {
                    throw new NonEqualityMatch("Failed asserting that " + this.testObject + " equals " + value);
                }
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
