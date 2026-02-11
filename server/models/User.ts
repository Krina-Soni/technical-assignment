import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true }, 
  password: { type: String, required: true }, 
  name: { type: String, required: true },
  role: { type: String, default: "customer" }, 
  refreshTokens: [{ type: String }], 
  lastLogin: { type: Date }
}, { timestamps: true });


UserSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 8); 
});

export default mongoose.model("User", UserSchema);