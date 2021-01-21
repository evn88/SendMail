# SendMail

Скрипт по отправке писем пользователям.

## Установка

`npm install`

## Настройка

В файле index.js укажите настройки:

```js
var transporter  = nodemailer.createTransport({
    host: 'xxx.xxx.xxx.xxx', //адрес почтового сервера
    port: 2520, //порт почтового сервера
    secure: false, // upgrade later with STARTTLS
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})
```

Пользователи берутся из списка в maillist_voe_senduser.csv который должен соответствовать шаблону:

```csv
LOGIN;PASS;USERNAME
user1@dmain.ru;123456789;Иванов Иван Иванович
user2@dmain.ru;123456789;Петров Петр Петрович
```

Шаблон письма содержится в template.mjml и template.html
