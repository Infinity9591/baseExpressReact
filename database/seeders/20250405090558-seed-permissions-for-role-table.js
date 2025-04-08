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
            'permissions_for_role',
            [
                {
                    id_role : 1,
                    id_permission : 1,
                    source_name : "accounts",
                },
                {
                    id_role : 1,
                    id_permission : 2,
                    source_name : "accounts",
                },
                {
                    id_role : 1,
                    id_permission : 3,
                    source_name : "accounts",
                },
                {
                    id_role : 1,
                    id_permission : 4,
                    source_name : "accounts",
                },
                {
                    id_role : 1,
                    id_permission : 1,
                    source_name : "roles",
                },
                {
                    id_role : 1,
                    id_permission : 2,
                    source_name : "roles",
                },
                {
                    id_role : 1,
                    id_permission : 3,
                    source_name : "roles",
                },
                {
                    id_role : 1,
                    id_permission : 4,
                    source_name : "roles",
                },
                {
                    id_role : 1,
                    id_permission : 1,
                    source_name : "permissions",
                },
                {
                    id_role : 1,
                    id_permission : 2,
                    source_name : "permissions",
                },
                {
                    id_role : 1,
                    id_permission : 3,
                    source_name : "permissions",
                },
                {
                    id_role : 1,
                    id_permission : 4,
                    source_name : "permissions",
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
