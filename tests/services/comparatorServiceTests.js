var chai = require('chai');
var service = require('../../services/comparatorService');
var assert = chai.assert;
var agencies = require('../data/agencies.json');

describe('Comparator service unit tests',function(){
    describe('function deepCompare with JSON objects',function(){
        var a = {a:"test"};
        var b = {a:"test"};
        it('should return undefined',function(done){
            assert.equal(service.deepCompare(a,b),undefined,'the result is undefined');
            done();
        });
        it('should return an array that contains the differences',function(done){
            b = {b:"test2"};
            var c = [];
            var result = service.deepCompare(a,b);
            assert.equal(result.constructor,Array, 'the result is an Array');
            assert.notEqual(result,c,'the result is not empty');
            done();
        });
    });
    describe('function compare with JSON objects',function(){
        var a = {a:"test"};
        var b = {a:"test"};
        it('should return true',function(done){
            assert.equal(service.areSame(a,b),true);
            done();
        });
        it('should return false',function(done){
            b = {b:"test"};
            assert.equal(service.areSame(a,b),false);
            done();
        });
    });
    describe('function summarizeComparison with JSON objects',function(){

        it('should return {added:1, updated:0,deleted:0}',function(done){
            var a = {a:"test"};
            var b = {a:"test",b:"test1"};
            var result = service.summarizeComparison(a,b);
            assert.equal(result.added,1);
            assert.equal(result.updated,0);
            assert.equal(result.deleted,0);
            done();
        });
        it('should return {added:0, updated:1,deleted:0}',function(done){
            var a = {a:"test",b:"test"};
            var b = {a:"test",b:"test1"};
            var result = service.summarizeComparison(a,b);
            assert.equal(result.added,0);
            assert.equal(result.updated,1);
            assert.equal(result.deleted,0);
            done();
        });
        it('should return {added:0, updated:0,deleted:1}',function(done){
            var a = {a:"test",b:"test"};
            var b = {a:"test"};
            var result = service.summarizeComparison(a,b);
            assert.equal(result.added,0);
            assert.equal(result.updated,0);
            assert.equal(result.deleted,1);
            done();
        });
        it('should return {added:1, updated:1,deleted:1}',function(done){
            var a = {a:"test",b:"test"};
            var b = {a:"test1",c:"test"};
            var result = service.summarizeComparison(a,b);
            assert.equal(result.added,1);
            assert.equal(result.updated,1);
            assert.equal(result.deleted,1);
            done();
        });
    });
    describe('Array diff based on simple value',function() {
        it('should return {added:0, updated:0,deleted:0}', function (done) {
            var a = [1, 2];
            var b = [1, 2];
            var result = service.summarizeComparison(a, b);
            assert.equal(result.added, 0);
            assert.equal(result.updated, 0);
            assert.equal(result.deleted, 0);
            done();
        });
        it('should return {added:1, updated:0,deleted:0}', function (done) {
            var a = [1];
            var b = [1, 2];
            var result = service.summarizeComparison(a, b);
            assert.equal(result.added, 1);
            assert.equal(result.updated, 0);
            assert.equal(result.deleted, 0);
            done();
        });
        it('should return {added:0, updated:0,deleted:1}', function (done) {
            var a = [1, 2];
            var b = [1];
            var result = service.summarizeComparison(a, b);
            assert.equal(result.added, 0);
            assert.equal(result.updated, 0);
            assert.equal(result.deleted, 1);
            done();
        });
    });
    describe('Array diff based on JSON value',function(){
        it('should return {added:0, updated:1,deleted:0}',function(done){
            var a = [{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}];
            var b = [{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"TEST","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}];
            var result = service.summarizeComparison(a,b,"agency_id");
            assert.equal(result.added,0);
            assert.equal(result.updated,1);
            assert.equal(result.deleted,0);
            done();
        });
        it('should return {added:1, updated:0,deleted:0}',function(done){
            var a = [{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}];
            var b = [{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"TEST","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}];
            var result = service.summarizeComparison(a,b,"agency_id");
            assert.equal(result.added,1);
            assert.equal(result.updated,0);
            assert.equal(result.deleted,0);
            done();
        });
        it('should return {added:0, updated:0,deleted:1}',function(done){
            var a = [{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}];
            var b = [{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}];
            var result = service.summarizeComparison(a,b,"agency_id");
            assert.equal(result.added,0);
            assert.equal(result.updated,0);
            assert.equal(result.deleted,1);
            done();
        });
    });
    describe('Complete diff of complex JSON objects',function(){
        describe('Comparing JSON objects containing a simple attribute and an array of objects',function(){
            it('should return no difference',function(done){
                var a = {region:"Sud-Ouest", agencies:[{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var b = {region:"Sud-Ouest", agencies:[{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var config="agency_id";
                var result = service.areSame(a, b, config);
                assert.equal(result, true);
                done();
            });
            it('should detect difference (region are different)',function(done){
                var a = {region:"Sud-Ouest", agencies:[{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var b = {region:"Ouest", agencies:[{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var config="agency_id";
                var result = service.areSame(a, b, config);
                assert.equal(result, false);
                done();
            });
            it('should detect difference (url are different)',function(done){
                var a = {region:"Sud-Ouest", agencies:[{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var b = {region:"Sud-Ouest", agencies:[{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.google.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var config="agency_id";
                var result = service.areSame(a, b, config);
                assert.equal(result, false);
                done();
            });
            it('should detect difference (b contains more elements)',function(done){
                var a = {region:"Sud-Ouest", agencies:[{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var b = {region:"Sud-Ouest", agencies:[{"agency_id":"OCESN","agency_name":"SNCF","agency_url":"http://www.google.com","agency_timezone":"Europe/Paris","agency_lang":"fr"},{"agency_id":"OCECRLR","agency_name":"Conseil Régional Languedoc-Roussillon","agency_url":"http://www.ter-sncf.com","agency_timezone":"Europe/Paris","agency_lang":"fr"}]};
                var config="agency_id";
                var result = service.areSame(a, b, config);
                assert.equal(result, false);
                done();
            });
        });
    });
});
