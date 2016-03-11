/**
 * Created by smatuszak on 10/03/16.
 */
var chai = require('chai');
var DateComparatorStrategy = require('../../strategies/comparatorStrategies/DateComparatorStrategy');
var assert = chai.assert;

describe('DateComparatorStrategy unit tests',function(){
    it('Strategy c\'ant be applied (a and b are objects)',function(done){
        var a = {test:"test"};
        var b = {test:"test"};
        var strat = new DateComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),false);
        done();
    });
    it('Strategy c\'ant be applied (a is a date and b is a number)',function(done){
        var a = new Date(1457621000520);
        var b = 0;
        var strat = new DateComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),false);
        done();
    });
    it('a == b should return true (a and b are same date)',function(done){
        var a = new Date(1457621000520);
        var b = new Date(1457621000520);
        var strat = new DateComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),true);
        done();
    });
    it('a == b should return false (a < b)',function(done){
        var a = new Date(1457621000520);
        var b = new Date(1457621020520);
        var strat = new DateComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),false);
        done();
    });
    it('a == b should return false (a > b)',function(done){
        var a = new Date(1457621020520);
        var b = new Date(1457621000520);
        var strat = new DateComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),false);
        done();
    });
});