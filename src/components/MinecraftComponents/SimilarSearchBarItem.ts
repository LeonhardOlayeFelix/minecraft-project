const SimilarSearchBarItem = (items: string[], item: string) => {
  const matches = items.filter((candidate) => {
    return candidate
      .toLowerCase()
      .replace(" ", "")
      .includes(item.toLowerCase().replace(" ", ""));
  });

  return matches;
};

export default SimilarSearchBarItem;
