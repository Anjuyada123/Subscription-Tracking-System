
import mongoose from "mongoose";

const subscriptionsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Subscription is required'],
        trim:true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
        min:[0,'Price must be greater than 0']
    },
    currency:{
        type:String,
       enum:['INR','USD'],
       default:'INR'
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly'],
    },
    category:{
        type:String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:true,
        validator:(value)=> value <= new Date(),
         message:'Start date must be in the past',
    },

   renewalDate:{
    type:Date,
    required:true,
    validate:{
        validator:function(value){
            return value> this.startDate;
        },
        message:'Renewal date must be in the past',
    }
},
 user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true,
 }
},{timestamps:true});


//Auto-calculate renewal date if missig

subscriptionsSchema.pre('save',function(next){
     if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.startDate(this.renewalDate.getDate()+ renewalPeriods[this.frequency]);
     }

        if(this.renewalDate<new Date()){
            this.status='expired';
        }
          next();

});


