/**
 * Created by smatuszak on 11/03/16.
 */
var util = require('util');
var ComparatorStrategy = require('../comparatorStrategies/ComparatorStrategy');
var ComparatorStrategyRunner = require('../runners/ComparatorStrategyRunner');
var JsonComparatorStrategy = require('../comparatorStrategies/JsonComparatorStrategy');
var ArrayComparatorStrategy = require('../comparatorStrategies/ArrayComparatorStrategy')

function ComplexComparatorStrategy(a,b, config){
    this.a = a;
    this.b = b;
    this.config = config;
    this.strategies.push(new JsonComparatorStrategy(this.a,this.b,this.config));
    this.strategies.push(new ArrayComparatorStrategy(this.a,this.b,this.config));
}
util.inherits(ComplexComparatorStrategy, ComparatorStrategy);

ComplexComparatorStrategy.prototype={
    isApplicable : function(){
        return (typeof this.a == 'object') && (typeof this.b == 'object');

    },
    execute : function(){
        var result;
        for(var i = 0; i<this.strategies.length;i++){
            if((this.strategies[i]).isApplicable()){
                result = (this.strategies[i]).execute();
                break;
            }
        }
        return result;
    }
};

module.exports = ComplexComparatorStrategy;