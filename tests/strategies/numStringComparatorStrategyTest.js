/**
 * Created by smatuszak on 10/03/16.
 */
var chai = require('chai');
var NumStringComparatorStrategy = require('../../strategies/comparatorStrategies/NumStringComparatorStrategy');
var assert = chai.assert;

describe('NumStringComparatorStrategy unit tests',function(){
    it('Strategy c\'ant be applied (a and b are objects)',function(done){
        var a = {test:"test"};
        var b = {test:"test"};
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),false);
        done();
    });
    it('Strategy c\'ant be applied (a is a string and b is a number)',function(done){
        var a = "test";
        var b = 0;
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),false);
        done();
    });
    it('a == b should return true (a and b are string)',function(done){
        var a = 'test';
        var b = 'test';
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),true);
        done();
    });
    it('a == b should return false (a and b are string)',function(done){
        var a = 'test';
        var b = 'test2';
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),false);
        done();
    });
    it('a == b should return true (a and b are number)',function(done){
        var a = 12;
        var b = 12;
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),true);
        done();
    });
    it('a == b should return false (a and b are number)',function(done){
        var a = 12;
        var b = 13;
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),false);
        done();
    });
});