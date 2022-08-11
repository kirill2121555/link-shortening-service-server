const db = require('../db/db')
const { v4: uuidv4 } = require('uuid')
class Controller {

    async createlink(req, res) {
        try {
            const { link } = req.body
            console.log('createlink')
            //return res.json('jgfh:sdfs')
            const shortlink = uuidv4()
            while (true) {
                const cortege = await db.findOne({ castomlink: shortlink })
                if (!cortege) break;
            }
            const newlink = process.env.HOST + shortlink
            await db.create({ originallink: link, castomlink: shortlink, number_of_visits: 0, datecreate: new Date, datelastuse: new Date })
            return res.status(200).json(newlink)
        } catch (error) {
            return res.status(400).json('Failed to create link')
        }
    }

    async redirect(req, res) {
        try {
            const link = req.params.link
            const cortege = await db.findOne({ castomlink: link })
            console.log(cortege)
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
            console.log(cortege)
            //const cortege = await db.query(`SELECT * FROM link WHERE castomlink = $1`, [textlink])
            if (cortege) {    
                                          console.log('2')

                //  await db.query(`INSERT INTO link (originallink, castomlink,  number_of_visits, datecreate, datelastuse) values($1,$2,$3,$4,$5) RETURNING *`, [link, textlink, 0, new Date, new Date])
                              return res.status(200).json('Enter another text')

            }
            else {
                await db.create({ originallink: link, castomlink: textlink, number_of_visits: 0, datecreate: new Date, datelastuse: new Date, })
                return res.status(200).json(process.env.HOST + textlink)
            }
        } catch (e) {
            return res.status(400).json('Errorrrr')

        }
    }

    async statistics(req, res) {
        try {
            const { link } = req.body
            const linkk = link.replace(process.env.HOST, '')
            // const cortege = await db.query(`SELECT number_of_visits, datecreate, datelastuse FROM link WHERE castomlink = $1`, [linkk])
            const cortege = await db.findOne({ castomlink: linkk })
            if (!cortege) {
                return res.status(200).json('link not found')
            }
            return res.status(200).json(cortege)
        } catch (e) {
            return res.status(400).json('Error')
        }
    }

    async s(req, res) {
        res.json('kkkkk')
    }
}
module.exports = new Controller()


