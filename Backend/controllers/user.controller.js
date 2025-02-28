import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import transporter from "../config/nodemailer.js";

// REGISTER CONTROLLER

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  const exsitUser = await userModel.findOne({ email });
  if (exsitUser) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //sending email

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to Social Media App",
    text: `Hi ${name}, Welcome to Social Media App. We are glad to have you with us. Your account has been created with email id ${email}`,
  };

  await transporter.sendMail(mailOptions);

  return res
    .status(201)
    .json({ message: "User created successfully", success: true });
};

// LOGIN CONTROLLER

export const login = async (req, res) => {
  // implement login logic here
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", success: false });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", success: false });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ message: "Login successful", success: true });
};

// LOGOUT CONTROLLER

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res
      .status(200)
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// VERIFY OTP CONTROLLER

export const verifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ message: "Account already verified", success: false });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Hi ${user.name}, Your OTP for account verification is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// VERIFY EMAIL CONTROLLER

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.status(400).json({ message: "Missing Details", success: false });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verification Success",
      text: `Hi ${user.name}, Your account has been verified successfully`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Email verified successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// CHECK LOGGED IN CONTROLLER

export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ message: "Authorized", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// PASSWORD RESET CONTROLLER

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Hi ${user.name}, Your OTP for password reset is ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// RESET PASSWORD CONTROLLER

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset Success",
      text: `Hi ${user.name}, Your password has been reset successfully`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Password reset successful", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
