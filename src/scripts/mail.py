import os
import sys
from zipfile import ZipFile
from dotenv import load_dotenv
import pandas as pd
import smtplib
import ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr


def mail(cert, recipient_email):
    print("Sending certificate to {}".format(recipient_email))
    sys.stdout.flush()

    load_dotenv()
    port = 465
    sender_email = os.environ.get('SENDER_EMAIL')
    sender_password = os.environ.get('SENDER_PASSWORD')

    # "alternative" for using plain/html alternatively based on client.
    message = MIMEMultipart("alternative")
    message["subject"] = "{} | {} | {}".format(cert.certificate_title, cert.event_name, cert.issuing_organization)
    message["From"] = "{}".format(cert.issuing_organization)
    message["To"] = recipient_email

    # content as plain/html text.
    plain_content_string = """\
    Hello {},
    Hope you enjoyed {}.
    Please find your Certificate as attachment.
    """.format(cert.recipient_name, cert.event_name)

    html_content_string = """\
    <html>
      <body>
        <p>Hello, <strong>{}</strong><br>
           Hope that you enjoyed <strong>{}</strong>.<br>
           Please find your Certificate as attachment.
        </p>
      </body>
    </html>
    """.format(cert.recipient_name, cert.event_name)

    # converting content to respective MIMEText objects
    plain_part = MIMEText(plain_content_string, "plain")
    html_part = MIMEText(html_content_string, "html")

    # attaching html and plain parts to MIMEMultipart object.
    message.attach(plain_part)
    message.attach(html_part)

    # Open PDF file in binary mode
    with open(cert.cert_path, "rb") as attachment:
        # Add file as application/octet-stream
        # Email client can usually download this automatically as attachment
        attachment_part = MIMEBase("application", "pdf")
        attachment_part.set_payload(attachment.read())

    # 'Content-Disposition' Response header because content is expected to be locally downloadable
    # filename parameter specifies the filename of the file received by the recipient.
    attachment_part.add_header("Content-Disposition", "attachment", filename=cert.recipient_name + '.pdf')

    # Encodes the payload into base64 form and sets the Content-Transfer-Encoding header to base64
    encoders.encode_base64(attachment_part)

    # Add attachment to message and convert message to string
    message.attach(attachment_part)

    # creates an ssl context and verifies its certificates
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as gmail_smtp_server:
        try:
            gmail_smtp_server.login(sender_email, sender_password)
            gmail_smtp_server.sendmail(sender_email, recipient_email, message.as_string())
            print("Successfully sent mail to {}".format(recipient_email))
            sys.stdout.flush()
            return None
        except Exception as e:
            print("Failed sending mail to {}".format(recipient_email))
            sys.stdout.flush()
            return recipient_email


def zip_dir(to_zip_dir_name, purpose):
    execution_mode = os.environ.get('EXECUTION_MODE')
    out_dir = "./generated_certificates/zipped/" if (execution_mode == 'test') else "src/scripts/generated_certificates/zipped/"
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)
    file_paths = []
    for root, directories, files in os.walk(to_zip_dir_name):
        for filename in files:
            # join the two strings in order to form the full filepath.
            filepath = os.path.join(root, filename)
            file_paths.append(filepath)

    out_file_path = out_dir + purpose + '.zip'
    with ZipFile(out_file_path, 'w') as zip_file:
        for file in file_paths:
            zip_file.write(file, os.path.basename(file))

    return out_file_path


def mail_zip(zipped_file_path, recipient_email, purpose, subject_line, plain_content_string, html_content_string, mail_not_send_csv_path):
    load_dotenv()
    port = 465
    sender_email = os.environ.get('SENDER_EMAIL')
    sender_password = os.environ.get('SENDER_PASSWORD')

    # "alternative" for using plain/html alternatively based on client.
    message = MIMEMultipart("alternative")
    message["subject"] = subject_line
    # message["From"] = os.environ.get('APP_NAME')
    message["From"] = formataddr((str(Header(os.environ.get('APP_NAME'), 'utf-8')), 'ieee@gecskp.ac.in'))
    message["To"] = recipient_email

    # converting content to respective MIMEText objects
    plain_part = MIMEText(plain_content_string, "plain")
    html_part = MIMEText(html_content_string, "html")

    # attaching html and plain parts to MIMEMultipart object.
    message.attach(plain_part)
    message.attach(html_part)

    # Open PDF file in binary mode
    with open(zipped_file_path, "rb") as attachment:
        # Add file as application/octet-stream
        # Email client can usually download this automatically as attachment
        attachment_part = MIMEBase("application", "zip")
        attachment_part.set_payload(attachment.read())

    # 'Content-Disposition' Response header because content is expected to be locally downloadable
    # filename parameter specifies the filename of the file received by the recipient.
    attachment_part.add_header("Content-Disposition", "attachment", filename='{}.zip'.format(purpose))

    # Encodes the payload into base64 form and sets the Content-Transfer-Encoding header to base64
    encoders.encode_base64(attachment_part)

    # Add attachment to message and convert message to string
    message.attach(attachment_part)

    if mail_not_send_csv_path is not None:
        # Open PDF file in binary mode
        with open(mail_not_send_csv_path, "rb") as attachment:
            # Add file as application/octet-stream
            # Email client can usually download this automatically as attachment
            attachment_part = MIMEBase("application", "csv")
            attachment_part.set_payload(attachment.read())

        # 'Content-Disposition' Response header because content is expected to be locally downloadable
        # filename parameter specifies the filename of the file received by the recipient.
        attachment_part.add_header("Content-Disposition", "attachment", filename='mail_not_send.csv')

        # Encodes the payload into base64 form and sets the Content-Transfer-Encoding header to base64
        encoders.encode_base64(attachment_part)

        # Add attachment to message and convert message to string
        message.attach(attachment_part)

    # creates an ssl context and verifies its certificates
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as gmail_smtp_server:
        try:
            gmail_smtp_server.login(sender_email, sender_password)
            gmail_smtp_server.sendmail(sender_email, recipient_email, message.as_string())

        except Exception as e:
            sys.stderr.write("Cert Mail Zip: {}".format(e))
            sys.stderr.flush()


