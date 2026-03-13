import express, { Request, Response } from "express";
import { hashPass } from "../utils/hashPass";
import prisma from "../db";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

const router = express.Router();

router.post("/login", async function (req: Request, res: Response) {
  return res.sendStatus(200);
});

router.post("/logout", async function (req: Request, res: Response) {
  return res.sendStatus(200);
});

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
          OR: [
            { email: email },
            { username: username }
          ]
        }
      });

      if (existingUser) {
        return res.status(409).json({ error: "Пользователь с таким email или именем уже существует" });
      }

      const hashedPass = await hashPass(password);

      const newUser = await prisma.user.create({
        data: { username, email, password: hashedPass },
        select: {
          id: true,
          username: true,
          email: true,
          createAt: true
        }
      });

      return res.status(201).json({ user: newUser });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  },
);

export default router;