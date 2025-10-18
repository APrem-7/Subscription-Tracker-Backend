import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
//here we are going to set the difrfernt types of datya we are going t5o store here
   name:{
        type:String,
        required:[true,'User Name is required'],
        trim:true,
        minlength:2,
        maxlength:50,

    },
    price:{
      type:Number,
      min:[0,'Price Must be greater than equal to zero'],
      required:[true,'Subscription price is required'],
    },
    currency:{
      type:String,
      enum:['INR','USD','EUR','GBP'],
      default:'INR',
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly'],
        required:true,
    },
    payment:{
           type:Number,
           required:true,
           validate:{
            validator:(value)=> value <= new Date()
          },
          message:'Start date must be in the past',
        },
    renewalDate:{
          type:Number,
           required:true,
           validate:{
            validator:function(value){ 
              return value > this.startDate;
            }

            },
          message:'Renewal Date Must be after the start date',
       
    },
    user:{
      type:mongoose.Scheme.Types.ObjectId,
      ref:'User',
      required:true,
      index:true,
    }
},{timestamps:true});

//now creating a funciton berfre each one of the documents will happen

//autocalculate the renewal date if messing
subscriptionSchema.pre('save',function(next){
  if(!this.renewalDate){
    const renewalPeriods={
      daily:1,
      weekly:7,
      monthly:30,
      yearly:365,
    }
     this.renewalDate = new Date(this.startDate);
     this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency])
     //so basically this is calculating the renewal date or in other wordws the expiry date we can say
  // Step by step:
// getDate() → 15
// renewalPeriods['weekly'] → 7
// 15 + 7 → 22
// setDate(22) → Oct 22, 2025

// Result: renewalDate = Oct 22, 2025



// Step by step:
// getDate() → 28
// renewalPeriods['weekly'] → 7
// 28 + 7 → 35
// setDate(35) → JavaScript automatically converts to Nov 4, 2025

// Result: renewalDate = Nov 4, 2025
 
  }//if ends here


  //so basically what is going on here is that depending on the frequency we have slected
  //the autorenewal will take it like months dialy weekly etc etc etc



    //auto updating the status if renewal date has passed 
    if(this.renewalDate < new Date()){
      this.status='expired';
    }

    next();
})

//this whole pre function can be thought of as a middleware.....cause the pre is running before and then the next is called 
//somthing like that
