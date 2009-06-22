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

    $.it("should allow simple inequality checks to pass", function() {
        $(5).should.not.equal(4);
    });

    $.it("should allow simple inequality checks to fail", function() {
        $(5).should.not.equal(5);
    });

    $.it("should offer means to explicitly mark a spec as failed", function() {
        $.fail("this spec must fail");
    });

});

$.run();
