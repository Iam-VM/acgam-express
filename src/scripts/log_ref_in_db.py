import psycopg2
import os
import binascii


def save_ref(event_id, recipient_email):
    con = psycopg2.connect(database=os.environ.get('HEROKU_POSTGRES_DATABASE'),
                           user=os.environ.get('HEROKU_POSTGRES_USER'),
                           password=os.environ.get('HEROKU_POSTGRES_PASSWORD'),
                           host=os.environ.get('HEROKU_POSTGRES_HOST'),
                           port=os.environ.get('HEROKU_POSTGRES_PORT'))
    cur = con.cursor()
    cert_ref_id = str(binascii.b2a_hex(os.urandom(32)), 'UTF-8')
    cur.execute(
        'INSERT INTO certs ("id", "eventId", "recipientEmail") VALUES ({}, {}, {});'.format("'" + cert_ref_id + "'", "'" + event_id + "'", "'" + recipient_email + "'")
    )

    con.commit()
    con.close()
    return cert_ref_id
