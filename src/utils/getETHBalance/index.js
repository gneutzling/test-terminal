import { pipe, pluck, subtract, sum } from "ramda"

export const getETHBalance = exchangeBalances => {
  const ethBoughtTotal = pipe(
    pluck("ethBought"),
    sum
  )(exchangeBalances)

  const ethSoldTotal = pipe(
    pluck("ethSold"),
    sum
  )(exchangeBalances)

  return subtract(ethBoughtTotal, ethSoldTotal)
}
