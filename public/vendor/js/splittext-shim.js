/*
 * Drop-in replacement for GSAP's SplitText (Club GreenSock plugin — licensed
 * to the Agenio template author, not to us) built on top of SplitType, which
 * is MIT-licensed and already bundled in vendor/js/vendor/split-type.js.
 * Must load AFTER split-type.js and BEFORE main.js.
 */
(function (window) {
  function toSplitTypeTypes(type) {
    return (type || "lines,words,chars")
      .split(",")
      .map(function (t) { return t.trim(); })
      .join(", ");
  }

  function SplitText(target, vars) {
    vars = vars || {};
    var st = new window.SplitType(target, {
      types: toSplitTypeTypes(vars.type),
      lineClass: vars.linesClass || "split-line",
      wordClass: vars.wordsClass || "split-word",
      charClass: vars.charsClass || "split-char",
    });
    this.chars = st.chars || [];
    this.words = st.words || [];
    this.lines = st.lines || [];
    this._st = st;
  }

  SplitText.prototype.revert = function () {
    if (this._st && typeof this._st.revert === "function") this._st.revert();
  };

  window.SplitText = SplitText;
})(window);
