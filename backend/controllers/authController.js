// import jwt from 'jsonwebtoken'
// import User from '../models/User.js';
// import bcrypt from 'bcryptjs'



// // generate token
// const generateToken = (id)=>{
//     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
// };


// // regiter user

// export const registerUser  = async (req, res)=>{
//     const {name, email, phone, password} = req.body;

//     if(!name || !email || !phone || !password){
//         return res.status(400).json({ message: "Please fill all fields" });
//     }


// // Check if user exists
//   const userExists = await User.findOne({ $or: [{ email }, { phone }] });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   // Hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // Create User
//   const user = await User.create({
//     name,
//     email,
//     phone,
//     password: hashedPassword,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } else {
//     res.status(400).json({ message: "Invalid user data" });
//   }
//   };

//  // Login with Email & Password
// // POST /api/auth/login-password
// export const loginWithPassword = async (req, res) => {
//   const { email, password } = req.body;

//   // Check for user email
//   const user = await User.findOne({ email });

//   // Check Password
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } else {
//     res.status(400).json({ message: "Invalid credentials" });
//   }
// };



// // Step 1: Request OTP
// //POST /api/auth/login
// export const loginUser = async (req, res) => {
//   const { phone } = req.body;
//   if (!phone) {
//     return res.status(400).json({ message: "Phone number required" });
//   }
  
//   // In a real app, you would send an SMS here via Twilio/Fast2SMS
//   console.log(`Mock OTP for ${phone}: 1234`); 
  
//   res.json({ message: "OTP sent successfully" });
// };

// // @desc    Step 2: Verify OTP and Get Token
// // @route   POST /api/auth/verify
// export const verifyOTP = async (req, res) => {
//   const { phone, otp } = req.body;

//   // Mock OTP Check
//   if (otp !== "1234") {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }

//   // Find or Create User
//   let user = await User.findOne({ phone });
  
//   if (!user) {
//     user = await User.create({ phone });
//   }

//   res.json({
//     _id: user._id,
//     phone: user.phone,
//     name: user.name,
//     token: generateToken(user._id),
//   });
// };





import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import bcrypt from 'bcryptjs'

// generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
};

// Register User
export const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            
            // ✅ ADDED THIS LINE 👇
            phone: user.phone, 
            
            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// Login with Email & Password
export const loginWithPassword = async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    // Check Password
    // Note: Use 'user.password' inside compare, assuming user exists
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,

            // ✅ ADDED THIS LINE 👇
            phone: user.phone, 

            token: generateToken(user.id),
        });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
};

// ... (Rest of your OTP logic is fine) ...
// Step 1: Request OTP
export const loginUser = async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ message: "Phone number required" });
    }
    console.log(`Mock OTP for ${phone}: 1234`);
    res.json({ message: "OTP sent successfully" });
};

// Step 2: Verify OTP
export const verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;

    if (otp !== "1234") {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
        user = await User.create({ phone });
    }

    res.json({
        _id: user._id,
        phone: user.phone, // This was already correct!
        name: user.name,
        token: generateToken(user._id),
    });
};