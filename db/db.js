const {Schema, model}=require('mongoose');

const LinkSchema=new Schema({
    originallink:{type:String,},
    castomlink:{type:String,unique:true},
    number_of_visits:{type:Number},
    datecreate:{type:Date},
    datelastuse: {type: Date},

})


module.exports=model('Link',LinkSchema);