"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "fishes",
      [
        {
          fish_name: "개서대",
          src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
          size: 10,
          ranked: 0,
        },
        {
          fish_name: "넙치",
          src: "",
          size: 26,
          ranked: 0,
        },
        {
          fish_name: "황돔",
          src: "",
          size: 28,
          ranked: 1,
        },
        {
          fish_name: "농어",
          src: "",
          size: 41,
          ranked: 1,
        },
        {
          fish_name: "볼락",
          src: "",
          size: 18,
          ranked: 1,
        },
        {
          fish_name: "농어",
          src: "",
          size: 15,
          ranked: 1,
        },
        {
          fish_name: "농어",
          src: "",
          size: 33,
          ranked: 1,
        },
        {
          fish_name: "농어",
          src: "",
          size: 58,
          ranked: 1,
        },
        {
          fish_name: "농어",
          src: "",
          size: 12,
          ranked: 1,
        },
        {
          fish_name: "농어",
          src: "",
          size: 57,
          ranked: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
