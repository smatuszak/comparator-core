/**
 * Created by smatuszak on 10/03/16.
 */
    'use strict'
var util = require('util');
var SimpleComparatorStrategy = require('../comparatorStrategies/SimpleComparatorStrategy');


function NumStringComparatorStrategy(a,b){
    this.a = a;
    this.b = b;

}
util.inherits(NumStringComparatorStrategy, SimpleComparatorStrategy);

NumStringComparatorStrategy.prototype={
    isApplicable : function(){
        return ((typeof this.a == 'string' && typeof this.b == 'string')|| (typeof this.a == 'number' && typeof this.b == 'number'));
    },
    execute : function(){
        return this.a === this.b;
    }
};

module.exports = NumStringComparatorStrategy;