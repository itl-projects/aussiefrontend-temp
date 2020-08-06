var notifications = {

    saveNofication(){

    },

    saveMessage(msg){
        let data = JSON.parse(localStorage.getItem('messages'));
        
        if(data){
            let temp = data.items.filter((el)=>{return el.id == msg.id });
            if(temp.length <=0){
                data.items.push(msg);
                data.count = data.items.length; 
            }
        }else{
            data = {count:1,items:[msg]};
        }
        localStorage.setItem('messages',JSON.stringify(data));
    },
    get getMessages(){
       return localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : {count:0,items:[]};
    },
    deleteMessage(id){
        let data = JSON.parse(localStorage.getItem('messages'));
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

        localStorage.setItem('messages',JSON.stringify(data));
        }
    },
    clearAllNotifications(){
        localStorage.removeItem('messages');
    }
};

export default notifications;