// frontend/src/pages/PatientDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPatientById } from '../services/api';
import { PATIENT_FIELD_LABELS } from '../constants/patientFields';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPatientById(id);
        setPatient(data);
      } catch (err) {
        setError("Impossible de charger les détails du patient.");
      }
    };
    load();
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!patient) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Détails du patient</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(PATIENT_FIELD_LABELS).map(([key, label]) => (
          <div key={key}>
            <strong>{label} :</strong> {patient[key]}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Consultations
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Ordonnances
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Analyses
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
