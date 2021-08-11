var express = require('express')
var router = express.Router()

const signout = (req,res) => {
    res.json({
        message: "signed out mf"
    })
} 

router.get("/signout", signout)

module.exports = router;