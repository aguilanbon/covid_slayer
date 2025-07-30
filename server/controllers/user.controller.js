import express from "express";

export const createUser = (req, res) => {
  res.status(201).send({ message: "User created successfully" });
};

export const getUsers = (req, res) => {
  res.status(200).send({ message: "Users retrieved successfully" });
};

export default { createUser, getUsers };
