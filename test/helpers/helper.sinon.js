// import required libraries
const crypto = require('crypto');
const nodeMailer = require('nodemailer');
const sinon = require('sinon');

const sinonHelperService = {
  // stubbing the update method (user query)
  stubCreateHash: (foundData) => {
    const theFoundData = {
      update() {
        return this;
      },
      digest() {
        return foundData;
      },
    };

    return sinon.stub(crypto, 'createHash').returns(theFoundData);
  },

  // stubbing the nodemailer method (user query)
  stubCreateTransport: (foundData) => {
    const theFoundData = {
      sendMail() {
        return foundData;
      },
    };

    return sinon.stub(nodeMailer, 'createTransport').returns(theFoundData);
  },
};

// export helper
module.exports = sinonHelperService;
