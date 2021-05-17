// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'db'

export default async function departments(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string
    let response

    if (id) {
        response = await prisma.department.findUnique({
            where: { id: id }
        })
    } else {
        response = await prisma.department.findMany()
    }
    return res.status(200).json(response)
}