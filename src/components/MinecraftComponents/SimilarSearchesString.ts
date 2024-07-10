import Fuse from "fuse.js";

interface FuseResult {
  item: string;
  score?: number;
}

const SimilarSearchesString = (
  items: string[],
  item: string,
  threshold: number
) => {
  const fuse = new Fuse(items, {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    threshold: threshold,
  });

  const result: FuseResult[] = fuse.search(item);

  result.sort((a, b) => {
    const scoreA = a.score ?? Number.MAX_SAFE_INTEGER;
    const scoreB = b.score ?? Number.MAX_SAFE_INTEGER;
    return scoreA - scoreB;
  });
  const matches = result.map((match) => match.item);

  return matches;
};

export default SimilarSearchesString;
