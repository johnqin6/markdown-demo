const express = require('express');
const marked = require('marked')
const app = express();

// 密码验证相关依赖
const passport = require('passport')
const jwt = require('jwt-simple')
const LocalStrategy = require('passport-local').Strategy

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const ADMIN = 'admin';
const ADMIN_PASSWORD = '123456';
const SECRET = 'secret#4456';

passport.use(new LocalStrategy((username, password, done) => {
  if (username === ADMIN && password === ADMIN_PASSWORD) {
    done(null, jwt.encode({ username }, SECRET))
    return ;
  }
  done(null, false)
}))

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/login', passport.authenticate('local',{ session: false }), (req, res) => {
  res.send('logined')
})

app.post('/convert', passport.authenticate('local',{ session: false, failWithError: true }), (req, res, next) => {
  if (typeof req.body.content == 'undefined' || req.body.content == null) {
    res.send(['error', 'No data found'])
  } else {
    text = req.body.content
    html = marked(text)
    res.send(['markdown', html])
  }
},(err, req, res, next) => {  // 验证失败，返回 “Unauthorized” 字样
  return res.status(401).send({ success: false, message: err })
}
)

app.listen(3000, () => {
  console.log('服务器已开启，访问地址：http://localhost:3000');
});
