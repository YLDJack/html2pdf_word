import htmlToPdf from './src/htmlToPdf';
import htmlToWord from './src/htmlToWord';

export default function htmlToPDForWord(domId, fileName, fileType, title, subTitle, font) {
    if (!domId || !fileName) {
        throw 'domId and fileName cannot be empty'
    }
    if (!typeof domId === 'string' || domId.search(/^(\.|\#)/) === -1) {
        throw 'domId must be string and starts with "." or "#"'
    }

    

    if (typeof fileType === 'string') {
        let type = fileType.toUpperCase();
        var font = font.search('黑体|楷体')!=-1?font:'黑体'

        if (type == 'WORD') {
            htmlToWord(domId, fileName, title, subTitle, font);
        } else {
            htmlToPdf(domId, fileName, title, subTitle, font);
        }
    } else {
        htmlToPdf(domId, fileName, title, subTitle, font);
    }
}