from . import db 
class Application(db.Model):
    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    date_of_birth = db.Column(db.String(10))
    degree_certificate_path = db.Column(db.String(200))
    id_proof_path = db.Column(db.String(200))
    address = db.Column(db.String(255))
    city = db.Column(db.String(100))
    nationality = db.Column(db.String(50))
    guardian_number = db.Column(db.String(20))
    mobile_number = db.Column(db.String(15))
    parent_name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    qualification = db.Column(db.String(255))
    profile_image_path = db.Column(db.String(255))
    pincode = db.Column(db.String(10))
    selected_course = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Pending')

    def __init__(self, name, email, date_of_birth, degree_certificate_path, id_proof_path, address, city, nationality, 
                 guardian_number, mobile_number, parent_name, age, qualification, profile_image_path, pincode, selected_course):
    
        self.name = name
        self.email = email
        self.date_of_birth = date_of_birth
        self.degree_certificate_path = degree_certificate_path
        self.id_proof_path = id_proof_path
        self.address = address
        self.city = city
        self.nationality = nationality
        self.guardian_number = guardian_number
        self.mobile_number = mobile_number
        self.parent_name = parent_name
        self.age = age
        self.qualification = qualification
        self.profile_image_path = profile_image_path
        self.pincode = pincode
        self.selected_course = selected_course
