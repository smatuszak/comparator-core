/**
 * Created by smk on 05/03/16.
 * Strategy suitable for JSON objects
 * Returns the difference between a and b
 */
var diff = require('deep-diff').diff;
var util = require('util');
var ComparatorStrategy = require('../comparatorStrategies/ComparatorStrategy');

function JsonComparatorStrategy(a,b){
    this.a = a;
    this.b = b;
}
util.inherits(JsonComparatorStrategy, ComparatorStrategy);

JsonComparatorStrategy.prototype={
    isApplicable : function(){
      try{
          var jsonA = JSON.parse(JSON.stringify(this.a));
          var JsonB = JSON.parse(JSON.stringify(this.b));
          return true;

      }catch(e){
          return false;
      }
    },
    execute : function(){
        return diff(this.a,this.b);
    }
}

module.exports = JsonComparatorStrategy;
