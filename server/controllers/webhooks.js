// import { Webhook } from "svix";
// import User from "../models/User.js";

// // API Controller Function to manage clerk User with database

// export const clerkWebhooks = async (req, res) => {
//     try{

//         //Create a Svix instance with clerk webhook secret.
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         //Verifying Headers
//         await whook.verify(JSON.stringify(req.body),{
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         })

//         //Getting Data for different Events
//         const { data, type } = req.body

//         //Switch Case for different Events
//         switch (type) {
// <<<<<<< HEAD
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
// =======
//             case 'user.created':{

//                 const userData = {
//                     _id:data.id,
//                     email: data.email_addresses[0].email_addresses,
// >>>>>>> ea0fbc0276cd166f04f1dc357e9bdf8db86abdd2
//                     name: data.first_name + " " + data.last_name,
//                     image: data.image_url,
//                     resume: ''
//                 }
// <<<<<<< HEAD
            
//                 await User.create(userData)
//                 res.json({})
//                 break;
//             }
            

//             case 'user.updated': {
//                 const userData = {
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + " " + data.last_name,
//                     image: data.image_url,
//                 }
            
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res.json({})
//                 break;
//             }
            
// =======
//                 await User.create(userData)
//                 res.json({})
//                 break;

//             }

//             case 'user.updated':{
//                 const userData = {
//                     email: data.email_addresses[0].email_addresses,
//                     name: data.first_name + " " + data.last_name,
//                     image: data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id,userData)
//                 res.json({})
//                 break;
//             }
// >>>>>>> ea0fbc0276cd166f04f1dc357e9bdf8db86abdd2

//             case 'user.deleted':{
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
                
//             }

//             default :
//             break;
 
//         }

//     } catch(error){
//         console.log(error.message);
//         res.json({success:false,message:'Webhooks Error'})


//     }
// }


import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage Clerk user with database
export const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with Clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Getting Data for different Events
    const { data, type } = req.body;

    // Switch Case for different Events
    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        };

        await User.create(userData);
        res.json({});
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        res.json({});
        break;
    }

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Webhooks Error' });
  }
};
