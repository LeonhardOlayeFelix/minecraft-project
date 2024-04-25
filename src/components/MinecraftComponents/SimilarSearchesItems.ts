import { ItemsProps } from '../../hooks/useMinecraftHook'
import SimilarSearchesString from './SimilarSearchesString'


const SimilarSearchesItems = (items:ItemsProps[], item:ItemsProps) => {
  const itemsAsString = items.map(item => item.name)
  const itemAsString = item.name
  const similarSearches = SimilarSearchesString(itemsAsString, itemAsString)
  const itemsToReturn = similarSearches.map(result => items.find((itemfound) => itemfound.name === result))
  return itemsToReturn
}

export default SimilarSearchesItems