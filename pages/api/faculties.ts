// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function faculties(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query)
    return res.status(200).json({
        status: true,
        data: []
    })
}