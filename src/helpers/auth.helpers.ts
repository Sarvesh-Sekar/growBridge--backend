import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "hi";

export class AuthHelper {
  static async encryptText(text: string) {
    const saltRounds = 10;
    const hashedText = await bcrypt.hashSync(text, saltRounds);
    return hashedText;
  }

  static async compareText(text1: string, text2: string) {
    return await bcrypt.compareSync(text1, text2);
  }

  static async generateToken(userId: string, role: string) {
    const token = jwt.sign(
      {
        userId,
        role,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    console.log(token);
    return token;
  }
}
