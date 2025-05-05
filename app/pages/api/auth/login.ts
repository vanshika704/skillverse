import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import User from '@/app/models/user'
import jwt from 'jsonwebtoken'
import { connectToDB } from '@/app/config/db'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  await connectToDB();

  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials.' })

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials.' })

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' })

  res.status(200).json({ message: 'Login successful.', token })
}
