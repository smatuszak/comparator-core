/**
 * Created by smk on 05/03/16.
 * Strategy suitable for JSON objects
 * Returns the difference between a and b
 */
'use strict';
var util = require('util');
var ComparatorStrategyRunner = require('../runners/ComparatorStrategyRunner');
var ComplexComparatorStrategy = require('../comparatorStrategies/ComplexComparatorStrategy');


function JsonComparatorStrategy(a,b,config){
    ComplexComparatorStrategy.call(this,a,b,config);
}
util.inherits(JsonComparatorStrategy, ComplexComparatorStrategy);

JsonComparatorStrategy.prototype = {
    isApplicable: function () {
        try {
            JSON.parse(JSON.stringify(this.a));
            JSON.parse(JSON.stringify(this.b));
            return !Array.isArray(this.a) && !Array.isArray(this.b) && typeof this.a == 'object' && typeof this.b == 'object';

        } catch (e) {
            return false;
        }
    },
    execute: function () {
        var diff = undefined;
        var that = this;
        var aKeys = Object.keys(that.a);
        var bKeys = Object.keys(that.b);
        //let's check if any modification exists between the two objects
        aKeys.forEach(function (key) {
            if (typeof that.a[key] == 'object') {

                //time for recursion
                var runner = new ComparatorStrategyRunner(that.a[key],that.b[key], that.config);
                var subResult = runner.run();
                if(subResult){
                    if (!diff) {
                        diff = [];
                    }
                    diff.push(subResult[0]);
                }
            }
            else {
                if (!(that.b[key] && that.a[key] == that.b[key])) {
                    if (!diff) {
                        diff = [];
                    }
                    if (!that.b[key]) {
                        //element has disappeared
                        diff.push({kind: 'D', path: key,id:that.a[that.config], change: {from: that.a[key], to: undefined}});
                    }
                    else {
                        //element is modified
                        diff.push({kind: 'U', path: key,id:that.a[that.config], change: {from: that.a[key], to: that.b[key]}});
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
                diff.push({kind: 'A', path: key, id:that.b[that.config], change: {from: 'undefined', to: that.b[key]}});
            }
        });
        return diff;
    }
};


module.exports = JsonComparatorStrategy;
