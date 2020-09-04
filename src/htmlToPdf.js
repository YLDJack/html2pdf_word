/** @format */

// 导出页面为PDF格式
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import SIMHEI from './fontjs/SIMHEI-normal';
import SIMKAI from './fontjs/SIMKAI-normal'

(function(API){
  API.myText = function(txt,fontSize,options,x, y) {
      options = options ||{};
      /* Use the options align property to specify desired text alignment
       * Param x will be ignored if desired text alignment is 'center'.
       * Usage of options can easily extend the function to apply different text 
       * styles and sizes 
      */
     this.setFontSize(fontSize);
      if( options.align == "center" ){
          // Get current font size
          var fontSize = this.internal.getFontSize();

          // Get page width
          var pageWidth = this.internal.pageSize.width;

          // Get the actual text's width
          /* You multiply the unit width of your string by your font size and divide
           * by the internal scale factor. The division is necessary
           * for the case where you use units other than 'pt' in the constructor
           * of jsPDF.
          */
         var txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

          // Calculate text's x coordinate
          x = ( pageWidth - txtWidth ) / 2;
      }
      // Draw text at x,y
      this.text(txt,x,y);
  }
})(JsPDF.API);

export default function (domId, fileName, title, subTitle, font) {

  html2Canvas(document.querySelector(domId), {
    allowTaint: true,
  }).then(function (canvas) {
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const pageHeight = (contentWidth / 592.28) * 841.89;
    let leftHeight = contentHeight;
    let position = 0;
    const imgWidth = 595.28;
    const imgHeight = (592.28 / contentWidth) * contentHeight;
    const pageData = canvas.toDataURL("image/jpeg", 1.0);
    const PDF = new JsPDF("", "pt", "a4");

    if (typeof title === 'string' && title) {
      PDF.addFileToVFS('SIMHEI-normal.ttf', SIMHEI);
      PDF.addFont('SIMHEI-normal.ttf', '黑体', 'normal');
      PDF.addFileToVFS('SIMKAI-normal.ttf', SIMKAI);
      PDF.addFont('SIMKAI-normal.ttf', '楷体', 'normal');

      PDF.setFont(font);
      // PDF.text(title, 0, 25);
      PDF.myText(title,30,{align: "center"},0,30)
      if (typeof subTitle === 'string'&& subTitle) {
        // PDF.text(subTitle, 0, 50,);
        PDF.myText(subTitle,15,{align: "center"},0, 50);
      }
    }

    if (leftHeight < pageHeight) {
      if(typeof title === 'string' && title){
        PDF.addImage(pageData, "JPEG", 0, 60, imgWidth, imgHeight);
      }else{
        PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
      }
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        if (leftHeight > 0) {
          PDF.addPage();
        }
      }
    }
    PDF.save(fileName + '.pdf');
  }).catch(err => console.log(err));
}