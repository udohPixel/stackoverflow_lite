// import required modules
const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
const ApplicationException = require('../../common/ApplicationException');

const checkerService = {
  // hash password
  hashPassword: async (thePassword) => {
    // encrypt password
    // generate salt
    const salt = await bcrypt.genSalt(10);

    // check if salt was generated
    if (!salt) {
      throw new ApplicationException(
        'Unexpected error occurred while processing your request',
      );
    }

    // generate hash
    const hash = await bcrypt.hash(thePassword, salt);

    // check if password was hashed
    if (!hash) {
      throw new ApplicationException(
        'Unexpected error occurred while processing your request',
      );
    }

    return hash;
  },

  // generate random
  // randomHash: (token) => {
  //   const theToken = token || crypto.randomBytes(20).toString('hex');

  //   return crypto.createHash('sha512').update(theToken).digest('hex');
  // },
};

// export helper
module.exports = checkerService;
