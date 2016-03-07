var chai = require('chai');
var proxyquire = require('proxyquire');
var service = require('../../services/comparatorService');
var assert = chai.assert;

describe('Comparator service unit tests',function(){
    describe('function deepCompare with JSON objects',function(){
        var a = '{"a":"test"}';
        var b = '{"a":"test"}';
        it('should return undefined',function(done){
            assert.equal(service.deepCompare(a,b),undefined,'the result is undefined');
            done();
        });
        it('should return an array that contains the differences',function(done){
            b='{"b":"test"}';
            var c = [];
            var result = service.deepCompare(a,b);
            assert.equal(result.constructor,Array, 'the result is an Array');
            assert.notEqual(result,c,'the result is not empty');
            done();
        });
    });
    describe('function compare with JSON objects',function(){
        var a = '{"a":"test"}';
        var b = '{"a":"test"}';
        it('should return true',function(done){
            assert.equal(service.compare(a,b),true);
            done();
        });
        it('should return false',function(done){
            b='{"b":"test"}';
            assert.equal(service.compare(a,b),false);
            done();
        });
    });
    describe('function summarizeComparison with JSON objects',function(){
        var a = '{a:["test"],b:{c:0}}';
        var b = '{a:["test","test1"]}';
        it('should return true',function(done){
            var result = service.summarizeComparison(a,b);
            assert.equal(result.constructor,Array);
            done();
        });

    });
});
