//[기본]app변수로 express구동 [기본]
const express = require("express");
const app = express();
//[기본]라우터경로
const router = require("./router/router.js");
//[기본]바디파서
const bodyparser = require("body-parser");

// (ejs) ejs
let ejs = require("ejs"); // 이 코드에서는 이 ejs변수는 쓰지 않는다 아래 "ejs"는 문자가 아니라 set의 기능이다
// (ejs) ejs 파일을 view폴더에  // app.use는우리가만들어서스는 것 set은 이미 잇는 속성/기능
app.set("view engine", "ejs");

// {session}
let conn = {
  host: "127.0.0.1",
  user: "cshuser",
  password: "cshpass",
  port: "3306",
  database: "nodejs_db",
};
const mysql_session = require("express-mysql-session");
let conn_session = new mysql_session(conn);
const session = require("express-session");

//[기본]바디파서를 포스트로 쓰겠다
app.use(bodyparser.urlencoded({ extended: false })); // app use router 위에와야함
app.use(
  session({
    //미들웨어로 세션기능 (저장위치:mysql)등록?
    secret: "smart",
    resave: false, // 매번서버에저장을할건지
    saveUninitialized: true, //서버를시작할때세션을초기화를할건지
    store: conn_session,
  })
);

//public . assets,images폴더 연결
app.use(express.static("./public"));

const ex01router = require("./router/ex01router.js");
app.use(ex01router);
const ex02router = require("./router/ex02router.js");
app.use(ex02router);
//세션확인용
/* const sessionRouter=require('./router/sessionRouter.js'); */
/* app.use(sessionRouter); */

//[기본]라우터구동
app.use(router); //미들웨어로 라우터를 등록해주기

//[기본]포트설정 127.0.0.1.3001
app.listen(3001); // 현재 서버파일의 port번호설정
