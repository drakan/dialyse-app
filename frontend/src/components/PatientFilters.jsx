// src/components/PatientFilters.jsx

import React from 'react';
import { PATIENT_FILTERS } from '../constants/patientFields';

const PatientFilters = ({
  filters,
  onFilterChange,
  filterOptions,
  fixedType,
  searchTerm,
  onSearchTermChange
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* 🔍 Champ de recherche par nom */}
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="border p-2 rounded min-w-[200px]"
      />

      {/* ⬇️ Filtres dynamiques (sexe, gs, type...) */}
      {PATIENT_FILTERS
        .filter(({ key }) => !(fixedType && key === 'type')) // ne pas afficher le filtre type si fixé dans l’URL
        .map(({ key, label }) => (
          <select
            key={key}
            value={filters[key] || ''}
            onChange={(e) => onFilterChange(key, e.target.value)}
            className="border p-2 rounded min-w-[150px]"
          >
            <option value="">{label}</option>
            {(filterOptions[key] || []).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        ))}
    </div>
  );
};

export default PatientFilters;
