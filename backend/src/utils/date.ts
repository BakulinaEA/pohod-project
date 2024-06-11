export const ONE_DAY_MS = 24 * 60 * 60 * 1000
export const fifteenMinutsFromNow = () => new Date(Date.now() + 15 * 60 * 1000)
export const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000)
export const oneWeekFromNow = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
