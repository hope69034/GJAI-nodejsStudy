const express = require('express');
const router = express.Router();

const conn = require('../config/DBConfig.js')

// 0 메인페이지   http://127.0.0.1:3001/Main
router.get('/main', (request, response) => {
    response.redirect('http://127.0.0.1:5500/public/00.Main.html')
});

//1 넘버 2개 더하기
router.get('/plus', function (request, response) {       //  /plus라우터 기능정의및등록
    /* /plus객체가가진 req res
    c 가보낸정보 req에잇다
    res > html 을 c 에게 응답 */
    console.log(request.query.num1);
    console.log(request.query.num2);

    //200은정상응답이란뜻                    html로응답
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    response.write('<html>')
    response.write('<body>')
    response.write('<h1>응답성공</h1>')
    response.write('결과값' + (parseInt(request.query.num1) + parseInt(request.query.num2)))
    response.write('</body>')
    response.write('</html>')
    response.end();
});

// 2 넘버2개 사칙연산
router.get('/cal', function (request, response) {       //  /plus라우터 기능정의및등록
    let num1 = request.query.num1;
    let cal = request.query.cal;
    let num2 = request.query.num2;
    console.log(num1, cal, num2);
    /* /plus객체가가진 req res
    c 가보낸정보 req에잇다
    res > html 을 c 에게 응답 */
    //200은정상응답이란뜻                    html로응답
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    response.write('<html>')
    response.write('<body>')
    response.write('<h1>응답성공</h1>')
    /*   긴 if else if 코드 
    if (cal == '+') {
            response.write('결과값' + (parseInt(num1) + parseInt(num2)))
        } else if (cal == '-') {
            response.write('결과값' + (parseInt(num1) - parseInt(num2)))
        } else if (cal == '*') {
            response.write('결과값' + (parseInt(num1) * parseInt(num2)))
        } else if (cal == '/') {
            response.write('결과값' + (parseInt(num1) / parseInt(num2)))
        } */
    //eval 함수로 cal을 연산 기호로 바꿔서 코드를 줄임
    response.write('결과값' + eval(parseInt(num1) + cal + parseInt(num2)))
    response.write('</body>')
    response.write('</html>')
    response.end();
});

// 3 시험성적 입력 받고 그레이드와 평균 출력
router.post('/grade', function (request, response) {

    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    response.write('<html>')
    response.write('<body>')
    response.write('<h1>응답성공</h1>')
    let name = request.body.name
    let java = request.body.java
    let web = request.body.web
    let iot = request.body.iot
    let android = request.body.android
    let avg = (parseInt(java) + parseInt(web) + parseInt(iot) + parseInt(android)) / 4
    //리스폰스라이트안에서는 하나의 값만 써야하기 때문에 , 대신 +를 써야 한다.
    response.write(name + '님의' + ' avg는 ' + avg + '이고 ')
    if (avg <= 75 && avg >= 0) {
        response.write('grade는 F')
    } else if (avg <= 79) {
        response.write('grade는 c')
    } else if (avg <= 84) {
        response.write('grade는 b')
    } else if (avg <= 89) {
        response.write('grade는 b+')
    } else if (avg <= 94) {
        response.write('grade는 a')
    } else if (avg <= 100) {
        response.write('grade는 a+')
    }
    response.write('입니다')
    response.write('</body>')
    response.write('</html>')
    response.end();
});

//4 회원가입페이지 정보 받고 데이터만 출력
router.post('/join', (request, response) => {

    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    response.write('<html>')
    response.write('<body>')
    response.write('<h1>응답성공1</h1>')
    response.write('id: ' + request.body.id + '<br>')
    response.write('name: ' + request.body.name + '<br>')
    response.write('email: ' + request.body.email + '<br>')
    response.write('tel: ' + request.body.tel + '<br>')
    response.write('gender: ' + request.body.gender + '<br>')
    response.write('country: ' + request.body.country + '<br>')
    response.write('birth: ' + request.body.birth + '<br>')
    response.write('color: ' + request.body.color + '<br>')
    response.write('hobby: ' + request.body.hobby + '<br>')
    response.write('talk: ' + request.body.talk + '<br>')
    response.write('<h1>응답성공4</h1>')
    response.write('</body>')
    response.write('</html>')
    response.end();
});

// 5 특정아이디비번 로긴 성공 실패
router.post('/login', (request, response) => {

    let id = request.body.id
    let pw = request.body.pw

    if (id == 'a' && pw == 'a') {
        response.redirect('http://127.0.0.1:5500/public/05.2.LoginS.html')
        //html파일에서 우클릭 오픈위드라이브서버 로 페스확인
    } else {
        response.redirect('http://127.0.0.1:5500/public/05.3.LoginF.html')
    }
});

