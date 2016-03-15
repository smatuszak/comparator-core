/**
 * Created by smatuszak on 10/03/16.
 * Strategy suitable for arrays
 * Returns the difference between a and b
 */
var util = require('util');
var ComplexComparatorStrategy = require('../comparatorStrategies/ComplexComparatorStrategy');
var ComparatorStrategyRunner = require('../runners/ComparatorStrategyRunner');

function ArrayComparatorStrategy(a,b,config){
    c.call(this,a,b,config);

}
//util.inherits(ArrayComparatorStrategy, ComplexComparatorStrategy);
ArrayComparatorStrategy.prototype = Object.create(ArrayComparatorStrategy.prototype);
ArrayComparatorStrategy.prototype.constructor =ArrayComparatorStrategy;
    ArrayComparatorStrategy.prototype={
    isApplicable : function(){
        return Array.isArray(this.a) && Array.isArray(this.b);

    },
    execute : function(){
        return arrayDiff(this.a,this.b,this.config);
    }
};

function arrayDiff(a,b,config){
    var result = {added:0,updated:0,deleted:0};
    var aIndex = 0;
    var bIndex = 0;
    var bValue;
    for(aIndex = 0; aIndex < a.length;aIndex++){
        //look into b if the current element exists
        if(typeof a[aIndex] == 'object'){
            bValue = b.filter(function(item){
                var ok = true;
                if(config && config != ""){
                    ok &= (a[aIndex]['test'] == item['test']);
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
            var diff = strategyRunner.runWith(a[aIndex],Array.isArray(bValue)?bValue[0]:bValue,config);
            if(!!diff){
                result.updated++;
            }
        }
        else{
            //current element has disappeared
            result.deleted++;
        }
    }
    // check if b contains more elements than a
    while(aIndex < b.length){
        result.added++;
        aIndex++;
    }
    console.log(result);
    return result;
}


module.exports = ArrayComparatorStrategy;
