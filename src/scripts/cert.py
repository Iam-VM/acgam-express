import os
import json
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

    def __init__(self, template_type, recipient_type, event_name, event_start_date,):
        self.execution_mode = os.environ.get('EXECUTION_MODE')

        self.template_type = template_type
        self.recipient_type = recipient_type
        self.issuing_organization = self.issuing_organization_names[self.template_type]
        self.certificate_title = self.certificate_titles[self.recipient_type]
        self.event_name = event_name
        self.event_start_date = event_start_date
        self.college_name = None
        self.recipient_name = None
        self.cert_path = None

        self.template_path = '../../fileSystem/certificateTemplates/{} {}.png'.format(self.template_type, self.recipient_type) if (self.execution_mode == 'test') else 'fileSystem/certificateTemplates/{} {}.png'.format(self.template_type, self.recipient_type)

        json_file = open('./templateProperties.json' if self.execution_mode == 'test' else 'src/scripts/templateProperties.json', 'r')
        template_properties = json.load(json_file)[self.template_type][self.recipient_type]

        '''Configurations'''
        # Coordinates
        self.name_coords = (template_properties["name_coords"]["x"], template_properties["name_coords"]["y"])
        self.college_coords = (template_properties["college_coords"]["x"], template_properties["college_coords"]["y"])
        self.event_coords = (template_properties["event_coords"]["x"], template_properties["event_coords"]["y"])
        self.position_coords = None if recipient_type != "Winners" else (template_properties["position_coords"]["x"], template_properties["position_coords"]["y"])
        self.qrcode_coords = (template_properties["qrcode_coords"]["x"], template_properties["qrcode_coords"]["y"])
        self.date_coords = (template_properties["date_coords"]["x"], template_properties["date_coords"]["y"])

        # Font Setting
        # color
        self.text_color_name = '#012f31'
        self.text_color_college = '#012f31'
        self.text_color_event = '#707070'
        self.text_color_date = '#012f31'
        self.text_color_position = '#012f31'
        # Face
        self.font_for_name = ImageFont.truetype("./fonts/Philosopher-BoldItalic.ttf" if (self.execution_mode == 'test') else "src/scripts/fonts/Philosopher-BoldItalic.ttf", 75)
        self.font_for_event = ImageFont.truetype("./fonts/Poppins-Regular-400.ttf" if (self.execution_mode == 'test') else "src/scripts/fonts/Poppins-Regular-400.ttf", 50)
        self.font_for_college = ImageFont.truetype("./fonts/Philosopher-Regular.ttf" if (self.execution_mode == 'test') else "src/scripts/fonts/Philosopher-Regular.ttf", 50)
        self.font_for_date = ImageFont.truetype("./fonts/Philosopher-Regular.ttf" if (self.execution_mode == 'test') else "src/scripts/fonts/Philosopher-Regular.ttf", 50)
        self.font_for_position = ImageFont.truetype("./fonts/Philosopher-Regular.ttf" if (self.execution_mode == 'test') else "src/scripts/fonts/Philosopher-Regular.ttf", 50)

    def create(self, recipient_name, college_name, winner_position, dir_name, event_id, recipient_email):

        self.recipient_name = recipient_name
        self.college_name = college_name

        # creating image
        im = Image.open(self.template_path)
        image = Image.new('RGB', im.size, (255, 255, 255))
        image.paste(im)
        d = ImageDraw.Draw(image)

        # TODO Collect event_start_date and winner_position

        # line heights
        name_line_width, name_line_height = d.textsize(self.recipient_name, self.font_for_name)
        event_line_width, event_line_height = d.textsize(self.event_name, self.font_for_event)
        college_name_line_width, college_name_line_height = d.textsize(self.college_name, self.font_for_college)
        date_line_width, date_line_height = d.textsize(self.event_start_date, self.font_for_date)
        if winner_position is not None:
            position_line_width, position_line_height = d.textsize(winner_position, self.font_for_event)

        # writing text on image
        d.text((self.name_coords[0] - name_line_width / 2, self.name_coords[1] - name_line_height / 2), self.recipient_name, fill=self.text_color_name, font=self.font_for_name)
        d.text((self.event_coords[0] - event_line_width / 2, self.event_coords[1] - event_line_height / 2), self.event_name, fill=self.text_color_event, font=self.font_for_event)
        d.text((self.college_coords[0] - college_name_line_width / 2, self.college_coords[1] - college_name_line_height / 2), self.college_name, fill=self.text_color_college, font=self.font_for_college)
        d.text((self.date_coords[0] - date_line_width / 2, self.date_coords[1] - date_line_height / 2), self.event_start_date, fill=self.text_color_date, font=self.font_for_date)
        if winner_position is not None:
            d.text((self.position_coords[0] - position_line_width / 2, self.position_coords[1] - position_line_height / 2), winner_position, fill=self.text_color_position, font=self.font_for_position)

        # Adding reference to db
        cert_ref_id = save_ref(event_id, recipient_email, recipient_name)

        # generating and pasting QR Code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=5,
            border=4,
        )
        # TODO: change QR Data URL given for production
        qr_data = "https://certvalidator.herokuapp.com/ref/{}".format(cert_ref_id) if self.execution_mode == 'test' else "https://certvalidator.herokuapp.com/ref/{}".format(cert_ref_id)
        qr.add_data(qr_data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white")
        image.paste(qr_img, self.qrcode_coords)

        # saving image
        cert_save_path = "./generated_certificates/{}/{}".format(dir_name, self.recipient_name + ".pdf") if (self.execution_mode == 'test') else "src/scripts/generated_certificates/{}/{}".format(dir_name, self.recipient_name + ".pdf")
        image.save(cert_save_path)
        print('saving cert of: ' + self.recipient_name)

        self.cert_path = cert_save_path
        return self.cert_path
