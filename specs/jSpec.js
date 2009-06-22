/**
 * @author  Ionut G. Stan
 * @license BSD
 */

$.describe("jSpec library", function() {

    $.it("should allow simple equality checks", function() {
        $(5).should.equal(5);
    });

});

$.run();
