/**
 * Created by smatuszak on 10/03/16.
 */
'use strict'
var util = require('util');
var SimpleComparatorStrategy = require('../comparatorStrategies/SimpleComparatorStrategy');


function DateComparatorStrategy(a,b){
    this.a = a;
    this.b = b;

}
util.inherits(DateComparatorStrategy, SimpleComparatorStrategy);

DateComparatorStrategy.prototype={
    isApplicable : function(){
        return ((this.a instanceof Date) && (this.b instanceof Date));
    },
    execute : function(){
        return this.a.getTime() == this.b.getTime();
    }
};

module.exports = DateComparatorStrategy;