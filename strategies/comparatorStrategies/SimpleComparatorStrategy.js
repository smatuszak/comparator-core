/**
 * Created by smatuszak on 10/03/16.
 */
'use strict';
var util = require('util');
var ComparatorStrategy = require('../comparatorStrategies/ComparatorStrategy');


function SimpleComparatorStrategy(a,b){
    this.a = a;
    this.b = b;
    this.strategies = [];
}
util.inherits(SimpleComparatorStrategy, ComparatorStrategy);

SimpleComparatorStrategy.prototype={
    isApplicable : function(){
        return (typeof this.a != 'object') && (typeof this.b != 'object');

    },
    execute : function(){
        var result;
        var NumStringComparatorStrategy = require('../comparatorStrategies/NumStringComparatorStrategy');
        var DateComparatorStrategy = require('../comparatorStrategies/DateComparatorStrategy');
        this.strategies.push(new NumStringComparatorStrategy(this.a,this.b));
        this.strategies.push(new DateComparatorStrategy(this.a,this.b));
        for(var i = 0; i<this.strategies.length;i++){
            if((this.strategies[i]).isApplicable()){
                result = (this.strategies[i]).execute();
                break;
            }
        }
        return result;
    }
};

module.exports = SimpleComparatorStrategy;