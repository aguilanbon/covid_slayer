import express from "express";
import User from "../models/User.js";

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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send({ message: "Error retrieving users" });
  }
};

export default { createUser, getUsers };
