module.exports = {
    db: {
        dialect: 'mysql',
        host: 'localhost',
        database: 'nodetest',
        username: 'root',
        password: '123456'
    },
    middleware: ['logger'] // 以数组形式，保证执行顺序
}
