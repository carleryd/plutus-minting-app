// Generated by purs version 0.14.5
"use strict";
var PreloadNone = (function () {
    function PreloadNone() {

    };
    PreloadNone.value = new PreloadNone();
    return PreloadNone;
})();
var PreloadAuto = (function () {
    function PreloadAuto() {

    };
    PreloadAuto.value = new PreloadAuto();
    return PreloadAuto;
})();
var PreloadMetadata = (function () {
    function PreloadMetadata() {

    };
    PreloadMetadata.value = new PreloadMetadata();
    return PreloadMetadata;
})();
var renderPreloadValue = function (v) {
    if (v instanceof PreloadNone) {
        return "none";
    };
    if (v instanceof PreloadAuto) {
        return "auto";
    };
    if (v instanceof PreloadMetadata) {
        return "metadata";
    };
    throw new Error("Failed pattern match at DOM.HTML.Indexed.PreloadValue (line 9, column 22 - line 12, column 32): " + [ v.constructor.name ]);
};
module.exports = {
    PreloadNone: PreloadNone,
    PreloadAuto: PreloadAuto,
    PreloadMetadata: PreloadMetadata,
    renderPreloadValue: renderPreloadValue
};
