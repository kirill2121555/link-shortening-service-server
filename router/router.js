const Router=require('express')
const router=new Router()
const controller=require('../controller/controller')

router.post('/createlink', controller.createlink)
router.get('/link/:linkk', controller.redirect)
router.post('/createcastomlink', controller.createcastomlink)
router.post('/linkstatistics', controller.statistics)


module.exports=router