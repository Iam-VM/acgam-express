import os
from PIL import Image, ImageDraw, ImageFont
import qrcode
from log_ref_in_db import save_ref


class Cert:
    issuing_organization_names = {
        "SB Template": "IEEE SB GEC Palakkad",
        "CS Template": "IEEE CS SBC GEC Palakkad",
        "IAS Template": "IEEE IAS SBC GEC Palakkad",
        "WIE Template": "IEEE WIE AG GEC Palakkad"
    }
    certificate_titles = {
        "Participants": "Certificate Of Participation",
        "Winners": "Certificate of Achievement",
        "Volunteers": "Volunteer Certificate",
        "Coordinators": "Coordinator Certificate"
    }

    def __init__(self, template_type, recipient_type, event_name):
        self.template_type = template_type
        self.recipient_type = recipient_type
        self.issuing_organization = self.issuing_organization_names[self.template_type]
        self.certificate_title = self.certificate_titles[self.recipient_type]
        self.event_name = event_name
        self.college_name = None
        self.recipient_name = None
        self.cert_path = None

    def create(self, recipient_name, college_name, dir_name, event_id, recipient_email):
        execution_mode = os.environ.get('EXECUTION_MODE')
        self.recipient_name = recipient_name
        self.college_name = college_name

        # creating image
        template_path = '../../fileSystem/certificateTemplates/{} {}.png'.format(self.template_type, self.recipient_type) if (execution_mode == 'test') else 'fileSystem/certificateTemplates/{} {}.png'.format(self.template_type, self.recipient_type)
        im = Image.open(template_path)
        image = Image.new('RGB', im.size, (255, 255, 255))
        image.paste(im)
        d = ImageDraw.Draw(image)

        '''Configurations'''
        # coordinates
        name_coord_x, name_coord_y = (500, 594)
        event_coord_x, event_coord_y = (500, 500)
        college_name_coord_x, college_name_coord_y = (500, 500)

        # fonts
        text_color = '#000000'
        font_for_name = ImageFont.truetype("./fonts/MontserratBold.ttf" if (execution_mode == 'test') else "src/scripts/fonts/MontserratBold.ttf", 35)
        font_for_event = ImageFont.truetype("./fonts/MontserratBold.ttf" if (execution_mode == 'test') else "src/scripts/fonts/MontserratBold.ttf", 35)
        font_for_college_name = ImageFont.truetype("./fonts/MontserratBold.ttf" if (execution_mode == 'test') else "src/scripts/fonts/MontserratBold.ttf", 50)

        # line heights
        name_line_width, name_line_height = d.textsize(self.recipient_name, font_for_name)
        event_line_width, event_line_height = d.textsize(self.event_name, font_for_event)
        college_name_line_width, college_name_line_height = d.textsize(self.college_name, font_for_college_name)

        # writing text on image
        d.text((name_coord_x - name_line_width / 2, name_coord_y - name_line_height / 2), self.recipient_name, fill=text_color,
               font=font_for_name)
        d.text((event_coord_x - event_line_width / 2, event_coord_y - event_line_height / 2), self.event_name, fill=text_color,
               font=font_for_event)
        d.text(
            (college_name_coord_x - college_name_line_width / 2, college_name_coord_y - college_name_line_height / 2),
            self.college_name, fill=text_color, font=font_for_college_name)

        # Adding reference to db
        cert_ref_id = save_ref(event_id, recipient_email)

        # generating and pasting QR Code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=5,
            border=4,
        )
        # TODO: change QR Data URL given for production
        qr_data = "http://localhost:3000/cv/{}".format(cert_ref_id) if execution_mode == 'test' else "http://localhost:3000/cv/{}".format(cert_ref_id)
        qr.add_data(qr_data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white")
        image.paste(qr_img, (2000, 3000))

        # saving image
        cert_save_path = "./generated_certificates/{}/{}".format(dir_name, self.recipient_name + ".pdf") if (execution_mode == 'test') else "src/scripts/generated_certificates/{}/{}".format(dir_name, self.recipient_name + ".pdf")
        image.save(cert_save_path)
        print('saving cert of: ' + self.recipient_name)

        self.cert_path = cert_save_path
        return self.cert_path
