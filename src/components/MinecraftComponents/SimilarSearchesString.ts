import Fuse from "fuse.js";

const SimilarSearchesString = (
  items: string[],
  item: string,
  threshold: number
) => {
  const fuse = new Fuse(items, {
    includeScore: true,
    findAllMatches: true,
    threshold: threshold,
  });
  const result = fuse.search(item);
  const matches = result
    .map((match) => match.item)
    .filter((match) => match !== item);
  return matches;
};

export default SimilarSearchesString;
