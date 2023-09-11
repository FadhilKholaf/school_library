const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
app.use(cors())
const memberRoute = require('./routes/member.route')
const adminRoute = require('./routes/admin.route')
app.use('/member', memberRoute)
app.use('/admin', adminRoute)
app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port ${PORT}`)
})