const helperService = {
  // check if user is User
  isUser: (role) => role === 'User',

  // check if user is Admin
  isAdmin: (role) => role === 'Admin',

  // convert title to slug
  titleToSlug: (title) => title.replace(/\s+/g, '-').toLowerCase(),

  // check if is empty
  isEmpty: (param) => (!param || param.length === 0),

  // order params checker
  orderItemsBy: (sortQueryStr, sortArray) => {
    let orderParam; let orderValue;
    if (sortQueryStr && sortArray.includes(sortQueryStr)) {
      orderParam = sortQueryStr.substr(0, sortQueryStr.indexOf('-'));
      orderValue = sortQueryStr.substr(sortQueryStr.indexOf('-') + 1).toUpperCase();
    } else {
      orderParam = 'createdAt';
      orderValue = 'DESC';
    }

    return { orderParam, orderValue };
  },
};

// export helper
module.exports = helperService;
