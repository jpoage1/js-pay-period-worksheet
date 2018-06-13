const getCommissions = require("getCommissions");
const safelyDivideTwoNumbers = require("safelyDivideTwoNumbers");
const safelyFindPercentage = require("safelyFindPercentage");
const getPreflightCalcs = require("getPreflightCalcs");
function fillStylist(stylist) {
  var commissions = getCommissions(stylist.pp_product_sales);

  var productCommission = comissions.reduce(function(accumulator, amount) {
    return accumulator + amount;
  }, 0);

  var preflightCalculations = getPreflightCalcs(stylist, productCommission);

  var { totalEarnedService, grossRevenue, actualPaycheck, } = preflightCalculations;

  var newStylist = {
    total_hourly_pay           : safelyDivideTwoNumbers(actualPaycheck             , stylist.pp_product_hours),
    pp_hourly_base             : safelyDivideTwoNumbers(stylist.hourly_gross       , stylist.pp_product_hours),
    pp_service_commission_rate : safelyDivideTwoNumbers(stylist.service_commission , stylist.pp_commissionable_service),
    percent_product_sales      : safelyFindPercentage(stylist.pp_product_sales   , stylist.gross_revenue),
    percent_service_commission : safelyFindPercentage(actualPaycheck             , stylist.pp_commissionable_service),
    percent_product_commission : safelyFindPercentage(stylist.product_commission , stylist.pp_product_sales),
    divide_product_hours       : stylist.pp_product_hours,
  };

  return {
    ...extraMoney,
    ...preflightCalculations,
    ...newStylist,
  };
}
modules.export = fillStylist;