module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/sep-2020',
    PORT: 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'test@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '666',
    // Sequelize
    USER: process.env.USER || 'root',
    ROOT_DB_PASSWORD: process.env.ROOT_DB_PASSWORD || '666',
    DATABASE: process.env.DATABASE || 'september-2020',
    HOST: process.env.HOST || 'localhost',
    DB_TYPE_MYSQL: process.env.DB_TYPE_MYSQL || 'mysql'
};
