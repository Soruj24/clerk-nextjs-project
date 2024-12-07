import User from "@/model/User";
import connectDB from "../db";
import { NextResponse } from "next/server";

export const createUser = async (req: Request) => {
    try {
        await connectDB();

        // Parse request body
        const body = await req.json();
        const { name, email, password } = body;

        // Create a new user
        const newUser = await User.create({ name, email, password });

        // Return the created user as a response (excluding sensitive fields)
        return NextResponse.json({
            success: true,
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create user" },
            { status: 500 }
        );
    }
};
