import binascii
import os
import shutil
import sys
import pandas as pd
from cert import Cert
from mail import mail
from mail import notify


if __name__ == '__main__':
    execution_mode = os.environ.get('EXECUTION_MODE')
    print("reached here")

    template_type = sys.argv[1]
    recipient_type = sys.argv[2]
    event_name = sys.argv[3]
    csv_file_path = sys.argv[4]
    auth_user_name = sys.argv[5]
    auth_user_email = sys.argv[6]
    action_time = sys.argv[7]
    event_id = sys.argv[8]
    event_start_date = sys.argv[9]

    recipient_df = pd.read_csv(csv_file_path)
    try:
        recipient_names = recipient_df['Name'].to_list()
        recipient_emails = recipient_df['Email'].to_list()
        college_names = recipient_df['Institution Name'].to_list()
        winner_positions = None
        if "Position" in recipient_df.columns.to_list():
            winner_positions = recipient_df['Position'].to_list()
    except Exception as e:
        print("Invalid CSV File")

    dir_name = str(binascii.b2a_hex(os.urandom(4)), 'UTF-8')
    cert_gen_dir_path = "./generated_certificates/{}".format(dir_name) if (execution_mode == 'test') else "src/scripts/generated_certificates/{}".format(dir_name)
    if not os.path.exists(cert_gen_dir_path):
        os.mkdir(cert_gen_dir_path)

    try:
        cert = Cert(template_type, recipient_type, event_name, event_start_date)
        purpose = "{} - {}".format(cert.event_name, cert.certificate_title)
        if isinstance(recipient_emails, list) and isinstance(recipient_names, list) and isinstance(college_names, list):
            index = 0
            for recipient_name, recipient_email in zip(recipient_names, recipient_emails):
                cert_path = cert.create(recipient_name, college_names[index], None, dir_name, event_id, recipient_email)
                mail(cert, recipient_email)
                index += 1
    except Exception as e:
        print(e)
        if os.path.exists(cert_gen_dir_path):
            if len(os.listdir(cert_gen_dir_path)) != 0:
                notify(cert_gen_dir_path, auth_user_email, auth_user_name, purpose, False, action_time)
                # TODO: Complete this
                shutil.rmtree(cert_gen_dir_path)
                print('Cert Gen Aborted')

    notify(cert_gen_dir_path, auth_user_email, auth_user_name, purpose, True, action_time)
    shutil.rmtree(os.path.join(cert_gen_dir_path, "..", "zipped"))
    shutil.rmtree(cert_gen_dir_path)
