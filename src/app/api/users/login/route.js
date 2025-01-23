import User from "@/models/user";
import bcryptjs from "bcryptjs";
import connection from "@/database/config";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Initialize the database connection
connection();

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { username, password } = body;

        // Validate required fields
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        // Check if the user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return NextResponse.json(
                { error: "Username does not exist" },
                { status: 400 }
            );
        }

        // Validate the password
        const validPassword = await bcryptjs.compare(password, existingUser.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 400 }
            );
        }

        // Generate a JWT token
        const tokenData = {
            username: existingUser.username,
            id: existingUser._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: "1d" });

        // Set the token as an HTTP-only cookie
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("token", token, { httpOnly: true, secure: true });

        return response;
    } catch (error) {
        console.error("Internal server error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
};
