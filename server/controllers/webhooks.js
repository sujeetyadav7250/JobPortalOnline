import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage Clerk user with database
export const clerkWebhooks = async (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    
    // Ensure webhook secret is configured
    if (!webhookSecret) {
      console.log("Missing CLERK_WEBHOOK_SECRET");
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }
    
    // Get the Svix headers
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];
    
    // If there are no Svix headers, error out
    if (!svixId || !svixTimestamp || !svixSignature) {
      console.log("Missing Svix headers");
      return res.status(400).json({ success: false, message: 'Missing Svix headers' });
    }

    // Get the body as a string from the raw request
    const payload = req.body;
    let payloadString;
    
    if (Buffer.isBuffer(payload)) {
      // If payload is a Buffer (from express.raw), convert to string
      payloadString = payload.toString('utf8');
    } else {
      // If payload is already an object, stringify it
      payloadString = JSON.stringify(payload);
    }
    
    console.log("Webhook payload received");
    
    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret);
    
    let evt;
    
    try {
      // Verify the webhook payload
      evt = wh.verify(payloadString, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch (err) {
      console.log("Webhook verification failed:", err.message);
      return res.status(400).json({ success: false, message: 'Webhook verification failed' });
    }
    
    // Get the parsed event data and type
    const { data, type } = evt;
    
    console.log("Webhook received:", type);

    // Handle the webhook
    switch (type) {
      case 'user.created': {
        console.log("User Created Data:", JSON.stringify(data, null, 2));
        
        // Format email - handle both regular and OAuth sign-ups
        let email = '';
        let name = '';
        let imageUrl = '';
        
        if (data.email_addresses && data.email_addresses.length > 0) {
          email = data.email_addresses[0].email_address;
        }
        
        // Handle name for both direct and OAuth sign-ups
        if (data.first_name || data.last_name) {
          name = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        } else if (data.username) {
          name = data.username;
        }
        
        // Get image URL
        if (data.image_url) {
          imageUrl = data.image_url;
        }
        
        // Final safety checks
        if (!email) {
          console.log("No email found in user data");
          if (data.primary_email_address_id) {
            console.log("Found primary email ID but no email content");
          }
        }
        
        const userData = {
          _id: data.id,
          email: email,
          name: name,
          image: imageUrl,
          resume: ''
        };

        console.log("Creating user with data:", userData);
        
        try {
          // Check if user already exists (might happen with OAuth sign-in)
          const existingUser = await User.findById(data.id);
          
          if (existingUser) {
            console.log("User already exists, updating instead");
            await User.findByIdAndUpdate(data.id, userData);
          } else {
            await User.create(userData);
            console.log("User created successfully");
          }
        } catch (dbError) {
          console.log("Database error creating user:", dbError.message);
        }
        
        break;
      }

      case 'user.updated': {
        console.log("User Updated Data:", JSON.stringify(data, null, 2));
        
        // Similar email and name handling as in user.created
        let email = '';
        let name = '';
        let imageUrl = '';
        
        if (data.email_addresses && data.email_addresses.length > 0) {
          email = data.email_addresses[0].email_address;
        }
        
        if (data.first_name || data.last_name) {
          name = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        } else if (data.username) {
          name = data.username;
        }
        
        if (data.image_url) {
          imageUrl = data.image_url;
        }
        
        const userData = {
          email: email,
          name: name,
          image: imageUrl,
        };

        console.log("Updating user with data:", userData);
        
        try {
          const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
          console.log("Update result:", updatedUser ? "Success" : "User not found");
          
          // If user doesn't exist (common with OAuth), create it
          if (!updatedUser) {
            console.log("User not found, creating new user");
            await User.create({
              _id: data.id,
              email: email,
              name: name,
              image: imageUrl,
              resume: ''
            });
            console.log("User created during update");
          }
        } catch (dbError) {
          console.log("Database error updating user:", dbError.message);
        }
        
        break;
      }

      case 'user.deleted': {
        console.log("Deleting user:", data.id);
        try {
          const deletedUser = await User.findByIdAndDelete(data.id);
          console.log("Delete result:", deletedUser ? "Success" : "User not found");
        } catch (dbError) {
          console.log("Database error deleting user:", dbError.message);
        }
        break;
      }

      default:
        console.log("Unhandled webhook type:", type);
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Webhook error:", error.message);
    res.status(500).json({ success: false, message: 'Webhooks Error' });
  }
};
