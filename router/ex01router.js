const express = require("express");
const ex01router = express.Router();
//ex01라우터
ex01router.get("/ex01", (request, response) => {
    let name = request.query.name;
    let aaaa = request.query.aaaa;
    console.log(request.query) //{ name: '1', aaaa: 'spring' }
    response.render("ex01", {
        name: name,
        aaaa: aaaa,
    });
});
module.exports = ex01router; //라우터를외부에서사용할수있게
