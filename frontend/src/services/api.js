// src/services/api.js

const API_BASE = 'https://dialyse-api.onrender.com/api/patients';

// 📦 Fonction utilitaire pour gérer les réponses
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Erreur inconnue');
  }
  return res.json();
};

// 🔍 Récupère tous les patients (avec possibilité de filtrer par nom, type, sexe, etc.)
export const fetchPatients = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/?${query}`);
  return handleResponse(res);
};

// 🔄 Récupère les données d’un patient spécifique via son ID
export const fetchPatientById = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse(res);
};

// ✏️ Met à jour les informations d’un patient
export const updatePatient = async (id, data) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// ❌ Supprime un patient par son ID
export const deletePatient = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

// 📊 Récupère les statistiques de patients par type (permanent, vacancier, etc.)
export const fetchPatientStats = async () => {
  const res = await fetch(`${API_BASE}/stats`);
  return handleResponse(res);
};

// 📋 Récupère dynamiquement les options de filtres (sexes, groupes sanguins, types)
export const fetchFilterOptions = async () => {
  const res = await fetch(`${API_BASE}/filter-options`);
  return handleResponse(res);
};
