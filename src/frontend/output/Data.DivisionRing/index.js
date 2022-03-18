// Generated by purs version 0.14.5
"use strict";
var Data_Ring = require("../Data.Ring/index.js");
var Data_Semiring = require("../Data.Semiring/index.js");
var recip = function (dict) {
    return dict.recip;
};
var rightDiv = function (dictDivisionRing) {
    return function (a) {
        return function (b) {
            return Data_Semiring.mul((dictDivisionRing.Ring0()).Semiring0())(a)(recip(dictDivisionRing)(b));
        };
    };
};
var leftDiv = function (dictDivisionRing) {
    return function (a) {
        return function (b) {
            return Data_Semiring.mul((dictDivisionRing.Ring0()).Semiring0())(recip(dictDivisionRing)(b))(a);
        };
    };
};
var divisionringNumber = {
    recip: function (x) {
        return 1.0 / x;
    },
    Ring0: function () {
        return Data_Ring.ringNumber;
    }
};
module.exports = {
    recip: recip,
    leftDiv: leftDiv,
    rightDiv: rightDiv,
    divisionringNumber: divisionringNumber,
    negate: Data_Ring.negate,
    sub: Data_Ring.sub,
    add: Data_Semiring.add,
    mul: Data_Semiring.mul,
    one: Data_Semiring.one,
    zero: Data_Semiring.zero
};
