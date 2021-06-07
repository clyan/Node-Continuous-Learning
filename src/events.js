var events =require("events");

var eventEmitter = new events.EventEmitter()


eventEmitter.on('evenName',eventHandler)

function eventHandler(){
  console.log("链接成功")
}
eventEmitter.emit('evenName')
eventEmitter.removeAllListeners()


console.log(process.memoryUsage());
