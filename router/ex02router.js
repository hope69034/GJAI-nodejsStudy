const express = require("express");
const ex02router = express.Router();


//ex02라우터
ex02router.post("/ex02", (request, response) => {

  request.session.user={
    id: request.body.id,
    pw: request.body.pw
  }

  response.render("ex02", {
      user: request.session.user,
    });
  }  
);



//
ex02router.get("/ex02logout", (request, response) => {
console.log(request.session.user)
    delete request.session.user
    console.log(request.session.user)

    response.redirect("http://127.0.0.1:5501/public/ex02.html")
    
}    
);



module.exports = ex02router; //라우터를외부에서사용할수있게







//ex02라우터
/* ex02router.post("/ex02", (request, response) => {
  let id = request.body.id;
  let pw = request.body.pw;

  if ("smart" == id && "1234" == pw) { */
    /* 세션공간의 user오브젝트에 키id밸류smart를 저장한다 */
/*     request.session.user = { */
 /*      id: "smart",  *///세션 공간에 유저라는이름으로 스마트라는 데이터를 담는다
/*     };
    response.render("ex02", {
      user: request.session.user,
    });
  } */

/*   else {
    response.redirect("http://127.0.0.1:5501/public/ex02.html");
  }

});
 */
//
/* ex02router.get("/ex02logout", (request, response) => {

    delete request.session.user
    response.redirect("http://127.0.0.1:5501/public/ex02.html")
    
}    
);
 */

/* 
module.exports = ex02router; */ //라우터를외부에서사용할수있게
