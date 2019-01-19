// ISBN can be validated by weighting each digit in order from 10 to 1
// If the last digit is X, replace it with 10
// Return true if the sum mod 11 is zero

const validISBN = isbn => {
  if (isbn.length !== 10) return false
  const arr = isbn.split('')
  const sum = arr.reduce((total, val, i) => {
    const add =
      i === 9 && val.toLowerCase() === 'x' ? 10 : (10 - i) * parseInt(val)
    return total + add
  }, 0)
  return sum % 11 === 0
}

export default validISBN
