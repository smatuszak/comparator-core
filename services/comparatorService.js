/**
 * Created by smk on 05/03/16.
 */
    'use strict';
    var ComparatorStrategyRunner = require('../strategies/runners/ComparatorStrategyRunner');
    module.exports={compare : compare,
                    deepCompare : deepCompare,
                    summarizeComparison : summarizeComparison,
                    arrayDiff : arrayDiff
    };

    /**
     * Function that returns true when the two args are equals.
     * Equality is determinated by a strategy system
     * @param a
     * @param b
     * @returns {boolean}
     */
    function compare(a,b){
        var result = deepCompare(a,b);
        if (!!result){
            return false;
        }
        return true;
    }

    /**
     * Function performing a deep compare between args.
     * Returned value is linked to the applied strategy
     * @param a
     * @param b
     * @returns {*}
     */
    function deepCompare(a,b){
        var runner = new ComparatorStrategyRunner(a,b);
        return runner.run();
    }

    /**
     * Function performing a summary of difference between the args
     * @param a
     * @param b
     * @returns {{added:*,updated:*,deleted:*}}
     */
    function summarizeComparison(a,b){
        var result = {added:0,updated:0,deleted:0};
        var diff = deepCompare(a,b);
        if(diff){
            console.log(diff);
            diff.forEach(function(item){
                if(item.kind == 'N'){
                    result.added++;
                }
                if(item.kind == 'E'){
                    result.updated++;
                }
                if(item.kind == 'D'){
                    result.deleted++;
                }
            });
        }
        return result;
    }

    function arrayDiff(a,b,uniqueKeyPath){
                var result = {added:0,updated:0,deleted:0};
        var aIndex = 0;
        var bIndex = 0;
        var bValue;
        for(aIndex = 0; aIndex < a.length;aIndex++){
            //look into b if the current element exists
            if(typeof a[aIndex] == 'object'){
                bValue = b.filter(function(item){
                                        var ok = true;
                                        if(uniqueKeyPath && uniqueKeyPath != ""){
                                            ok &= (a[aIndex][uniqueKeyPath] == item[uniqueKeyPath]);
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
                var hasDiff = compare(a[aIndex],Array.isArray(bValue)?bValue[0]:bValue);
                if(!hasDiff){
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
