import React from "react";

const Sidebar = ({ onSelect }) => {
  const navItems = [
    { label: 'Statistiques', key: 'dashboard' },
    { label: 'Liste des patients', key: 'patients' },
    // Tu peux ajouter d'autres pages ici
  ];

  return (
    <div className="w-64 h-full bg-gray-900 text-white p-6 space-y-6 shadow-md">
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Dialyse App</h1>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="text-left text-sm px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
