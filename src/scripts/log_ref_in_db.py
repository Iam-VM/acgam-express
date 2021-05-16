import psycopg2
import os
import binascii


def save_ref(event_id, recipient_email, recipient_name):
    con = psycopg2.connect(database=os.environ.get('POSTGRES_DATABASE'),
                           user=os.environ.get('POSTGRES_USER'),
                           password=os.environ.get('POSTGRES_PASSWORD'),
                           host=os.environ.get('POSTGRES_HOST'),
                           port=os.environ.get('POSTGRES_PORT'))
    cur = con.cursor()
    cert_ref_id = str(binascii.b2a_hex(os.urandom(16)), 'UTF-8')
    cur.execute(
        'INSERT INTO certs ("id", "eventId", "recipientEmail", "recipientName") VALUES ({}, {}, {}, {});'.format("'" + cert_ref_id + "'", "'" + event_id + "'", "'" + recipient_email + "'", "'" + recipient_name + "'")
    )

    con.commit()
    con.close()
    return cert_ref_id
