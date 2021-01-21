var fs = require('fs')
var csv = require('csv-parser')
var nodemailer = require('nodemailer')

var transporter  = nodemailer.createTransport({
    host: 'xxx.xxx.xxx.xxx',
    port: 2520,
    secure: false, // upgrade later with STARTTLS
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})


var template = fs.readFileSync('template.html','utf8')


fs.createReadStream('./maillist_voe_sendusers.csv')
  .pipe(csv({
      separator: ';'
  }))
  .on('data', function (data) {
      if (data.LOGIN && data.PASS){
        transporter.sendMail({
            from: 'ОТДЕЛ ИТ <example@domain.ru>',
            to: data.LOGIN,
            subject: 'Переход на новый почтовый сервер',
            html: dataReplace(template,data)
        }, function(err, ok){
            console.log("OK: "+ ok.envelope.to, ok.response)
            if(err){
                console.error(err)
            }
        })
      }
})

function dataReplace(template, data){
    template = template.replace(/%LOGIN%/g, data.LOGIN)
    template = template.replace(/%PASS%/g, data.PASS)
    template = template.replace(/%USERNAME%/g,data.USERNAME)
    return template
}