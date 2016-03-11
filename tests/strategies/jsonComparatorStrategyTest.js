/**
 * Created by smatuszak on 10/03/16.
 */
var chai = require('chai');
//var JsonComparatorStrategy = require('../../strategies/comparatorStrategies/JsonComparatorStrategy');
var ArrayComparatorStrategy = require('../../strategies/comparatorStrategies/ArrayComparatorStrategy');
var assert = chai.assert;

describe('JsonComparatorStrategy unit tests',function(){
    /*it('Strategy can\'t be applied (a is a string)', function(done){
        var a ="test";
        var b = {test:"test"};
        var strat = new JsonComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),false);
        done();
    });*/
    it('a == b should not produce difference (a and b are equal)', function(done){
        var a =[{test:"test"}];
        var b = [{test:"test"}];
        var expectedResult =undefined;
        var strat = new ArrayComparatorStrategy(a,b);
        var result = strat.execute();
        assert.equal(strat.isApplicable(),true);
        assert.equal(result,expectedResult);
        done();
    });
    /*it('a == b doesn\'t produces any difference (a and b are equal)', function(done){
        var a ={test:"test"};
        var b = {test:"test"};
        var strat = new JsonComparatorStrategy(a,b);
        assert.equal(strat.isApplicable(),true);
        assert.equal(strat.execute(),undefined);
        done();
    });
    it('a == b produces difference (a value has been updated)', function(done){
        var a ={test:"test"};
        var b = {test:"test1"};
        var expectedResult = [ { kind: 'U', path: 'test', change: { from: 'test', to: 'test1' } } ];
        var strat = new JsonComparatorStrategy(a,b);
        var result = strat.execute();
        assert.equal(strat.isApplicable(),true);
        assert.notEqual(result,undefined);
        assert.equal(JSON.stringify(result[0]),JSON.stringify(expectedResult[0]));
        done();
    });
    it('a == b produces difference (b contains 2 attributes)', function(done){
        var a ={test:"test"};
        var b = {test:"test",test2:"test"};
        var expectedResult =[ { kind: 'A', path: 'test2', change: { from: 'undefined', to: 'test' } } ];
        var strat = new JsonComparatorStrategy(a,b);
        var result = strat.execute();
        assert.equal(strat.isApplicable(),true);
        assert.notEqual(result,undefined);
        assert.equal(JSON.stringify(result[0]),JSON.stringify(expectedResult[0]));
        done();
    });
    it('a == b produces difference (a contains 2 attributes and b only one)', function(done){
        var a ={test:"test",test2:"test"};
        var b = {test:"test"};
        var expectedResult =[ { kind: 'D', path: 'test2', change: { from: 'test', to: undefined } } ];
        var strat = new JsonComparatorStrategy(a,b);
        var result = strat.execute();
        assert.equal(strat.isApplicable(),true);
        assert.notEqual(result,undefined);
        assert.equal(JSON.stringify(result[0]),JSON.stringify(expectedResult[0]));
        done();
    });
    it('a == b should not produce difference (a and b are equal)', function(done){
        var a ={test:"test",test2:{a:1,b:2}};
        var b = {test:"test",test2:{a:1,b:2}};
        var expectedResult =undefined;
        var strat = new JsonComparatorStrategy(a,b);
        var result = strat.execute();
        assert.equal(strat.isApplicable(),true);
        assert.equal(result,expectedResult);
        done();
    });*/


});