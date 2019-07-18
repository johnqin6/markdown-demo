# markdown demo  

## 编写markdown编辑器步骤  
1. 引入解析markdown的插件marked 和其他相关插件

```html
<script src="../node_modules/marked/marked.min.js"></script>
 <!-- 代码高亮插件 -->
<script src="./js/highlight.min.js"></script>
<!-- 代码行号插件 -->
<script src="./js/highlightjs-line-numbers.min.js"></script>
<!-- markdown样式 -->
<link rel="stylesheet" href="../node_modules/github-markdown-css/github-markdown.css">
<link rel="stylesheet" href="../node_modules/highlight.js/styles/default.css">
```

2. 将markdown解析html

```html
<div id="container" class="container">
  <textarea name="" id="md-content" oninput="mdSwitch()" class="md-content markdown-edit"></textarea>
  <div id="show-md" class="md-content md-show-content markdown-body"></div>
</div>
```
```javascript
function mdSwitch() {
  var mdContent = document.getElementById('md-content'); // 获得输入的内容的元素
  var showMd = document.getElementById('show-md'); // 展示解析的markdown内容的元素
  var mdValue = mdContent.value;
  showMd.innerHTML = marked(mdValue);  // 将markdown语法解析为html
}
```

3. 使代码区高亮
```javascript
  // 代码高亮
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
```

4. 代码区添加行号
```javascript
  // 代码区添加行号
  document.querySelectorAll('code.hljs').forEach(function(block) {
      hljs.lineNumbersBlock(block);
  });
```

5. 完整代码

```javascript
// 文本框输入时触发
function mdSwitch() {
  var mdContent = document.getElementById('md-content');
  var showMd = document.getElementById('show-md');
  var mdValue = mdContent.value;
  showMd.innerHTML = marked(mdValue);
  
  // 代码高亮
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
  
  // 代码区添加行号
  document.querySelectorAll('code.hljs').forEach(function(block) {
      hljs.lineNumbersBlock(block);
  });
}
```

## 效果图

![效果](./images/markdown.png)
