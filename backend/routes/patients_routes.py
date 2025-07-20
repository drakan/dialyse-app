from flask import Blueprint, jsonify, request
from db import get_db_connection
from queries.patients_queries import (
    get_all_patients_query,
    get_unique_gs_query,
    get_unique_sex_query,
    get_patient_by_id_query,
    update_patient_query,
    delete_patient_query,
    PATIENT_UPDATE_FIELDS
)

patients_bp = Blueprint('patients', __name__, url_prefix='/api/patients')

@patients_bp.route('/', methods=['GET'])
def get_all_patients():
    nom = request.args.get('nom', '')
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(get_all_patients_query(nom), {'nom': f'%{nom}%'})
    patients = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(patients)

@patients_bp.route('/gs', methods=['GET'])
def get_unique_gs():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(get_unique_gs_query())
    gs_list = [row['gs'] for row in cur.fetchall() if row['gs']]
    cur.close()
    conn.close()
    return jsonify(gs_list)

@patients_bp.route('/sex', methods=['GET'])
def get_unique_sex():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(get_unique_sex_query())
    sex_list = [row['sex'] for row in cur.fetchall() if row['sex']]
    cur.close()
    conn.close()
    return jsonify(sex_list)

@patients_bp.route('/type', methods=['GET'])
def get_unique_type():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT type FROM patients WHERE type IS NOT NULL ORDER BY type")
    type_list = [row['type'] for row in cur.fetchall() if row['type']]
    cur.close()
    conn.close()
    return jsonify(type_list)

@patients_bp.route('/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(get_patient_by_id_query(), (patient_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if row:
        return jsonify(row)
    return jsonify({'error': 'Patient non trouvé'}), 404

@patients_bp.route('/<int:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.get_json()
    values = tuple(data[field] for field in PATIENT_UPDATE_FIELDS) + (patient_id,)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(update_patient_query(), values)
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Patient mis à jour avec succès'})

@patients_bp.route('/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(delete_patient_query(), (patient_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Patient supprimé avec succès'})

@patients_bp.route('/filter-options', methods=['GET'])
def get_filter_options():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT sex FROM patients WHERE sex IS NOT NULL")
    sexes = [row['sex'] for row in cur.fetchall() if row['sex']]

    cur.execute("SELECT DISTINCT gs FROM patients WHERE gs IS NOT NULL")
    gs_list = [row['gs'] for row in cur.fetchall() if row['gs']]

    cur.execute("SELECT DISTINCT type FROM patients WHERE type IS NOT NULL")
    types = [row['type'] for row in cur.fetchall() if row['type']]

    cur.close()
    conn.close()
    return jsonify({
        'sex': sexes,
        'gs': gs_list,
        'type': types
    })
