/** @format */

import { saveAs } from "file-saver";
import html2Canvas from "html2canvas";
import htmlDocx from "html-docx-js/dist/html-docx";

export default  function htmlToWord (domId, fileName, title, subTitle, font) {

  html2Canvas(document.querySelector(domId), {
    allowTaint: true,
  }).then(function (canvas) {
    // 将图像的宽高转换为A4纸的大小
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const imgHeight = (592.28 / contentWidth) * contentHeight;

    // 创建iframe，在其中创建一个网页，并将其转换为word
    let copyDom = document.createElement("div");
    if (typeof title === 'string'&&title) {
      console.log(font)
      const titleDom = document.createElement("h2");
      titleDom.innerText = title;
      titleDom.setAttribute("align", "center");
      titleDom.setAttribute("style", 'font-family:'+font);
      copyDom.appendChild(titleDom);

      if (typeof subTitle === 'string' &&title) {
        const timetitleDom = document.createElement("p");
        timetitleDom.innerText = subTitle;
        timetitleDom.setAttribute("align", "center");
        timetitleDom.setAttribute("style", 'font-family:'+font);
        copyDom.appendChild(timetitleDom);
      }
    }

    // 创建一个图片，图片的地址必须为base64
    const img = new Image(595.28, imgHeight);
    img.src = canvas.toDataURL("image/jpeg", 1.0);
    copyDom.append(img);

    const htmlTemp = copyDom.innerHTML;
    copyDom = null;
    const iframeDom = document.createElement("iframe");

    document.body.insertBefore(iframeDom, document.body.children[0]);

    const iframeWin = iframeDom.contentWindow; // 1.获取iframe中的window
    const iframeDocs = iframeWin.document; // 2.获取iframe中的document

    iframeDocs.write(`<!doctype html>`);
    iframeDocs.write(htmlTemp);

    const htmlDoc = `
        <!DOCTYPE html>
        <html lang="en">
        <meta charset="UTF-8">
        ${iframeDocs.documentElement.innerHTML}
        </html>
        `;
    const converted = htmlDocx.asBlob(htmlDoc);
    saveAs(converted, `${fileName}.docx`);
    console.log("创造的iframe", htmlDoc);
    document.body.removeChild(iframeDom);
  }).catch(err=>console.log(err));
}