
const express = require('express')
const sessionrouter=express.Router();

//세션 생성 (세션공간에저장)
sessionrouter.get('/sessionCreate',(request,response)=>{ //1
    request.session.user = {
        'id':'smart', //세션 공간에 유저라는이름으로 스마트라는 데이터를 담는다 
        'pw':'123',
        'nick':'smartnick',
    }
    response.end()
});

//세션 셀렉
sessionrouter.get('/sessionSelect',(request,response)=>{
    console.log('세션에잇는유저갑: '+request.session.user)//2
});

 //세션 삭제
sessionrouter.get('/sessionDelect',(request,response)=>{ //3
    delete request.session.user
    response.end()
});

module.exports=sessionrouter;