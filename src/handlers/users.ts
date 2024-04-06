import { comparePasswords, createJWT, hashPassword } from "../middlewares/auth"
import prisma from "../db"

export const createNewUser = async (req, res) => {
    const isUser = await prisma.user.findUnique({
        where: {
          username: req.body.username
        }
      })
    if(isUser){
        res.status(402)
        res.json({message: 'username already exist, Please try another'})
        return
    }
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
          }
    })
    const token = createJWT(user)
    res.json({ token })
}

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
          username: req.body.username
        }
      })

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401)
        res.json({message: 'nope'})
        return
      }

      const token = createJWT(user)
      res.json({ token })
}