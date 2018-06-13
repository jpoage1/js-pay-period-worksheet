function tier(sales, limit) {
  return sales <= limit ? 0 : sales - limit;
}