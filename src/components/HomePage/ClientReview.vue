<template>
    <v-container grid-list-xs>
        <v-row class="mt-5">
             <v-col>
                    <div class="heading text-center">
                        <h2>CLIENT REVIEWS</h2>
                    </div>
                </v-col>
        </v-row>
        <v-row class="d-md-none d-block">
            <v-col :cols="12" :md="4">
                <div class="toy-mob">
                    <img src="../../assets/images/toy.png" alt="" style="width:62px">
                </div>
                <div class="cat-mob">
                    <img src="../../assets/images/cat.png" alt="">
                </div>
            </v-col>
          
        </v-row>
        <v-row>
            <v-col :cols="12" :md="4"  class="d-md-block d-none">
                <div class="toy">
                    <img src="../../assets/images/toy.png" alt="">
                </div>
                <div class="cat">
                    <img src="../../assets/images/cat.png" alt="">
                </div>
                
            </v-col>
            <v-col :cols="12" :md="8" class="ma-auto">
                <carousel :responsive="{0:{items:1},600:{items:2},1000:{items:2}}" v-bind:nav="false" v-bind:margin=5 :autoplayHoverPause="true" v-bind:autoWidth="false" v-bind:autoplay='true' v-bind:dots="true" v-bind:loop='true' >
                <div class="item" v-for="(review,i) of reviews" :key="i" >
                    <v-card
                        class="mx-5 px-10"
                        color="#ebebeb"
                        style="border: 1px solid #2c7873;position:relative;"
                        dark
                    >
                        <v-card-text class="headline font-weight-bold;">
                        <v-row class="justify-center">
                            <h3 style="color:#2c7873;font-weight:bold;display:block">{{review.name}}</h3>
                        </v-row>
                        <v-row>
                            <v-icon color="#2c7873" style="font-size:3rem">mdi-format-quote-open</v-icon>
                        </v-row>
                        <v-row class="justify-center black--text ma-5">
                         <label style="text-align: -webkit-center;font-size: 13px;font-weight: 500;">{{review.desc}}</label>
                        </v-row>
                        <div class="avatar-box">
                            <v-list-item-avatar color="grey darken-3" style="margin:0;width:62px;height:62px">
                            <v-img
                                class="elevation-6"
                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                            </v-list-item-avatar>
                        </div>
                        </v-card-text>
                    </v-card>
                </div>
                </carousel>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>
import carousel from 'vue-owl-carousel'
export default {
    name:'ClientReview',
    components:{carousel},

    data :()=>({
        reviews:[
            {name:"Evan You",desc:"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",image:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
            {name:"ABC You",desc:"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",image:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
            {name:"EFD You",desc:"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",image:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
            {name:"EFD You",desc:"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",image:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"},
            {name:"xyzs",desc:"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.",image:"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"}
        ],
        
    }),
    
}
</script>
<style scoped>

  .heading h2{
    color: #2c7873;
    font-weight: 620;
    text-align: center;
    font-size: 1.5em;
}

    .heading h2:before,
    .heading h2:after {
    background-color: #2c7873;
    content: "";
    display: inline-block;
    height: 2px;
    position: relative;
    vertical-align: middle;
    width: 5%;
    }

    .heading h2:before {
    right: 0.5em;
    margin-left: -50%;
    }

    .heading h2:after {
    left: 0.5em;
    margin-right: -50%;
    }
    .cat img {
            width: 76%;
    float: right;
    margin-right: -36px;
    margin-top: 21px;
    /* border-bottom: 2px solid #2c7873; */
    }
    .toy img{
        float: right;
    margin-top: -57px;
    margin-right: -15px;
    width: 62px;
    }
    .toy-mob:nth-child(1){
            text-align: center;
    margin-top: 10px;
    }
    .cat-mob:nth-child(2){
        padding-left: 30%;
    }
    
    .cat-mob img{
        width: 30%;
        /* margin-top: 20px; */
        /*  */
    }
   .toy-mob img{
       margin-top: -50px;
   }
   .item{
       height: 315px;
   }
   .avatar-box{
       position: absolute;
    left: 50%;
    transform: translate(-50%, -25%);
    border: 2px solid #2c7873;
    border-radius: 50%;
    padding: 0;
    width: 62px;
    height: 62px;
    overflow: hidden;
    box-sizing: content-box;
   }
 span{
border: 2px solid #2c7873 !important;
   }
</style>