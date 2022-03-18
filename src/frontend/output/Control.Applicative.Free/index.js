// Generated by purs version 0.14.5
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Control_Category = require("../Control.Category/index.js");
var Data_Const = require("../Data.Const/index.js");
var Data_Either = require("../Data.Either/index.js");
var Data_List_NonEmpty = require("../Data.List.NonEmpty/index.js");
var Data_List_Types = require("../Data.List.Types/index.js");
var Data_Newtype = require("../Data.Newtype/index.js");
var Data_NonEmpty = require("../Data.NonEmpty/index.js");
var Data_Tuple = require("../Data.Tuple/index.js");
var Pure = (function () {
    function Pure(value0) {
        this.value0 = value0;
    };
    Pure.create = function (value0) {
        return new Pure(value0);
    };
    return Pure;
})();
var Lift = (function () {
    function Lift(value0) {
        this.value0 = value0;
    };
    Lift.create = function (value0) {
        return new Lift(value0);
    };
    return Lift;
})();
var Ap = (function () {
    function Ap(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Ap.create = function (value0) {
        return function (value1) {
            return new Ap(value0, value1);
        };
    };
    return Ap;
})();
var mkAp = function (fba) {
    return function (fb) {
        return new Ap(fba, fb);
    };
};
var liftFreeAp = Lift.create;
var goLeft = function ($copy_dictApplicative) {
    return function ($copy_fStack) {
        return function ($copy_valStack) {
            return function ($copy_nat) {
                return function ($copy_func) {
                    return function ($copy_count) {
                        var $tco_var_dictApplicative = $copy_dictApplicative;
                        var $tco_var_fStack = $copy_fStack;
                        var $tco_var_valStack = $copy_valStack;
                        var $tco_var_nat = $copy_nat;
                        var $tco_var_func = $copy_func;
                        var $tco_done = false;
                        var $tco_result;
                        function $tco_loop(dictApplicative, fStack, valStack, nat, func, count) {
                            if (func instanceof Pure) {
                                $tco_done = true;
                                return new Data_Tuple.Tuple(new Data_List_Types.Cons({
                                    func: Control_Applicative.pure(dictApplicative)(func.value0),
                                    count: count
                                }, fStack), valStack);
                            };
                            if (func instanceof Lift) {
                                $tco_done = true;
                                return new Data_Tuple.Tuple(new Data_List_Types.Cons({
                                    func: nat(func.value0),
                                    count: count
                                }, fStack), valStack);
                            };
                            if (func instanceof Ap) {
                                $tco_var_dictApplicative = dictApplicative;
                                $tco_var_fStack = fStack;
                                $tco_var_valStack = Data_List_NonEmpty.cons(func.value1)(valStack);
                                $tco_var_nat = nat;
                                $tco_var_func = func.value0;
                                $copy_count = count + 1 | 0;
                                return;
                            };
                            throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [ func.constructor.name ]);
                        };
                        while (!$tco_done) {
                            $tco_result = $tco_loop($tco_var_dictApplicative, $tco_var_fStack, $tco_var_valStack, $tco_var_nat, $tco_var_func, $copy_count);
                        };
                        return $tco_result;
                    };
                };
            };
        };
    };
};
var goApply = function ($copy_dictApplicative) {
    return function ($copy_fStack) {
        return function ($copy_vals) {
            return function ($copy_gVal) {
                var $tco_var_dictApplicative = $copy_dictApplicative;
                var $tco_var_fStack = $copy_fStack;
                var $tco_var_vals = $copy_vals;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(dictApplicative, fStack, vals, gVal) {
                    if (fStack instanceof Data_List_Types.Nil) {
                        $tco_done = true;
                        return new Data_Either.Left(gVal);
                    };
                    if (fStack instanceof Data_List_Types.Cons) {
                        var gRes = Control_Apply.apply(dictApplicative.Apply0())(fStack.value0.func)(gVal);
                        var $14 = fStack.value0.count === 1;
                        if ($14) {
                            if (fStack.value1 instanceof Data_List_Types.Nil) {
                                $tco_done = true;
                                return new Data_Either.Left(gRes);
                            };
                            $tco_var_dictApplicative = dictApplicative;
                            $tco_var_fStack = fStack.value1;
                            $tco_var_vals = vals;
                            $copy_gVal = gRes;
                            return;
                        };
                        if (vals instanceof Data_List_Types.Nil) {
                            $tco_done = true;
                            return new Data_Either.Left(gRes);
                        };
                        if (vals instanceof Data_List_Types.Cons) {
                            $tco_done = true;
                            return Data_Either.Right.create(new Data_Tuple.Tuple(new Data_List_Types.Cons({
                                func: gRes,
                                count: fStack.value0.count - 1 | 0
                            }, fStack.value1), new Data_NonEmpty.NonEmpty(vals.value0, vals.value1)));
                        };
                        throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [ vals.constructor.name ]);
                    };
                    throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [ fStack.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_dictApplicative, $tco_var_fStack, $tco_var_vals, $copy_gVal);
                };
                return $tco_result;
            };
        };
    };
};
var functorFreeAp = {
    map: function (f) {
        return function (x) {
            return mkAp(new Pure(f))(x);
        };
    }
};
var foldFreeAp = function (dictApplicative) {
    return function (nat) {
        return function (z) {
            var go = function ($copy_v) {
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(v) {
                    if (v.value1.value0 instanceof Pure) {
                        var v1 = goApply(dictApplicative)(v.value0)(v.value1.value1)(Control_Applicative.pure(dictApplicative)(v.value1.value0.value0));
                        if (v1 instanceof Data_Either.Left) {
                            $tco_done = true;
                            return v1.value0;
                        };
                        if (v1 instanceof Data_Either.Right) {
                            $copy_v = v1.value0;
                            return;
                        };
                        throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [ v1.constructor.name ]);
                    };
                    if (v.value1.value0 instanceof Lift) {
                        var v1 = goApply(dictApplicative)(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
                        if (v1 instanceof Data_Either.Left) {
                            $tco_done = true;
                            return v1.value0;
                        };
                        if (v1 instanceof Data_Either.Right) {
                            $copy_v = v1.value0;
                            return;
                        };
                        throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [ v1.constructor.name ]);
                    };
                    if (v.value1.value0 instanceof Ap) {
                        var nextVals = new Data_NonEmpty.NonEmpty(v.value1.value0.value1, v.value1.value1);
                        $copy_v = goLeft(dictApplicative)(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
                        return;
                    };
                    throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [ v.value1.value0.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($copy_v);
                };
                return $tco_result;
            };
            return go(new Data_Tuple.Tuple(Data_List_Types.Nil.value, Data_List_NonEmpty.singleton(z)));
        };
    };
};
var retractFreeAp = function (dictApplicative) {
    return foldFreeAp(dictApplicative)(Control_Category.identity(Control_Category.categoryFn));
};
var applyFreeAp = {
    apply: function (fba) {
        return function (fb) {
            return mkAp(fba)(fb);
        };
    },
    Functor0: function () {
        return functorFreeAp;
    }
};
var applicativeFreeAp = {
    pure: Pure.create,
    Apply0: function () {
        return applyFreeAp;
    }
};
var hoistFreeAp = function (f) {
    return foldFreeAp(applicativeFreeAp)(function ($37) {
        return liftFreeAp(f($37));
    });
};
var analyzeFreeAp = function (dictMonoid) {
    return function (k) {
        var $38 = Data_Newtype.unwrap();
        var $39 = foldFreeAp(Data_Const.applicativeConst(dictMonoid))(function ($41) {
            return Data_Const.Const(k($41));
        });
        return function ($40) {
            return $38($39($40));
        };
    };
};
module.exports = {
    liftFreeAp: liftFreeAp,
    retractFreeAp: retractFreeAp,
    foldFreeAp: foldFreeAp,
    hoistFreeAp: hoistFreeAp,
    analyzeFreeAp: analyzeFreeAp,
    functorFreeAp: functorFreeAp,
    applyFreeAp: applyFreeAp,
    applicativeFreeAp: applicativeFreeAp
};
