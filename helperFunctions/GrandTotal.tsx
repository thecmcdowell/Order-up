const GrandTotalMath = (cart) => {
  let runningTotal = 0;
  cart.forEach((item) => {
    console.log(item);
    runningTotal += item.totalPrice;
  });
  return runningTotal;
};

export default GrandTotalMath;
