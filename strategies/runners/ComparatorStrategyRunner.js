/**
 * Created by smk on 07/03/16.
 * this is where are we define the suitable strategies
 * Take note that the default strategy must be the
 * last entry in the array
 */

    'use strict';
    var ComplexComparatorStrategy = require('../comparatorStrategies/ComplexComparatorStrategy');
    var SimpleComparatorStrategy = require('../comparatorStrategies/SimpleComparatorStrategy');
    var DefaultComparatorStrategy = require('../comparatorStrategies/DefaultComparatorStrategy');

    function ComparatorStrategyRunner(a,b,config){
        this.a = a;
        this.b = b;
        this.config = config;
        this.strategies = [];
        this.strategies.push(new ComplexComparatorStrategy(this.a,this.b, this.config));
        this.strategies.push(new SimpleComparatorStrategy(this.a,this.b));
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
    };

    module.exports = ComparatorStrategyRunner;