// 6 db 회원삭제   //아래부터는DB활용
router.get('/deleteDB', (request, response) => {

    let id = request.query.id
    let sql = "DELETE FROM member WHERE id=?";
    //      어떤sql? + 실패햇을떄와성공했을떄함수
    conn.query(sql, [id], (err, row) => {  //[id,pw,nick]는물음표순서대로그대로

        if (err) {
            console.log('에러,삭제실패' + err)
        }
        else if (row.affectedRows > 0) {//에러가없으면 //어펙티드로우스는 명령 성공 횟수
            console.log('명령에성공한수:' + row.affectedRows);
            console.log('삭제성공' + row)
            console.log(row)
            console.log(row.affectedRows)
            console.log(row.length)
            response.redirect('http://127.0.0.1:5500/public/06.2.DeleteS.html');
        } else if (row.affectedRows == 0) {
            console.log('삭제된값없음')
            response.redirect('http://127.0.0.1:5500/public/06.3.DeleteF.html');
        }
    })
});

//7 db 회원가입 (가입성공하면 메인페이지로 이동)
router.post('/joinDB', (request, response) => {

    let id = request.body.id
    let pw = request.body.pw
    let nick = request.body.nick;

    //let sql="insert into member values('1','1','1')";
    //유저가보낸걸넣기 []을추가
    let sql = "insert into member values(?,?,?)";
    //      어떤sql? + 실패햇을떄와성공했을떄함수
    conn.query(sql, [id, pw, nick], (err, row) => {  //[id,pw,nick]는물음표순서대로그대로
        if (!err) {//에러가없으면
            console.log('입력성공' + row)
            response.redirect('http://127.0.0.1:5500/public/07.2.JoinDBS.html');
        } else {
            console.log('입력실패' + err)
            response.redirect('http://127.0.0.1:5500/public/07.3.JoinDBF.html');
        }
    })


});

// 8. db 회원수정 
router.post('/updateDB', (request, response) => {

    let select = request.body.select
    let sql = `
    UPDATE member 
    SET ${select}=?
    WHERE id=?;
    `;
    let change = request.body.change
    let id = request.body.id

    conn.query(sql, [change, id], (err, row) => {  //[id,pw,nick]는물음표순서대로그대로
        if (!err) {//에러가없으면
            console.log('수정성공' + row)
            response.redirect('http://127.0.0.1:5500/public/08.2.UpdateDBS.html');
        } else {
            console.log('수정실패' + err)
            console.log(select, change, id)
            response.redirect('http://127.0.0.1:5500/public/08.3.UpdateDBF.html');
        }
    })
});

// 9. db ejs 특정 회원 1명 찾기 (09.2.SearchOneDBS는 ejs로)
router.get('/searchOneDB', (request, response) => {

    let id = request.query.id
    let sql = `
    select * 
    from member 
    WHERE id=?
    `;
    conn.query(sql, [id], (err, row) => {  //[id,pw,nick]는물음표순서대로그대로
        console.log(row)
        if (err) {
            console.log('검색실패에러' + err)
            response.redirect('http://127.0.0.1:5500/public/09.3.SearchOneDBF.html')
        }
        else if (row.length > 0) {//에러가없고 검색값이 있으면
            //selectOne.ejs 부르고 ejs가 출력 그리고 검색값을 row_name변수로 넘겨줌
            console.log('검색성공 검색값 있음')
            response.render('SearchOneDBS', {
                row_name: row
            })
        } else if (row.length == 0) {
            console.log('검색값없음')
            response.redirect('http://127.0.0.1:5500/public/09.4.SearchOneDBN.html')
        }
    })
});

// 10. db 로그인 db에아이디패스워드있는지확인
router.post('/loginDB', (request, response) => {

    let id = request.body.id
    let pw = request.body.pw

    console.log(id, pw)

    let sql = `
    select * 
    from member 
    WHERE id=? and pw=?
    `;

    conn.query(sql, [id, pw], (err, row) => {  //[id,pw,nick]는물음표순서대로그대로

        if (err) {
            console.log('검색실페에러' + err)
        } else if (row.length > 0) {
            console.log('로긴성공')
            response.redirect('http://127.0.0.1:5500/public/05.2.LoginS.html')
            /*  request.session.user = id; //로긴에성공한사람의아이디
            console.log('session영역에아이디저장성공' + request.session.user);
            response.render('LoginS', {
                row_name: row
             }) */
        } else if (row.length == 0) {
            console.log('로긴실패')
            response.redirect('http://127.0.0.1:5500/public/05.3.LoginF.html')
        }
    })
});

