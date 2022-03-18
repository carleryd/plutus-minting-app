// Generated by purs version 0.14.5
"use strict";
var Control_Comonad_Env_Class = require("../Control.Comonad.Env.Class/index.js");
var Control_Comonad_Env_Trans = require("../Control.Comonad.Env.Trans/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Identity = require("../Data.Identity/index.js");
var Data_Newtype = require("../Data.Newtype/index.js");
var Data_Tuple = require("../Data.Tuple/index.js");
var withEnv = Control_Comonad_Env_Trans.withEnvT;
var runEnv = function (v) {
    return Data_Functor.map(Data_Tuple.functorTuple)(Data_Newtype.unwrap())(v);
};
var mapEnv = Data_Functor.map(Control_Comonad_Env_Trans.functorEnvT(Data_Identity.functorIdentity));
var env = function (e) {
    return function (a) {
        return Control_Comonad_Env_Trans.EnvT(Data_Tuple.Tuple.create(e)(a));
    };
};
module.exports = {
    runEnv: runEnv,
    withEnv: withEnv,
    mapEnv: mapEnv,
    env: env,
    ask: Control_Comonad_Env_Class.ask,
    asks: Control_Comonad_Env_Class.asks,
    local: Control_Comonad_Env_Class.local,
    EnvT: Control_Comonad_Env_Trans.EnvT,
    mapEnvT: Control_Comonad_Env_Trans.mapEnvT,
    runEnvT: Control_Comonad_Env_Trans.runEnvT,
    withEnvT: Control_Comonad_Env_Trans.withEnvT
};
