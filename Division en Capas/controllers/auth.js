var logger = require("../lib/email");

function sendLoginEmails(user) {
  const dateNow = new Date();
  const mailOptions = {
    from: "Servidor Node.js",
    to: "juanpablowaller76@gmail.com",
    subject: "Alguien se logueo en tu aplicación Node.js",
    html: `
          <p>
            LogIn de ${user.displayName} a a hora de ${dateNow}.
          </p>
        `,
  };
  email.defaultTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(err);
      return err;
    }
    logger.info(info);
  });
  email.gmailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(err);
      return err;
    }
    logger.info(info);
  });
}

function sendLogoutEmail(user) {
  const dateNow = new Date();
  const mailOptions = {
    from: "Servidor Node.js",
    to: "juanpablowaller76@gmail.com",
    subject: "Alguien se deslogeo de tu aplicación Node.js",
    html: `
        <p>
          LogOut de ${user.displayName} a a hora de ${dateNow}.
        </p>
      `,
  };
  emailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
}