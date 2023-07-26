// Function to filter recipes by title
export function filterByTitle(title, data) {
  return data.filter(item =>
    item.title.toLowerCase().includes(title.toLowerCase())
  );
}
