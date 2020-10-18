export class EventBus {
  constructor(){
      this.msgQueues = {};
  }
  // 将消息保存到当前的消息队列中
  $on(msgName, func) {
      if (this.msgQueues.hasOwnProperty(msgName)) {
          this.msgQueues[msgName].push(func);
      } else {
          this.msgQueues[msgName] = [func];
      }
  }
  // 消息队列中仅保存一个消息
  $one(msgName, func) {
      // 无需检查msgName是否存在
      this.msgQueues[msgName] = [func];
  }
  // 发送消息
  $emit(msgName, msg) {
      if (!this.msgQueues.hasOwnProperty(msgName)) {
          return Promise.resolve();
      }
      let rs = [];
      this.msgQueues[msgName].map((fn) => {
          let r = fn(msg)
          if(r instanceof  Promise){
              rs.push(r);
          }
      });
      return Promise.all(rs);
  }
  // 移除消息
  $off(msgName, func) {
      if (!this.msgQueues.hasOwnProperty(msgName)) {
          return
      }
      if(func){
        const index = this.msgQueues[msgName].findIndex(item => item === func)
        this.msgQueues[msgName].splice(index, 1)
      }else {
          delete this.msgQueues[msgName]
      }     
  }
}
export default {
  install(Vue){
    Vue.prototype.$bus = new EventBus()
  }
}
