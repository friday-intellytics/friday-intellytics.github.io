/**
 * Contact form backend for Friday Intellytics.
 * Deploy as Web App (Execute as me, Anyone) so the static site can POST here.
 */
var RECIPIENT = 'hello@fridayintellytics.com';

function doPost(e) {
  try {
    var name = (e.parameter && e.parameter.name) || '';
    var email = (e.parameter && e.parameter._replyto) || (e.parameter && e.parameter.email) || '';
    var subject = (e.parameter && e.parameter.subject) || 'Contact form submission';
    var message = (e.parameter && e.parameter.message) || '';

    if (!name || !email || !message) {
      return jsonOutput({ success: false, error: 'Missing required fields' });
    }

    var body = [
      'Name: ' + name,
      'Email: ' + email,
      'Subject: ' + subject,
      '',
      'Message:',
      message
    ].join('\n');

    var emailSubject = subject ? 'Contact form: ' + subject : 'Contact form submission';

    MailApp.sendEmail({
      to: RECIPIENT,
      replyTo: email,
      subject: emailSubject,
      body: body
    });

    return jsonOutput({ success: true });
  } catch (err) {
    return jsonOutput({ success: false, error: err.message || 'Send failed' });
  }
}

function doGet() {
  return ContentService.createTextOutput('Contact form backend').setMimeType(ContentService.MimeType.TEXT);
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
