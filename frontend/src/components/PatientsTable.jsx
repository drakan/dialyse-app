import React, { useState } from 'react';
// import { CSVLink } from 'react-csv'; // 📝 Bouton Export CSV désactivé temporairement
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { PATIENT_FIELD_LABELS } from '../constants/patientFields';
import { formatDate } from '../utils/formatDate';

const PatientsTable = ({ patients }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const offset = currentPage * itemsPerPage;
  const currentPatients = patients.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(patients.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleRowClick = (id) => {
    navigate(`/patients/${id}`);
  };

  return (
    <div>
      {/* 📝 Export CSV désactivé pour l’instant */}
      {/* <div className="mb-4">
        <CSVLink
          data={patients}
          headers={PATIENT_FIELD_LABELS.map(({ key, label }) => ({ label, key }))}
          filename="patients.csv"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Exporter CSV
        </CSVLink>
      </div> */}

      {/* 📋 Tableau des patients */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {PATIENT_FIELD_LABELS.map(({ label, key }) => (
              <th key={key} className="border px-4 py-2 text-left">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr
              key={patient.patientsid}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(patient.patientsid)}
            >
              {PATIENT_FIELD_LABELS.map(({ key }) => (
                <td key={key} className="border px-4 py-2">
                  {key === 'dnaiss'
                    ? formatDate(patient[key])
                    : patient[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex space-x-2"
          activeClassName="font-bold text-blue-600"
          pageClassName="px-3 py-1 border rounded"
          previousLabel="←"
          nextLabel="→"
          breakLabel="..."
          breakClassName="px-3"
        />
      </div>
    </div>
  );
};

export default PatientsTable;
