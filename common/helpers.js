const helperService = {
  // check if user is Admin
  isAdmin: (role) => role === 'Admin',

  // convert title to slug
  titleToSlug: (title) => title.replace(/\s+/g, '-').toLowerCase(),

  // check if is empty
  isEmpty: (param) => (!param || param.length === 0),
};

// export helper
module.exports = helperService;
