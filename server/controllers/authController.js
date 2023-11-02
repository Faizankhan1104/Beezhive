import UserModel from "../models/UserModel.js";


import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(email && name && password)) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const existingUser = await JobSeeker.findOne({ email });
        if (existingUser) {
            {
                return res.status(200).send({
                    success: false,
                    message: "Already Register please login",
                });
            }

            const hashedPassword = await hashPassword(password);
            const user = await UserModel.create({
                name,
                email,
                password: hashedPassword,
            });

            const token = jwt.sign(
                { id: user._id, email: user.email },
                'shhhhhhhh',
                { expiresIn: '2h' }
            );

            // Clear the password field from the response
            user.password = undefined;

            res.status(201).cookie('token', token).json({ user, token });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};
