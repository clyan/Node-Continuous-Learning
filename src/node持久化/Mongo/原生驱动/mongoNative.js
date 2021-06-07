const MongoClient = require("mongodb").MongoClient;
// 连接URL
const url = "mongodb://localhost:27017";

// 数据库名
const dbName = "test";

(async function () {
    // 0.创建客户端
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        // 1.连接数据库(异步)    
        await client.connect();
        console.log("连接成功");
    } catch (error) {
        console.error(error);
    }
    const db = client.db(dbName);

    // 3.获取集合    
    const fruitsColl = db.collection("fruits");

    // 4.插入文档（异步）
    let r;
    r = await fruitsColl.insertOne({name: "芒果", price: 20.0});
    console.log("插入成功", r.result);

    // 5.更新文档（异步）
    r = await fruitsColl.updateOne({ name: "芒果" }, { $set: { price: 19.8 } });
    console.log("更新成功", r.result);
    // 6.查询文档  
    r = await fruitsColl.find().toArray();
    console.log('查询结果', r);


    await client.close();

})()
