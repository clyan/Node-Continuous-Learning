(async () => {
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('nodetest', 'root', '123456', {
        host: '139.199.206.195',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    //检测连接是否正常
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

//定义模型
    const Fruit = sequelize.define("Fruit", {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            get() {
                return this.getDataValue('name') + 'aa'
            }
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate:{
                isFloat:{
                    msg:'价格字段请输入数字'
                },
                min:{
                    args:[0],
                    msg:'价格字段必须大于0'
                }
            }
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        // 避免生成时间戳
        timeStamp: false,
        getterMethods:{
            amount()
            {
                return this.getDataValue("stock") + "kg";
            }
        },
        setterMethods:{
            amount(val)
            {
                const idx = val.indexOf('kg');
                const v = val.slice(0, idx);
                this.setDataValue('stock', v);
            }
        }
    }
)
//Fruit.sync({force:true}) 强制同步，如果表存在，先删除表
    let ret = await Fruit.sync()
    //新增
    ret = await Fruit.create({
        name: "香蕉",
        price: 3.5
    });


    //查询
    ret = await Fruit.findAll()
    console.log(JSON.stringify(ret))
    console.log('amount'+ret[0].amount)
    ret[0].amount ='120kg'
    ret[0].save()

    console.log('amount'+ret[0].amount)
    ret = await Fruit.findByPk(1)
    console.log(ret.get());

    ret = await Fruit.findOne({where:{name:'香蕉'}})
    console.log(ret.get());

    // 获取数据和总条数
    ret = await Fruit.findAndCountAll()
    console.log(ret.count);
    console.log(ret.rows.length);

    //查询操作符
    const Op=Sequelize.Op
    ret = await Fruit.findAll({
        where:{
            price:{
                [Op.lt]:4,
                [Op.gt]:2
            }
        }
    })
    console.log(ret.length);

    //或语句
    ret = await Fruit.findAll({
        where:{
            price:{
                [Op.or]:[
                    {[Op.lt]:4},
                    {[Op.gt]:2}
                ]
            }
        }
    })
    // 分页
    Fruit.findAll({    offset: 0,     limit: 2, })

    //聚合函数
    ret = await Fruit.sum("price")
    console.log("sum", ret);
    ret = await Fruit.max("price")
    console.log("max", ret);

    //更新
    ret = await Fruit.findAll({
        where:{
            price:{
                [Op.gte]:1.5
            }
        }
    })

   ret =await Fruit.update({price:sequelize.literal('`price` +3.5')}, {where:{price:{[Op.gte]:1.5}}})
    console.log(ret)

    //删除
    ret =await Fruit.destroy({where:{
            price:{
                [Op.gte]:5
            }
        }})
})()


