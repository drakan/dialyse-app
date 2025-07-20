// src/pages/Patients.jsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  fetchPatients,
  fetchFilterOptions
} from '../services/api';
import PatientsTable from '../components/PatientsTable';
import PatientFilters from '../components/PatientFilters';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fixedType = queryParams.get('type'); // ?type=permanent etc.

  // 🔄 Charger patients depuis le backend avec recherche
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const params = { nom: searchTerm };
        const data = await fetchPatients(params);
        setPatients(data);
      } catch (error) {
        console.error('Erreur lors du chargement des patients :', error);
      }
    };
    loadPatients();
  }, [searchTerm]);

  // 📥 Charger options dynamiques des filtres
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const options = await fetchFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Erreur lors du chargement des options de filtre :', error);
      }
    };
    loadOptions();
  }, []);

  // 🧪 Appliquer les filtres dynamiques (type, sexe, gs...)
  useEffect(() => {
    let results = [...patients];

    // Appliquer filtre fixé via URL (?type=permanent)
    if (fixedType) {
      results = results.filter((p) => p.type === fixedType);
    }

    // Filtres dynamiques autres que 'nom'
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        results = results.filter((p) => p[key] === value);
      }
    });

    setFilteredPatients(results);
  }, [patients, filters, fixedType]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des patients</h2>

      <PatientFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        fixedType={fixedType}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      <PatientsTable patients={filteredPatients} />
    </div>
  );
};

export default Patients;
