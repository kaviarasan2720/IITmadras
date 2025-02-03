from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
from .services import generate_admission_pdf  

api = Blueprint('api', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf', 'jpeg', 'jpg', 'png'}

@api.route('/apply', methods=['POST'])
def submit_application():
    from .models import db, Application 

    data = request.form
    degree_certificate = request.files.get('degree_certificate')
    id_proof = request.files.get('id_proof')
    profile_image = request.files.get('profile_image') 


    if not degree_certificate or not allowed_file(degree_certificate.filename):
        return jsonify({"error": "Invalid degree certificate"}), 400
    if not id_proof or not allowed_file(id_proof.filename):
        return jsonify({"error": "Invalid ID proof"}), 400
    if not profile_image or not allowed_file(profile_image.filename):
        return jsonify({"error": "Invalid profile image"}), 400


    degree_filename = secure_filename(degree_certificate.filename)
    degree_certificate.save(os.path.join('uploads', degree_filename))

    id_filename = secure_filename(id_proof.filename)
    id_proof.save(os.path.join('uploads', id_filename))

    profile_image_filename = secure_filename(profile_image.filename)
    profile_image.save(os.path.join('uploads', profile_image_filename))  


    application = Application(
        name=data['name'],
        email=data['email'],
        date_of_birth=data['date_of_birth'],
        degree_certificate_path=degree_filename,
        id_proof_path=id_filename,
        address=data['address'],
        city=data['city'],
        nationality=data['nationality'],
        guardian_number=data['guardian_number'],
        mobile_number=data['mobile_number'],
        parent_name=data['parent_name'],
        age=data['age'],
        qualification=data['qualification'],
        profile_image_path=profile_image_filename,
        pincode=data['pincode'],
        selected_course=data['selected_course']
    )
    db.session.add(application)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully"}), 200



@api.route('/admin/review', methods=['GET'])
def review_applications():
    from .models import Application  

    applications = Application.query.filter_by(status='Pending').all()
    return jsonify([
        {
            "id": app.id,
            "name": app.name,
            "email": app.email,
            "status": app.status
        } for app in applications
    ])


@api.route('/admin/approve/<int:app_id>', methods=['POST'])
def approve_application(app_id):
    from .models import db, Application  

    application = Application.query.get_or_404(app_id)


    if application.status != 'Pending':
        return jsonify({"error": "Application has already been processed"}), 400


    application.status = 'Approved'
    db.session.commit()


    pdf_path = generate_admission_pdf(application)

    return jsonify({"message": "Application approved", "pdf_path": pdf_path}), 200


@api.route('/admin/reject/<int:app_id>', methods=['POST'])
def reject_application(app_id):
    from .models import db, Application  

    application = Application.query.get_or_404(app_id)

    if application.status != 'Pending':
        return jsonify({"error": "Application has already been processed"}), 400


    application.status = 'Rejected'
    db.session.commit()

    return jsonify({"message": "Application rejected"}), 200


@api.route('/download_admission/<int:app_id>', methods=['GET'])
def download_admission(app_id):
    from .models import Application 


    application = Application.query.get_or_404(app_id)


    if application.status != 'Approved':
        return jsonify({"error": "Application not approved"}), 400


    pdf_filename = f'admission_{app_id}.pdf'
    pdf_path = os.path.join('generated_pdfs', pdf_filename)


    if not os.path.exists(pdf_path):
        return jsonify({"error": "PDF not found"}), 404


    return send_file(pdf_path, as_attachment=True)
