require('dotenv').config();
import { mail as helper } from "sendgrid";
import sendGrid from "sendgrid";
import q from "q";

const SGConnection = sendGrid(process.env.SENDGRID_API_KEY);

//TODO: What is this? Ask Vish
const fromEmail = helper.Email('sam@mediforms.com.au');

const getMailReq = (mailObj) => SGConnection.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: mailObj.toJSON()
})

const getMime = (isHtml) => isHtml ? "text/html" : "text/plain"
const debugLog = (msg) => {if (process.env.NODE_ENV !== "production") console.log(msg) }  
const debugWarn = (msg) => {if (process.env.NODE_ENV !== "production") console.warn(msg) }  

/**
 * Call this function send emails
 * @param {String} to - String of the email to send to  
 * @param {String} subject - Subject line of the email
 * @param {String} body - The content of the email 
 * @param {Bool} isHtml - Should the email be sent with HTMl encoding? or is the text plain? 
 * @returns {Promise} - A promise that resolves with the response, or rejects with the error. 
 */
export function sendEmail(to, subject, body, isHtml) {
    let deferred = q.defer();
    
    let mail = helper.Mail(
        fromEmail, 
        subject, 
        new helper.Email(to), 
        new helper.Content(getMime(isHtml), body)
    );

    SGConnection.API(getMailReq(mail), (err, response) => { 
        if(err) {
            deferred.reject(err);
            debugWarn(err);
        }else {
            deferred.resolve(response);
        }
    })

    return deferred.promise;
}

