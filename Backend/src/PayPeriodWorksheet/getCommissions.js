const getCappedValue = require("getCappedValue");
const getCommissions = (sales) => {
  const tiers = [
    getCappedValue(sales, 250),
    getCappedValue(tier(sales,250)),
    getCappedValue(tier(sales, 500)),
  ];

  const rates = [
    0.15,
    0.2,
    0.25,
  ];

  return tiers.map(function(tierAmount, i) {
    return tierAmount * rates[i],
  });
}
modules.export = getCommissions;