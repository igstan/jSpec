/**
 * @author  Ionut G. Stan
 * @license See LICENSE in the root of the project
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

    $.it("should offer means to mark a spec as pending", function() {
        $.pending("this message reminds why the spec is marked as pending");

        $(5).should.not.equal(5); // this line will not get executed
    });

    $.it("should be able to compare arrays of arbitrary depth", function() {
        $([[0, 2], [2, 4]]).should.equal([[0, 2], [2, 4]]);
    });

    $.it("should not hide messages from external exceptions", function() {
        throw new Error("This message should be displayed in the test report");
    });

    $.it("should return a meaningful description for assertion failures", function() {
        try {
            $(4).should.equal(5);
        } catch (e) {
            $(e.message).should.equal("Failed asserting that 4 equals 5");
        }
    });

});

$.run();
