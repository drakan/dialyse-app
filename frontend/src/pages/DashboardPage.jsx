// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  HeartIcon,
  BriefcaseIcon,
  PlaneIcon,
  CrossIcon,
} from "lucide-react"; // Lucide icons

const typeLabels = {
  permanent: "Patients permanents",
  vacancier: "Patients vacanciers",
  greffe: "Patients greffés",
  transfere: "Patients transférés",
  decede: "Patients décédés",
};

const typeColors = {
  permanent: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  vacancier: "bg-green-100 text-green-700 hover:bg-green-200",
  greffe: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  transfere: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  decede: "bg-red-100 text-red-700 hover:bg-red-200",
};

const typeIcons = {
  permanent: <BriefcaseIcon className="w-6 h-6 mb-2" />,
  vacancier: <PlaneIcon className="w-6 h-6 mb-2" />,
  greffe: <HeartIcon className="w-6 h-6 mb-2" />,
  transfere: <UserIcon className="w-6 h-6 mb-2" />,
  decede: <CrossIcon className="w-6 h-6 mb-2" />,
};

const DashboardPage = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/patients/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des statistiques :", err);
        setStats({});
        setLoading(false);
      });
  }, []);

  const handleCardClick = (type) => {
    navigate(`/patients?type=${type}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Statistiques des patients</h2>

      {loading ? (
        <div className="text-center text-gray-500">Chargement en cours...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(stats).map(([type, countObj]) => (
            <div
              key={type}
              className={`cursor-pointer p-6 rounded-2xl shadow-md transition duration-200 ${
                typeColors[type] || "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleCardClick(type)}
            >
              <div className="flex flex-col items-center">
                {typeIcons[type] || <UserIcon className="w-6 h-6 mb-2" />}
                <div className="text-3xl font-bold">{countObj?.count ?? 0}</div>
                <div className="text-sm mt-1 text-center">
                  {typeLabels[type] || type}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
