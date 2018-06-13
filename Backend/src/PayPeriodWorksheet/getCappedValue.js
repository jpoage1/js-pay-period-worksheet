const getCappedValue = (a, max) => {
  if (a > max) {
    return a;
  } else {
    return max;
  }
}
modules.export = getCappedValue;