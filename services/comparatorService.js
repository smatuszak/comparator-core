/**
 * Created by smk on 05/03/16.
 */
(function(){
    'use strict';
    var ComparatorStrategyRunner = require('../strategies/runners/ComparatorStrategyRunner');
    module.exports={compare : compare,
                    deepCompare : deepCompare,
                    summarizeComparison : summarizeComparison
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
        if(!!result){
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
})();