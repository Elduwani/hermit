// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function login(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body
    if (username === "username" && password === "password") {
        return res.status(200).json({
            status: true,
            name: req.body.username
        })
    }

    return res.status(401).json({
        status: false,
        message: "Invalid username or password"
    })
}
