
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs"; // Correct import for bcryptjs

// Define the TypeScript interface for the User document
interface IUser extends Document {
    name: string;
    email: string;
    isAdmin: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    clerkId: string;
    isValidPassword(password: string): Promise<boolean>; // Method to validate password
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true,
            minlength: [3, "Name must be at least 3 characters long"],
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            select: false, // Prevents password from being returned in queries by default
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Pre-save middleware to hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if the password hasn't changed

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.isValidPassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
