# [html2pdf_word](https://www.npmjs.com/package/html2pdf_word) ![v1.0.4](https://img.shields.io/badge/Version-1.0.4-%3CCOLOR%3E) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)



## Uasge✨

Covert Html to PDF or Word File



## Install 📦

```js
npm install html2pdf_word -s
```



## Arguments🔨

| 参数名（按顺序排列） | 说明 | 类型 | 是否必填 | 默认值|
|------|------------|------------|:---------:|-----------|
| domId                | 需转换的DOM的Id或className（开头带有'#'或'.'） | string     | 是 | 无 |
| fileName | 转换后的文件名   | string  |是|无|
| fileType | 转换后文件类型（'PDF'\|'Word'）                | string |否|'PDF'|
| title | 转换后的文件中的标题 | string |否|无|
| subTitle | 转换后的文件中的副标题 | string |否|无|
| font | 转换后的文件的标题字体（目前‘黑体’\|‘楷体’） | string |否|‘黑体’|



## Examples📐

1.Import function from package
```jsx
        import htmlToPDForWord from 'html2pdf_word'
```
2.Use it
```jsx
          htmlToPDForWord('.chart-boxs','文件名','PDF','标题','副标题','楷体');
```

![PDF (1)](D:\DTStack\dtcat\html2pdf_word\PDF (1).gif)



## Future work🌈 

- [ ] 1、添加更多的可选字体
- [ ] 2、可自由调整标题和副标题大小
- [ ] 3、可自由调整文字居中位置
- [ ] 4、优化项目结构和体积