def notify(dir_name, auth_user_email, auth_user_name, purpose, successfully_completed, action_time, error_email_list):
    execution_mode = os.environ['EXECUTION_MODE']

    sys.stdout.write("Notifying action to authorities...")
    sys.stdout.flush()

    zipped_file_path = zip_dir(dir_name, purpose)
    recipient_emails = [os.environ.get('MAINTAINER_EMAIL'), os.environ.get('CHAIR_EMAIL')]
    recipient_names = [os.environ.get('MAINTAINER_NAME'), os.environ.get('CHAIR_NAME')]

    mail_not_send = {
        "Mail not sent to": error_email_list
    }

    mail_not_send = pd.DataFrame(mail_not_send)
    mail_not_send_csv_path = './generated_certificates/mail_not_send.csv' if execution_mode == 'test' else 'src/scripts/generated_certificates/mail_not_send.csv'
    mail_not_send.to_csv(mail_not_send_csv_path)

    for recipient_email, recipient_name in zip(recipient_emails, recipient_names):
        subject_line = "{} | {} | {}".format(os.environ.get('APP_NAME'), purpose, "Notification")

        plain_content_string = """\
                    Hello {},
                    
                    {} were issued{}.
                    
                    -----------------------------
                    Action Authenticated by {}
                    Action Time: {}
                    Action Successfully Completed: {}
                    ------------------------------
                    
                    Please find the Zipped Backup as attachment.
                    """.format(recipient_name, purpose, "" if successfully_completed else ", but incomplete", auth_user_name, action_time, successfully_completed)

        html_content_string = """\
                    <html>
                      <body>
                        <p>Hello, <strong>{}</strong><br><br>
                            {} were issued{}.<br><br>
                            -----------------------------<br>
                            Action Authenticated by {}.<br>
                            Action Time: {}<br>
                            Action Successfully Completed: <span style=\"color:{}\">{}</span><br>
                            -----------------------------<br><br>
                            Please find the Zipped Backup as attachment.
                        </p>
                      </body>
                    </html>
                    """.format(recipient_name, purpose, "" if successfully_completed else ", but incomplete", auth_user_name, action_time,"green" if successfully_completed else "red", successfully_completed)
        mail_zip(zipped_file_path, recipient_email, purpose, subject_line, plain_content_string, html_content_string, mail_not_send_csv_path if error_email_list else None)

    sys.stdout.write("Sending backup zip to you...")
    sys.stdout.flush()

    subject_line = "{} | {} | {}".format(os.environ.get('APP_NAME'), purpose, "Backup")

    plain_content_string = """\
                        Hello {},

                        {} were issued{}.
                        
                        -----------------------------
                        Action Time: {}
                        Action Successfully Completed: {}
                        -----------------------------
                        
                        Please find the Zipped Backup as attachment.
                        """.format(auth_user_name, purpose, "" if successfully_completed else ", but incomplete", action_time, successfully_completed)

    html_content_string = """\
                        <html>
                          <body>
                            <p>Hello, <strong>{}</strong><br><br>
                                {} were issued{}.<br><br>
                                -----------------------------<br>
                                Action Time: {}<br>
                                Action Successfully Completed: <span style=\"color:{}\">{}</span><br>
                                -----------------------------<br><br>
                                Please find the Zipped Backup as attachment.
                            </p>
                          </body>
                        </html>
                        """.format(auth_user_name, purpose, "" if successfully_completed else ", but incomplete", action_time,"green" if successfully_completed else "red", successfully_completed)
    mail_zip(zipped_file_path, auth_user_email, purpose, subject_line, plain_content_string, html_content_string, mail_not_send_csv_path if error_email_list else None)

    sys.stdout.write("Backup sent....")
    sys.stdout.flush()
