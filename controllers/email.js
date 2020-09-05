var cron=require('node-cron');
let nodemailer = require('nodemailer');
const Option = require('../models/option');
module.exports={
    sendEmail
};

function sendEmail(options,recipientEmailAddr) {
    let optionsDict = {};
    options.forEach(function (option) {
        if (!optionsDict[option.weekday]) {
            optionsDict[option.weekday] = [];
            optionsDict[option.weekday].push(option.optionsList)
        }
        else
            optionsDict[option.weekday].push(option.optionsList);
    });
     // e-mail transport configuration
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'newvijay.babu@gmail.com',
                pass: 'newanand*3A'
            }
        });
        //console.log(optionsDict)
    for (var weekday in optionsDict) {
        console.log(weekday)
        //console.log(optionsDict[weekday])
        var optionsTxt = '';
        optionsDict[weekday].forEach(function (txt) {
            optionsTxt += txt + '\n';
        });
        // for (var optionName in optionsDict[weekday]) {
        //     optionsTxt += optionName + '\n';
        //     console.log(optionsTxt)
        // }
        var datestr = '26 14 * * ' + weekday;
        console.log(datestr);
        //var datestr=''+date.getMinutes()+' '+date.getHours()+' '+date.getDate()+' '+(Number(date.getMonth())+1).toString()+' '+option.weekday;


        //var date=new Date(option.date);
        // var datestr=''+date.getMinutes()+' '+date.getHours()+' '+date.getDate()+' '+(Number(date.getMonth())+1).toString()+' '+option.weekday;

        // e-mail message options
        let mailOptions = {
            from: 'newvijay.babu@gmail.com',
            to: recipientEmailAddr,
            subject: 'Here are the Options for '+weekday+'DAY !',
            text: optionsTxt
        };

        var emailtask = cron.schedule(datestr, () => {
            // Send e-mail
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });

        // var task=cron.schedule(datestr,function () {
        //     console.log('job scheduled now');
        // });
        emailtask.start();
    }
}
