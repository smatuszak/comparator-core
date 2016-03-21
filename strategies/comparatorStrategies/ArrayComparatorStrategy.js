/**
 * Created by smatuszak on 10/03/16.
 * Strategy suitable for arrays
 * Returns the difference between a and b
 */
'use strict';
var util = require('util');
var ComplexComparatorStrategy = require('../comparatorStrategies/ComplexComparatorStrategy');
var ComparatorStrategyRunner = require('../runners/ComparatorStrategyRunner');

function ArrayComparatorStrategy(a,b,config){
    ComplexComparatorStrategy.call(this,a,b,config);

}
util.inherits(ArrayComparatorStrategy, ComplexComparatorStrategy);
/*ArrayComparatorStrategy.prototype = Object.create(ArrayComparatorStrategy.prototype);
ArrayComparatorStrategy.prototype.constructor =ArrayComparatorStrategy;*/
ArrayComparatorStrategy.prototype={
    isApplicable : function(){
        return Array.isArray(this.a) && Array.isArray(this.b);

    },
    execute : function(){
        return arrayDiff(this.a,this.b,this.config);
    }
};

function arrayDiff(a,b,config){
    var diff = undefined;
    var aIndex = 0;
    var bIndex = 0;
    var bValue;
    for(aIndex = 0; aIndex < a.length;aIndex++){
        //look into b if the current element exists
        if(typeof a[aIndex] == 'object'){
            bValue = b.filter(function(item){
                var ok = true;
                if(!!config){
                    if( typeof config == 'string'){
                        ok &= (a[aIndex][config] == item[config]);
                    }
                    else{
                        if(isArray(config)){

                        }
                    }
                }
                else {
                    Object.keys(item).forEach(function (key) {
                        ok &= (a[aIndex][key] == item[key]);
                    });
                }
                return ok;
            });
        }
        else{
            bIndex = b.indexOf(a[aIndex]);
            bValue = b[bIndex];
        }

        if (bValue && ((Array.isArray(bValue) && bValue.length > 0) || (!Array.isArray(bValue)))){
            //the element exists, let's check for some modification
             var strategyRunner = new ComparatorStrategyRunner(a[aIndex],Array.isArray(bValue)?bValue[0]:bValue,config);
            var subResult = strategyRunner.run();
            if(subResult){
                if (!diff) {
                    diff = [];
                }
                diff.push(subResult[0]);
            }
        }
        else{
            if (!diff) {
                diff = [];
            }
            //current element has disappeared
            diff.push({kind: 'D', path: aIndex, id:a[aIndex][config], change: {from: a[aIndex], to: undefined}});
        }
    }
    // check if b contains more elements than a
    while(aIndex < b.length){
        if (!diff) {
            diff = [];
        }
        var newEntries = b.filter(function(bItem){
                                        var ok = true;
                                        var found;
                                        if(!!config){
                                            var toFind = bItem[config];
                                            found = a.filter(function(aItem){
                                                                        return aItem[config] == toFind;
                                                                    });
                                            return ok && (found.length==0);
                                        }
                                        else{
                                            found = a.filter(function(aItem){
                                                                    return aItem == bItem;
                                                                });
                                            return ok && (found.length==0);
                                        }
                                    });
        newEntries.forEach(function (item){
            diff.push({kind: 'A', path: config, id:item[config], change: {from: undefined, to: item}});
        });

        aIndex++;
    }
    console.log(diff);
    return diff;
}


module.exports = ArrayComparatorStrategy;
