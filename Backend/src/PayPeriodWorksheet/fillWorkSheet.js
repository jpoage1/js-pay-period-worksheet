const fillStylists = require("./fillStylists");
const fillWorkSheet = (stylists) => {
  if (Array.isArray(stylists)) {
    return fillStylists(stylists);
  }
  else {
    return fillStylists([stylists]);
  }
}
modules.export = fillWorkSheet;