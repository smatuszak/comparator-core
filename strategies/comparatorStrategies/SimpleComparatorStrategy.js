/**
 * Created by smatuszak on 10/03/16.
 */
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
        return;
    }
};

module.exports = SimpleComparatorStrategy;