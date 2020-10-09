module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    },
    production: {}
};