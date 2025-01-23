import { NextResponse } from "next/server";
import connection from "@/database/config";

// Initialize the database connection
connection();

export const POST = async () => {
  try {
    // Clear the token cookie
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/", // Ensure global cookie scope
      expires: new Date(0), // Invalidate the cookie
    });

    return response;
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
