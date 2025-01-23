import User from "@/models/user";
import bcryptjs from "bcryptjs";
import connection from "@/database/config";

// Initialize the database connection
connection();

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { name, username, password } = body;

        // Validate required fields
        if (!name || !username || !password) {
            return new Response(
                JSON.stringify({ error: "Name, username, and password are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "User already exists" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        return new Response(
            JSON.stringify({ message: "User saved successfully" }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Internal server error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
