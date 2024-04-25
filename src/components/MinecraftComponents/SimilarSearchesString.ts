import Fuse from "fuse.js";

const SimilarSearchesString = (items:string[], item:string ) => {
    const fuse = new Fuse(items, {
        includeScore: true,
        findAllMatches: true,
        threshold: 0.5
    });
    const result = fuse.search(item);
    const matches = result
    .map((match) => match.item)
    .filter((match) => match !== item);
    return matches
}

export default SimilarSearchesString;