/**
 * Default app config
 * (sails.config.email)
 *
 * https://github.com/balderdashy/sails-hook-email
 */

module.exports.email = {
  from: process.env.MAILER_FROM || 'alienfernandez85@gmail.com',
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail', // Gmail, SMTP
  auth: {
    user: process.env.MAILER_EMAIL_ID || 'alienfernandez85@gmail.com',
    pass: process.env.MAILER_PASSWORD || '******'
  }
};
