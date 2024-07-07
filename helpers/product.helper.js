function buildCritiria(query, userId) {
  const critiria = { user: userId };

  if (query.title) {
    critiria.title = { $regex: query.title, $options: "i" };
  }

  if (query.description) {
    critiria.description = { $regex: query.description, $options: "i" };
  }
  if (query.body) {
    critiria.body = { $regex: query.body, $options: "i" };
  }
  if (query.isPinned) {
    critiria.isPinned = query.isPinned;
  }

  return critiria;
}

module.exports = {
  buildCritiria,
};
