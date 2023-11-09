const nodemailer = require('nodemailer');

const mailgun = require('mailgun-js')({
    apiKey: '79f27dac3bf5e1b970cb84973eb17273-8c9e82ec-970ecfff',
    domain: 'sandbox03598f77e8404b2f8164911001a05c6d.mailgun.org'
  });
  



async function sendEmail(req,res){
  const { first_name, last_name, contact, email, about_org, project_budget, project_description, project_timeline, business_type  } = req.body;
 
  const data = {
    from: 'info@teckity.com',
    to: 'info@teckity.com', // replace with the recipient's email address
    subject: 'New Job Alert',
    text: `Name: ${first_name + ' ' + last_name} \nContact: ${contact} \nEmail: ${email}\n\nAbout Organization: ${about_org}\n\nProject Description: ${project_description}\nProject Budget: ${project_budget}\nProject Timeline: ${project_timeline}\nBusiness Type: ${business_type}`
  };

  mailgun.messages().send(data, (error, body) => {
  console.log(body);
});

  
  
}
module.exports ={
    sendEmail
}
