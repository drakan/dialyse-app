import { fetchFilterOptions } from '../services/api';

// Libellés des colonnes du tableau
export const PATIENT_FIELD_LABELS = [
  { key: 'patientsid', label: 'ID' },
  { key: 'nom', label: 'Nom' },
  { key: 'cin', label: 'CIN' },
  { key: 'acm', label: 'ACM' },
  { key: 'sex', label: 'Sexe' },
  { key: 'gs', label: 'Groupe sanguin' },
  { key: 'dnaiss', label: 'Date de naissance' },
  { key: 'num_tel', label: 'Téléphone' },
  { key: 'num_tel_urg', label: 'Tél urgence' },
  { key: 'adresse', label: 'Adresse' },
  { key: 'profession', label: 'Profession' },
  { key: 'type', label: 'Type' },
];

// Filtres dynamiques à afficher dans l’interface
export const PATIENT_FILTERS = [
  {
    key: 'sex',
    label: 'Sexe',
    fetchOptions: async () => {
      const options = await fetchFilterOptions();
      return options.sex;
    },
  },
  {
    key: 'gs',
    label: 'Groupe sanguin',
    fetchOptions: async () => {
      const options = await fetchFilterOptions();
      return options.gs;
    },
  },
  {
    key: 'type',
    label: 'Type de patient',
    fetchOptions: async () => {
      const options = await fetchFilterOptions();
      return options.type;
    },
  },
];