// 11. db 전체검색 검색되는지확인, html에서 포스트로 보낸다는 표현이 없으면 무조건 get으로 받는다 post는 post로 보낸다는 코드가 잇어야 사용 가능
router.get('/searchAllDB', (request, response) => {
    let sql = `
    select * from member
    `;
    console.log(sql)
    conn.query(sql, (err, row) => {  //[id,pw,nick]는물음표순서대로그대로
        //row에 셀렉트로 불러온 값
        //row[0]이면 첫행 한 줄      row[0].id면 아이디 하나
        if (err) {
            console.log('에러' + err)
        } else if (row.length >= 1) {
            console.log('검색성공 :' + row.length + ' 명')
            console.log(row)
            response.redirect('http://127.0.0.1:5500/public/11.2.searchAllDBS.html')
        } else {
            console.log('검색햇으나 회원이 0명 row.length는 : ' + row.length)
            response.redirect('http://127.0.0.1:5500/public/11.3.searchAllDBF.html')
        }
    })
});

// 12. db ejs 로그인
router.post('/loginDBejs', (request, response) => {

    let id = request.body.id
    let pw = request.body.pw
    //console.log(id,pw)
    request.session.user = id //로긴에성공한사람의아이디를 세션에 저장,conn.문안에적어도괜찮

    let sql = `
    select * 
    from member 
    WHERE id=? and pw=?
    `;

    conn.query(sql, [id, pw], (err, row) => {  //[id,pw,nick]는물음표순서대로그대로
        if (err) {
            console.log('검색실페에러' + err)
        } else if (row.length > 0) {
            console.log('로긴성공')
            //response.redirect('http://127.0.0.1:5500/public/05.2.LoginS.html')
            console.log('session영역에아이디저장성공 저장아이디는: ' + request.session.user);
            console.log(row)
            console.log('row[0].id: ' + row[0].id)
            response.render('loginDBejs', {
                row_name: row
            })
        } else if (row.length == 0) {
            console.log('로긴실패')
            response.redirect('http://127.0.0.1:5500/public/05.3.LoginF.html')
        }
    })
});

// 13. db ejs 전체검색 전체회원리스트까지 출력, html에서 포스트로 보낸다는 표현이 없으면 무조건 get으로 받는다 post는 post로 보낸다는 코드가 잇어야 사용 가능
router.get('/searchAllDBejs', (request, response) => {
    let sql = `
    select * from member
    `;
    conn.query(sql, (err, row) => {  //[id,pw,nick]는물음표순서대로그대로
        //row에 셀렉트로 불러온 값, row[0]이면 첫행 한 줄, row[0].id면 아이디 하나
        if (err) {
            console.log('에러' + err)
            response.redirect('http://127.0.0.1:5500/public/11.3.searchAllDBF.html')
        } else if (row.length >= 1) {
            console.log('검색성공 :' + row.length + ' 명')
            console.log(row)
            //selectOne.ejs 부르고 ejs가 출력
            response.render('searchAllDBejs', {
                row_names: row
            })
        } else {
            console.log('검색햇으나 회원이 0명 ' + row.length)
            response.redirect('http://127.0.0.1:5500/public/11.4.searchAllDBN.html')
        }
    })
});

// 13-2. db 13번 전체검색에서 테이블에서 바로 삭제를 하기 위한 라우터
router.get('/SelectDelete', (request, response) => {
    let id = request.query.id
    let sql = "DELETE FROM member WHERE id=?";
    //      어떤sql? + 실패햇을떄와성공했을떄함수
    conn.query(sql, [id], (err, row) => {  //[id,pw,nick]는물음표순서대로그대로
        if (err) {
            console.log('삭제실패' + err)
        }
        else if (row.affectedRows > 0) {//에러가없으면
            console.log('명령에성공한수:' + row.affectedRows);
            console.log('삭제성공' + row)
            response.redirect('http://127.0.0.1:3001/searchAllDBejs');
        } else if (row.affectedRows == 0) {
            console.log('삭제된값없음')
            response.redirect('http://127.0.0.1:3001/main');
        }
    })
});

//session
//// id: request.session.user 로 이 라우터로 들어올때 id값을 받는다 이 값으로 MainEJS.ejs에서 사용
// 14 db ejs session 메인EJS 페이지
router.get('/MainEJS', (request, response) => {
    response.render('MainEJS',{
        id: request.session.user
    })
});

//session
// 14-2  MainEJS페이지에서 로그아웃 버튼을 누르면 이 라우터로 오고
// delete 리퀘스트로세션으로 id 값을 지우고 다시 메인ejs페이지로 보냄
router.get('/Logout', (request, response) => {
    delete request.session.user;
    response.render('MainEJS', {
        id: request.session.user
    })
});

module.exports = router; //라우터를외부에서사용할수있게

//ejs에서
/* router.get('/Message', (request,response)=>{
    response.render('message',{});
}) */