import express from 'express'
export const  route2=express.Router();

route2.post('/fooddata',(req,res)=>{
   try {
    if (!global.fooditems) {
      console.warn("⚠️ global.fooditems is not loaded yet");
      return res.status(500).send("Food data not available");
    }

    res.send([global.fooditems,global.foodcategory]);
  } catch (error) {
    console.error("❌ Error in fooddata route:", error.message);
    res.status(500).send("Server error");
  }    
})
