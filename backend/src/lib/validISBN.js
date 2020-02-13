exports.validISBN = isbn => {
  if (isbn.length !== 10) return false;
  const arr = isbn.split("");
  const sum = arr.reduce((total, val, i) => {
    const add =
      i === 9 && val.toLowerCase() === "x" ? 10 : (10 - i) * parseInt(val);
    return total + add;
  }, 0);
  return sum % 11 === 0;
};
