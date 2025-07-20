import csv
import psycopg2

# Connexion à PostgreSQL
conn = psycopg2.connect(
    dbname="dialyse_db",
    user="postgres",
    password="drakan",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Ouverture du fichier CSV
with open('Patients.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        cur.execute("""
            INSERT INTO patients (
                PatientsID, Nom, CIN, ACM, Sex, DNaiss, GS,
                Adresse, Num_Tel, Num_Tel_Urg, Profession, Type
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s
            )
        """, (
            row['PatientsID'], row['Nom'], row['CIN'], row['ACM'], row['Sex'],
            row['Date_Naissance'], row['Gs'], row['Adresse'], row['Num_Tel'],
            None,  # Num_Tel_Urg est manquant dans le CSV → on met NULL
            row['Profession'], row['Type']
        ))

conn.commit()
cur.close()
conn.close()

print("Importation terminée avec succès.")
