const http = require('http')
const url = require('url')
const router = []
class Application {
    get(path,handler){
        router.push({
            path,
            method:'GET',
            handler
        })
    }
    listen(){
        const server =http.createServer((req,resp)=>{
            const {pathname} =url.parse(req.url,true)


            router.find(v=>pathname === v.path && req.method.toLocaleUpperCase() === v.method).handler(req,resp).handler(req,resp)

            // for(const item of router){
            //     const {path,method,handler} =item
            //     console.log(path,pathname,req.method.toLocaleUpperCase(),method)
            //     if(pathname === path && req.method.toLocaleUpperCase() === method){
            //         return handler(req,resp)
            //     }
            // }
        })
        server.listen(...arguments)
    }
}

module.exports = function createApplication(){
    return new Application()
}
