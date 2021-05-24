import sys
import os


def throw_csv_poorly_formatted(csv_file_path):
    sys.stdout.write("CSV File Poorly Formatted")
    sys.stdout.flush()
    os.remove(csv_file_path)
    exit()


def throw_unimplemented_template(csv_file_path):
    sys.stdout.write("Certificate Template Not Found")
    sys.stdout.flush()
    os.remove(csv_file_path)
    exit()

