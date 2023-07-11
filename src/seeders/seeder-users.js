module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@example.com',
        password:'123456',
        address:"HCMC district 12" ,
        gender :1 ,
        roleId:"AD",
        phoneNumber : "0981737131" ,
        image : "google.com" ,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };