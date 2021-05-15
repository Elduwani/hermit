// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'db'

export default async function faculties(req: NextApiRequest, res: NextApiResponse) {
    const faculties = await prisma.faculty.findMany()
    return res.status(200).json(faculties)
}