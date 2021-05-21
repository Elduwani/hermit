// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'db'

export default async function departments(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        let response, id = req.query.id as string

        if (id) {
            response = await prisma.course.findUnique({ where: { id: id } })
        } else {
            response = await prisma.course.findMany()
        }
        return res.status(200).json(response)
    }

    if (req.method === "POST") {
        const { body } = req
        if (body) await prisma.course.create({ data: body })
        return res.status(200).json(body)
    }

}