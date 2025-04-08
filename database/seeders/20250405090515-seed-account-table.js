'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async function (queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'accounts',
            [
                {
                    username : "admin",
                    password_hash : "$2a$12$zTSHWMYfxX6bVi5BNW5h/OErwKp515pOLK3TmHfbvwrORN7R0cFe2",
                    is_active : 1,
                    person_name : "John Doe",
                    birthday : "1995-01-01",
                    phone_number : "0111111111",
                    email : "admin@gmail.com",
                    address : "Vietnam",
                    id_role : 1
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
