/**
 * Created by smk on 05/03/16.
 * Strategy suitable for JSON objects
 * Returns the difference between a and b
 */
var util = require('util');
var ComparatorStrategyRunner = require('../runners/ComparatorStrategyRunner');
var ComplexComparatorStrategy = require('../comparatorStrategies/ComplexComparatorStrategy');


function JsonComparatorStrategy(a,b,config){

    this.a = a;
    this.b = b;
    this.config = config;

}
JsonComparatorStrategy.prototype.constructor = JsonComparatorStrategy;
util.inherits(JsonComparatorStrategy, ComplexComparatorStrategy);

JsonComparatorStrategy.prototype = {
    isApplicable: function () {
        try {
            var jsonA = JSON.parse(JSON.stringify(this.a));
            var JsonB = JSON.parse(JSON.stringify(this.b));
            return typeof this.a == 'object' && typeof this.b == 'object';

        } catch (e) {
            return false;
        }
    },
    execute: function () {
        var diff = undefined;
        var that = this;
        var aKeys = Object.keys(this.a);
        var bKeys = Object.keys(this.b);
        //let's check if any modification exists between the two objects
        aKeys.forEach(function (key) {
            if (typeof that.a[key] == 'object') {
                if (!diff) {
                    diff = [];
                }
                //time for recursion
                /*var runner = new ComparatorStrategyRunner(that.a[key],that.b[key], that.config);
                 diff.push(runner.run());*/
            }
            else {
                if (!(that.b[key] && that.a[key] == that.b[key])) {
                    if (!diff) {
                        diff = [];
                    }
                    if (!that.b[key]) {
                        //element has disappeared
                        diff.push({kind: 'D', path: key, change: {from: that.a[key], to: undefined}});
                    }
                    else {
                        //element is modified
                        diff.push({kind: 'U', path: key, change: {from: that.a[key], to: that.b[key]}});
                    }
                }
            }

        });
        bKeys.forEach(function (key) {
            if (!that.a[key]) {
                if (!diff) {
                    diff = [];
                }
                //element doesn't exist in a
                diff.push({kind: 'A', path: key, change: {from: 'undefined', to: that.b[key]}});
            }
        });
        console.log(diff);
        return diff;
    }
};


module.exports = JsonComparatorStrategy;
