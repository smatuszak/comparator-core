/**
 * Created by smk on 07/03/16.
 * this is where are we define the suitable strategies
 * Take note that the default strategy must be the
 * last entry in the array
 */
(function(){
    'use strict';
    var JsonComparatorStrategy = require('../comparatorStrategies/JsonComparatorStrategy');
    var DefaultComparatorStrategy = require('../comparatorStrategies/DefaultComparatorStrategy');

    function ComparatorStrategyRunner(a,b){
        this.a = a;
        this.b = b;
        this.strategies = [];
        this.strategies.push(new JsonComparatorStrategy(this.a,this.b));
        this.strategies.push(new DefaultComparatorStrategy(this.a,this.b));

    }

    ComparatorStrategyRunner.prototype={
        run : function(){
            var result;
            for(var i = 0; i<this.strategies.length;i++){
                if((this.strategies[i]).isApplicable()){
                    result = (this.strategies[i]).execute();
                    break;
                }
            }
            return result;
        }
    }

    module.exports = ComparatorStrategyRunner;
})();