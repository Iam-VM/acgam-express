

const sequelizeAuthenticate = (sequelize) => {
    try {
        sequelize.authenticate()
            .then(() => {
                console.log("Sequelize Authentication Success");

            })
            .catch((error) => {
                console.log("Sequelize Authentication Error: ", error);
            });
    } catch (error) {
        console.log("Sequelize Authentication Error: ", error);
    }
};

module.exports = sequelizeAuthenticate;
