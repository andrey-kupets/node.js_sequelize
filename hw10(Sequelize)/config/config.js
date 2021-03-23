module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/sep-2020',
    PORT: 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'test@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '666',
    // Sequelize
    USER: 'root',
    ROOT_DB_PASSWORD: process.env.ROOT_DB_PASSWORD || 'root',
    DATABASE: 'september-2020',
    HOST: 'localhost'
};
