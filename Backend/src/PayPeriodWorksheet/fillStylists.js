const fillStylist = require("fillStylist");
const fillStylists = (stylists) => {
  return stylists.map(function(stylist) {
    return fillStylist(stylist);
  });
}
modules.export = fillStylists;