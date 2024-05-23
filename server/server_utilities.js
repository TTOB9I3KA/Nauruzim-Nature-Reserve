const path = require('path');
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const crypto = require('crypto');
const fsp = require('fs/promises')

const serverMainDirectory = path.join(__dirname, '..');
const templatePath = path.join(serverMainDirectory, 'server', 'server_resources', 'template.docx');

const loadWord = async (id, record_name, phone, book_date, end_date, record_date) => {
    const content = await fsp.readFile(templatePath);
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
    });

    const data = {
        ticket_id: id,
        record_name: record_name,
        phone: phone,
        book_date: new Date(book_date).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        end_date: new Date(end_date).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        record_date: record_date,
        hash: await generateHash()
    };

    await doc.renderAsync(data);

    const buf = doc.getZip().generate({type: 'nodebuffer'});

    return buf;
}
const generateHash = async () => {
    const hash = crypto.createHash('sha1')
    .digest('hex')
    .slice(0, 10);;
    return hash;
}


module.exports = {
    serverMainDirectory,
    loadWord
}

