"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Movies", [
      {
        name: "Movie 1",
        poster: "https://picsum.photos/200",
        trailer: "https://www.youtube.com/watch?v=AgmWfzlOvqw",
        description: "Description...",
        duration: "02:00",
        startDate: "2019-01-13",
        rating: 10,
        director: "PK & TT",
        createdAt: "2021-11-08 12:45:16",
        updatedAt: "2021-11-08 12:45:16",
      },
      {
        name: "Movie 2",
        poster: "https://picsum.photos/200",
        trailer: "https://www.youtube.com/watch?v=AgmWfzlOvqw",
        description: "Description...",
        duration: "02:00",
        startDate: "2019-01-13",
        rating: 10,
        director: "PK & TT",
        createdAt: "2021-11-08 12:45:16",
        updatedAt: "2021-11-08 12:45:16",
      },
      {
        name: "Movie 3",
        poster: "https://picsum.photos/200",
        trailer: "https://www.youtube.com/watch?v=AgmWfzlOvqw",
        description: "Description...",
        duration: "02:00",
        startDate: "2019-01-13",
        rating: 10,
        director: "PK & TT",
        createdAt: "2021-11-08 12:45:16",
        updatedAt: "2021-11-08 12:45:16",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
