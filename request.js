const request = require('request')

// markdown文本
const textToConvert = `
# 一级标题
## 二级标题
- 一级列表
  + 二级列表1
  + 二级列表2
- 一级列表2

|表格| 描述|
|----|-----|
|表格标题|这是一个表格| 
|mysql| 关系型数据库|

![图片](./image/img.png)

\`\`\`javascript
var name = 'john';
\`\`\`
`

request.post({
  "headers": { "content-type": "application/json" },
  "url": 'http://localhost:3000/convert',
  "body": JSON.stringify({
    "content": textToConvert,
    "username": "admin",
    "password": "123456"
  })
},(err, res, body) => {
  if (err) {
    return console.log(err)
  }
  // console.log(res)
  console.dir(JSON.parse(body))
})