import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  type: { type: String, required: true }, // e.g., "Home", "Work"
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  mobile: { type: String } // Contact number for this address
});

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, // 'sparse' allows unique but optional (for OTP users)
    phone: { type: String, unique: true, required: true },
    password: { type: String }, // Optional because OTP users won't have one initially
    addresses: [addressSchema], // <--- ADD THIS
  },

  {timestamps: true}

);
const User = mongoose.model("User", userSchema);

export default User;