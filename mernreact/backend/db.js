import mongoose from 'mongoose';

const mongURL='mongodb+srv://allamrajusaiprasad0:Powerstar%409@cluster0.q0iggp6.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0'

 const mongoDB = async () => {
  try {
    await mongoose.connect(mongURL);
    console.log('✅ Connected to MongoDB');

    const fetchedData =  mongoose.connection.db.collection("fooditems");
    const foodcatdata=mongoose.connection.db.collection("foodcategory");

      const data=await fetchedData.find({}).toArray();
      const catdata=await foodcatdata.find({}).toArray();
      
      global.fooditems=data;
      global.foodcategory=catdata;
     // console.log(global.fooditems);
      //console.log(global.foodcategory);
   
  } catch (err) {
    console.error('❌ MongoDB connection or query error:', err);
  }
};

export { mongoDB };
