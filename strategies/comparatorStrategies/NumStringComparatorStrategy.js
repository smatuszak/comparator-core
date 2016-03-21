/**
 * Created by smatuszak on 10/03/16.
 */
    'use strict';
var util = require('util');
var SimpleComparatorStrategy = require('../comparatorStrategies/SimpleComparatorStrategy');


function NumStringComparatorStrategy(a,b){
    this.a = a;
    this.b = b;

}
util.inherits(NumStringComparatorStrategy, SimpleComparatorStrategy);

NumStringComparatorStrategy.prototype={
    isApplicable : function(){
        return ((typeof this.a == 'string' && (this.b == undefined || typeof this.b == 'string'))
                || (typeof this.a == 'number' && (this.b == undefined ||typeof this.b == 'number'))
                || (typeof this.b == 'number' && (this.a == undefined ||typeof this.a == 'number'))
                || (typeof this.b == 'string' && (this.a == undefined ||typeof this.a == 'string'))
        );
    },
    execute : function(){
        var diff;
        if(!!this.a && !this.b){
            if (!diff) {
                diff = [];
            }
            diff.push({kind: 'D', path: '', change: {from: this.a, to: undefined}});
        }else{
            if(!this.a && !!this.b){
                if (!diff) {
                    diff = [];
                }
                diff.push({kind: 'A', path: '', change: {from: undefined, to: this.b}});
            }
            else{
                if(this.a !== this.b){
                    if (!diff) {
                        diff = [];
                    }
                    diff.push({kind: 'U', path: '', change: {from: this.a, to: this.b}});
                }
            }
        }

        return diff;
    }
};

module.exports = NumStringComparatorStrategy;