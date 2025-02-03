import os
from flask import send_file
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_admission_pdf(application):

    pdf_dir = os.path.join(os.getcwd(), 'generated_pdfs')
    if not os.path.exists(pdf_dir):
        os.makedirs(pdf_dir)

    pdf_filename = f"admission_{application.id}.pdf"
    pdf_path = os.path.join(pdf_dir, pdf_filename)
    c = canvas.Canvas(pdf_path, pagesize=letter)
    c.drawString(100, 750, f"Admission Letter for {application.name}")
    c.drawString(100, 730, f"Email: {application.email}")
    c.drawString(100, 710, f"Degree Certificate: {application.degree_certificate_path}")
    c.drawString(100, 690, f"ID Proof: {application.id_proof_path}")
    c.drawString(100, 670, f"Status: {application.status}")
    c.drawString(100, 650, f"Address: {application.address}")
    c.drawString(100, 630, f"City: {application.city}")
    c.drawString(100, 610, f"Nationality: {application.nationality}")
    c.drawString(100, 590, f"Guardian Number: {application.guardian_number}")
    c.drawString(100, 570, f"Mobile Number: {application.mobile_number}")
    c.drawString(100, 550, f"Parent Name: {application.parent_name}")
    c.drawString(100, 530, f"Age: {application.age}")
    c.drawString(100, 510, f"Qualification: {application.qualification}")
    c.drawString(100, 490, f"Pincode: {application.pincode}")
    c.drawString(100, 470, f"Selected Course: {application.selected_course}")
    profile_image_path = os.path.join('uploads', application.profile_image_path)
    if os.path.exists(profile_image_path):
        c.drawImage(profile_image_path, 400, 550, width=100, height=100)  
    else:
        print(f"Profile image not found: {profile_image_path}")
    c.save()
    print(f"PDF Path: {pdf_path}")
    if not os.path.exists(pdf_path):
        print(f"Failed to create PDF at {pdf_path}")
        return "File not found", 404

    return pdf_path


def download_admission(application_id):

    application = get_application_by_id(application_id)

    pdf_path = generate_admission_pdf(application)

    if not os.path.exists(pdf_path):
        return f"PDF file for application {application_id} not found.", 404

    print(f"Attempting to serve file from {pdf_path}")

    return send_file(pdf_path, as_attachment=True)

def get_application_by_id(application_id):
    from models import Application, db

    application = Application.query.get(application_id)
    

    if not application:
        print(f"Application with ID {application_id} not found.")
        return None
    
    return application