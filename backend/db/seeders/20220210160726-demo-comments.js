'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('comments', [
     { userId: 1, storyId: 1, body: 'that is a great story and is do similar to what happened to me', createdAt: new Date(), updatedAt: new Date()},
     { userId: 1, storyId: 1, body: 'Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too.', createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('comments', null, {});
  }
};
