import userModel from '../models/user.model.js';

export const getUserData = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Missing Details", success: false });
  }

  try {

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified
      },
      success: true 
      });
    
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}