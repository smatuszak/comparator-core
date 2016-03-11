/**
 * Created by smk on 05/03/16.
 */
    'use strict';
    var ComparatorStrategyRunner = require('../strategies/runners/ComparatorStrategyRunner');
    module.exports={areSame : areSame,
                    deepCompare : deepCompare,
                    summarizeComparison : summarizeComparison,
                    arrayDiff : arrayDiff
    };

    /**
     * Function that returns true when the two args are equals.
     * Equality is determinated by a strategy system
     * Config object is optional and defines which keys
     * are used to do the comparison
     * @param a
     * @param b
     * @param config, a string or an array
     * @returns {boolean}
     */
    function areSame(a,b,config){
        var result = deepCompare(a,b,config);
        if (!!result){
            return false;
        }
        return true;
    }

    /**
     * Function performing a deep compare between args.
     * Returned value is linked to the applied strategy
     * Config object is optional and defines which keys
     * are used to do the comparison
     * @param a
     * @param b
     * @param config, a string or an array
     * @returns {*}
     */
    function deepCompare(a,b){
        var runner = new ComparatorStrategyRunner(a,b, config);
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

