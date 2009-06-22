/**
 * @author  Ionut G. Stan
 * @license BSD
 */

$.describe("jSpec library", function() {

    $.it("should allow simple equality checks", function() {
        $(5).should.equal(5);
    });
    
    $.it("should allow simple inequality checks", function() {
        $(5).should.equal(4);
    });

});

$.run();
