import User from '../models/User.js'

// @desc    Add a new address
// @route   POST /api/users/address
export const addAddress = async (req, res) => {
  const { userId, address } = req.body; // Expects full address object

  try {
    const user = await User.findById(userId);
    if (user) {
      user.addresses.push(address);
      const updatedUser = await user.save();
      res.json(updatedUser.addresses);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all addresses
// @route   GET /api/users/address/:userId
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user.addresses);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

