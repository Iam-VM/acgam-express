import binascii
import shutil
import os
import sys
import pandas as pd
from cert import Cert
from mail import mail
from mail import notify
from error_lib import *


if __name__ == '__main__':
    execution_mode = os.environ.get('EXECUTION_MODE')

    template_type = sys.argv[1]
    recipient_type = sys.argv[2]
    event_name = sys.argv[3]
    csv_file_path = sys.argv[4]
    auth_user_name = sys.argv[5]
    auth_user_email = sys.argv[6]
    action_time = sys.argv[7]
    event_id = sys.argv[8]
    event_start_date = sys.argv[9]
    is_winner = bool(int(sys.argv[10]))

    try:
        recipient_df = pd.read_csv(csv_file_path)
    except Exception as e:
        sys.stderr.write("Corrupted CSV File")
        os.remove(csv_file_path)
        exit()

    # Checking CSV Format
    recipient_names = None
    recipient_emails = None
    college_names = None
    winner_positions = None

    if 'Name' in recipient_df.columns and 'Email' in recipient_df.columns and 'Institution Name' in recipient_df.columns:
        is_nan_in_df = recipient_df.isnull().any().to_list()
        if not (True in is_nan_in_df):
            recipient_names = recipient_df['Name'].to_list()
            recipient_emails = recipient_df['Email'].to_list()
            college_names = recipient_df['Institution Name'].to_list()
            if recipient_names and recipient_emails and college_names:
                if len(recipient_names) == len(recipient_emails) == len(college_names):
                    if is_winner and 'Position' in recipient_df.columns:
                        winner_positions = recipient_df['Position'].to_list()
                        if not (len(recipient_names) == len(winner_positions)):
                            throw_csv_poorly_formatted(csv_file_path)
                else:
                    throw_csv_poorly_formatted(csv_file_path)
            else:
                throw_csv_poorly_formatted(csv_file_path)
        else:
            throw_csv_poorly_formatted(csv_file_path)
    else:
        throw_csv_poorly_formatted(csv_file_path)

    # Checking if certificate template exists
    template_path = '../../fileSystem/certificateTemplates/{} {}.png'.format(template_type, recipient_type) if (execution_mode == 'test') else 'fileSystem/certificateTemplates/{} {}.png'.format(template_type, recipient_type)
    if not os.path.isfile(template_path):
        throw_unimplemented_template(csv_file_path)

    # Creating directory to store certificates
    dir_name = str(binascii.b2a_hex(os.urandom(4)), 'UTF-8')
    cert_gen_dir_path = "./generated_certificates/{}".format(dir_name) if (execution_mode == 'test') else "src/scripts/generated_certificates/{}".format(dir_name)
    if not os.path.exists(cert_gen_dir_path):
        os.mkdir(cert_gen_dir_path)

    # creating and sending certificates
    cert = Cert(template_type, recipient_type, event_name, event_start_date, is_winner, template_path)
    purpose = "{} - {}".format(cert.event_name, cert.certificate_title)
    email_error_list = []

    try:
        index = 0
        for recipient_name, recipient_email, college_name in zip(recipient_names, recipient_emails, college_names):
            cert_path = cert.create(recipient_name, college_name, None if not is_winner else winner_positions[index], dir_name, event_id, recipient_email)
            error_email = mail(cert, recipient_email)
            if error_email is not None:
                email_error_list.append(error_email)
            index += 1
    except Exception as e:
        sys.stderr.write(str(e))
        sys.stdout.flush()
        if os.path.exists(cert_gen_dir_path):
            if len(os.listdir(cert_gen_dir_path)) != 0:
                notify(cert_gen_dir_path, auth_user_email, auth_user_name, purpose, False, action_time, email_error_list)
                # TODO: Complete this
                shutil.rmtree(cert_gen_dir_path)
                os.remove(csv_file_path)
                sys.stdout.flush()
        sys.stdout.flush()
        sys.stdout.write("exit")
        sys.stdout.flush()
        exit()

    notify(cert_gen_dir_path, auth_user_email, auth_user_name, purpose, True, action_time, email_error_list)
    shutil.rmtree(os.path.join(cert_gen_dir_path, "..", "zipped"))
    os.remove(csv_file_path)
    shutil.rmtree(cert_gen_dir_path)
    sys.stdout.flush()
    sys.stdout.write("exit")
    sys.stdout.flush()
    exit()
