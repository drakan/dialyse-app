# backend/queries/patients_queries.py

# Champs mis à jour dynamiquement dans la requête UPDATE
PATIENT_UPDATE_FIELDS = [
    'nom', 'cin', 'acm', 'sex', 'dnaiss', 'gs',
    'adresse', 'num_tel', 'num_tel_urg', 'profession', 'type'
]

def get_all_patients_query(nom=None):
    if nom:
        return "SELECT * FROM patients WHERE nom ILIKE %(nom)s ORDER BY patientsid"
    return "SELECT * FROM patients ORDER BY patientsid"

def get_unique_gs_query():
    return "SELECT DISTINCT gs FROM patients WHERE gs IS NOT NULL"

def get_unique_sex_query():
    return "SELECT DISTINCT sex FROM patients WHERE sex IS NOT NULL"

def get_patient_by_id_query():
    return "SELECT * FROM patients WHERE patientsid = %s"

def update_patient_query():
    set_clause = ", ".join([f"{field} = %s" for field in PATIENT_UPDATE_FIELDS])
    return f"UPDATE patients SET {set_clause} WHERE patientsid = %s"

def delete_patient_query():
    return "DELETE FROM patients WHERE patientsid = %s"
