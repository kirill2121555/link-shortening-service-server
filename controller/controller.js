const db = require('../db/db')
const { v4: uuidv4 } = require('uuid')
const qr = require('qrcode')

async function code(link) {
    try {
        return await qr.toDataURL(link)
    } catch (err) {
        return error(err)
    }
}

class Controller {

    async createlink(req, res) {
        try {
            const { link } = req.body
            const shortlink = uuidv4()
            while (true) {
                const cortege = await db.findOne({ castomlink: shortlink })
                if (!cortege) break;
            }
            const newlink = process.env.HOST + shortlink
            await db.create({ originallink: link, castomlink: shortlink, number_of_visits: 0, datecreate: new Date, datelastuse: new Date })
            const a = await code(newlink)
            return res.status(200).json([a, newlink])
        } catch (error) {
            return res.status(400).json('Failed to create link')
        }
    }

    async redirect(req, res) {
        try {
            const link = req.params.link
            const cortege = await db.findOne({ castomlink: link })
            await db.updateOne({ _id: cortege._id }, { number_of_visits: Number(cortege.number_of_visits) + 1, datelastuse: new Date })
            return res.redirect(cortege.originallink)
        } catch (e) {
            return res.status(400).json('Error')
        }
    }

    async createcastomlink(req, res) {
        try {
            const { link, textlink } = req.body
            const cortege = await db.findOne({ castomlink: textlink })
            if (cortege) {
                return res.status(200).json('Enter another text')
            }
            else {
                await db.create({ originallink: link, castomlink: textlink, number_of_visits: 0, datecreate: new Date, datelastuse: new Date, })
                const qrcode = await code(process.env.HOST + textlink)
                const response = [process.env.HOST + textlink, qrcode]
                return res.status(200).json(response)
            }
        } catch (e) {
            return res.status(400).json('Error')
        }
    }

    async statistics(req, res) {
        try {
            const { link } = req.body
            const linkk = link.replace(process.env.HOST, '')
            const cortege = await db.findOne({ castomlink: linkk })
            if (!cortege) {
                return res.status(200).json('link not found')
            }
            return res.status(200).json([cortege, await code(link)])
        } catch (e) {
            return res.status(400).json('Error')
        }
    }

}
module.exports = new Controller()


