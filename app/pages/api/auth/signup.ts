import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import User from '@/app/models/user'
import { connectToDB } from '@/app/config/db'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  await connectToDB();

  const existingUser = await User.findOne({ email })
  if (existingUser) return res.status(409).json({ message: 'Email already exists.' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({ name, email, password: hashedPassword })
  await newUser.save()

  res.status(201).json({ message: 'User registered successfully.' })
}
