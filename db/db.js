const Pool = require('pg').Pool
const pool = new Pool({
    user: 'gwsccdhssjkjrj',
    password: 'c152c3cd7f224d0f9326c6df7426385f7f7ad31eff8b4422b48c3a4947da3dd3',
    host: 'ec2-52-210-97-223.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd60p5nsortrthm',
})

module.exports = pool