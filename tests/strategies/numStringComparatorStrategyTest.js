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
    it('a == b should not produce difference (a and b are equal)',function(done){
        var a = 'test';
        var b = 'test';
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),undefined);
        done();
    });
    it('a == b produces differences (a = test and b = test2)',function(done){
        var a = 'test';
        var b = 'test2';
        var expectedResult = [{kind: 'U', path: '', change: { from: 'test', to: 'test2' }}];
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(JSON.stringify(strat.execute()),JSON.stringify(expectedResult));
        done();
    });
    it('a == b should not produce difference (a and b are equal)',function(done){
        var a = 12;
        var b = 12;
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),undefined);
        done();
    });
    it('a == b produces differences (a = 12 and b = 13)',function(done){
        var a = 12;
        var b = 13;
        var expectedResult = [{ kind: 'U', path: '', change: { from: 12, to: 13 }}];
        var strat = new NumStringComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(JSON.stringify(strat.execute()),JSON.stringify(expectedResult));
        done();
    });
});