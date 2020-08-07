var notifications = {

    // saveNofication(){
    //     this.saveMessage(msg,type);
    // },

    saveMessage(msg,type){
        if(type !== 'message')
            type = 'notifications';
        let data = JSON.parse(localStorage.getItem(type));

        if(data){
            let temp = data.items.filter((el)=>{return el.id == msg.id });
            if(temp.length <=0){
                data.items.push(msg);
                data.count = data.items.length; 
            }
        }else{
            data = {count:1,items:[msg]};
        }
        localStorage.setItem(type,JSON.stringify(data));
    },
    get getOtherNotifications(){
        return localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications')) : {count:0,items:[]};
     },
    get getMessages(){
       return localStorage.getItem('message') ? JSON.parse(localStorage.getItem('message')) : {count:0,items:[]};
    },

    deleteMessage(id){
        let data = JSON.parse(localStorage.getItem('message'));
        let index = [];
        if(data){
            data.items.forEach((el,i)=>{
                if(el.id == id){
                    index.push(i);
                }
            });
        index.forEach(i=>{
            data.items.splice(i,1);
            data.count = data.items.length;
        });

        localStorage.setItem('message',JSON.stringify(data));
        }
    },

    clearAllNotifications(){
        localStorage.removeItem('message');
    },
    clearAllOtherNotifications(){
        localStorage.removeItem('notifications');
    },
    clearAllNotificationByType(type){
        let data = JSON.parse(localStorage.getItem('notifications'));
        let index = [];
        if(data){
            data.items.forEach((el,i)=>{
                if(el.type == type){
                    index.push(i);
                }
            });
        index.forEach(i=>{
            data.items.splice(i,1);
            data.count = data.items.length;
        });

        localStorage.setItem('notifications',JSON.stringify(data));
        }
    }
    
};

export default notifications;