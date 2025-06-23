import { Router } from "express";
import { db } from "../db/drizzle";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/login", async (req, res) => {
    const { address } = req.body;

  if (!address || typeof address !== 'string') {
    res.status(400).json({ message: "Wallet address is required" });
    return;
  }

  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.address, address));

    let user = existingUser[0];

    if (!user) {
      const inserted = await db
        .insert(usersTable)
        .values({ address })
        .returning();
      user = inserted[0];
    }

    res.cookie("wallet-address", address, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log(user)

    res.status(200).json({ message: "Login successful", user });
    return;
  } catch (error) {
    console.error("Login error:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
});


router.post("/logout", async(req, res) => {
  console.log("logout");
    res.clearCookie("wallet-address", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    res.status(200).json({ message: "Logged out successfully" });
    return;
})

export default router;