import { distanceInWordsToNow } from "date-fns"
import { isNil } from "ramda"

export const getDateDistanceToNow = timestamp => {
  if (isNil(timestamp)) {
    return null
  }

  const date = new Date(timestamp).toISOString()
  return distanceInWordsToNow(date)
}
