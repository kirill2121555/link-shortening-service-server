const db = require('../db/db')
const { v4: uuidv4 } = require('uuid')

class Controller {

    async createlink(req, res) {
        try {
            const { link } = req.body
            console.log('createlink')
            const shortlink = uuidv4()
            while (true) {
                const cortege = await db.query(`SELECT * FROM link WHERE castomlink = $1`, [shortlink])
                if (cortege.rows.length === 0) break;
            }
            const newlink = process.env.HOST + shortlink
            await db.query(`INSERT INTO link (originallink, castomlink,  number_of_visits, datecreate, datelastuse) values($1,$2,$3,$4,$5) RETURNING *`, [link, shortlink, 0, new Date, new Date])
            return res.status(200).json(newlink)
        } catch (error) {
            return res.status(400).json('Failed to create link')
        }
    }

    async redirect(req, res) {
        try {
            const link = req.params.link
            const cortege = await db.query(`SELECT * FROM link WHERE castomlink = $1`, [link])
            await db.query(`UPDATE link SET number_of_visits=$1, datelastuse=$2 WHERE id= $3`, [Number(cortege.rows[0].number_of_visits) + 1, new Date, cortege.rows[0].id])
            return res.redirect(cortege.rows[0].originallink)
        } catch (e) {
            return res.status(400).json('Error')
        }
    }

    async createcastomlink(req, res) {
        try {
            const { link, textlink } = req.body
            const cortege = await db.query(`SELECT * FROM link WHERE castomlink = $1`, [textlink])
            if (cortege.rows.length === 0) {
                await db.query(`INSERT INTO link (originallink, castomlink,  number_of_visits, datecreate, datelastuse) values($1,$2,$3,$4,$5) RETURNING *`, [link, textlink, 0, new Date, new Date])
                return res.status(200).json(process.env.HOST + textlink)
            }
            else {
                return res.status(200).json('Enter another text')
            }
        } catch (e) {
            return res.status(400).json('Errorrrr')

        }
    }

    async statistics(req, res) {
        try {
            const { link } = req.body
            const linkk = link.replace(process.env.HOST, '')
            const cortege = await db.query(`SELECT number_of_visits, datecreate, datelastuse FROM link WHERE castomlink = $1`, [linkk])
            if (cortege.rows.length === 0) {
                return res.status(200).json('link not found')
            }
            return res.status(200).json(cortege.rows[0])
        } catch (e) {
            return res.status(400).json('Error')
        }
    }
    
}
module.exports = new Controller()


