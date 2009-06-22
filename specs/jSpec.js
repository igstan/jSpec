/**
 * @author  Ionut G. Stan
 * @license BSD
 */

$.describe("jSpec library", function() {

    $.it("should allow simple equality checks to pass", function() {
        $(5).should.equal(5);
    });

    $.it("should allow simple equality checks to fail", function() {
        $(5).should.equal(4);
    });

});

$.run();
