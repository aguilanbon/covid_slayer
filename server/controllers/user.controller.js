import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { fullName, email, password, avatar } = req.body;
  try {
    const user = await User.create({ fullName, email, password, avatar });
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Error creating user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    res
      .status(200)
      .send({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Error logging in" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send({ message: "Error retrieving users" });
  }
};

export default { createUser, getUsers, loginUser };
