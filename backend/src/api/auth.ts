import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPass, comparePass } from "../utils/hashPass";
import prisma from "../db";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post(
  "/register",
  async function (req: Request<{}, {}, RegisterBody>, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!email || !password || !username) {
        return res.status(400).json({ error: "Все поля обязательны" });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: email }, { username: username }]
        }
      });

      if (existingUser) {
        return res.status(409).json({ 
          error: "Пользователь с таким email или именем уже существует" 
        });
      }


      const hashedPass = await hashPass(password);

      const newUser = await prisma.user.create({
        data: { username, email, password: hashedPass },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true
        }
      });


      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { 
        expiresIn: "7d" 
      });

      return res.status(201).json({ 
        user: newUser,
        token 
      });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }
);


router.post(
  "/login",
  async function (req: Request<{}, {}, LoginBody>, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email и пароль обязательны" });
      }

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({ error: "Неверный email или пароль" });
      }

      const isValidPassword = await comparePass(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Неверный email или пароль" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { 
        expiresIn: "7d" 
      });

      return res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }
);


router.post("/logout", async function (req: Request, res: Response) {
  return res.json({ message: "Выход выполнен успешно" });
});

export default router;