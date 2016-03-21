/**
 * Created by smk on 05/03/16.
 * Default comparison strategy, always applicable
 * Perform an equality test based on the '===' operator
 */
'use strict';
var util = require('util');
var ComparatorStrategy = require('../comparatorStrategies/ComparatorStrategy');
function DefaultComparatorStrategy(a,b){
    this.a = a;
    this.b = b;
}
util.inherits(DefaultComparatorStrategy, ComparatorStrategy);

DefaultComparatorStrategy.prototype={
    isApplicable : function(){
        return true;
    },
    execute : function(){
        return (this.a === this.b);
    }
};

module.exports = DefaultComparatorStrategy;
