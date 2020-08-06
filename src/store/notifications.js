var notifications = {

    saveNofication(){

    },

    saveMessage(msg){
        let data = JSON.parse(localStorage.getItem('messages'));
        if(data){
            data.count = data.count - 1; 
            data.items.push(msg);
        }else{
            data = {count:1,items:msg};
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
            data.count = data.count - 1;
        });

        localStorage.setItem('messages',JSON.stringify(data));
        }
    }
};

export default notifications;