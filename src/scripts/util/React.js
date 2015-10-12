exports.spread = function(rootElement, attrs, values) {
  values.unshift(attrs);
  return rootElement.apply(null, values);
};
