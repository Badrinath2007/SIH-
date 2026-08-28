import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  POLICE: {
    id: 'police',
    name: 'Traffic Police Command',
    nameSimple: 'Police & Traffic Control',
    icon: '👮',
    badgeColor: 'bg-blue-600',
    description: 'Monitor hit-and-run alerts, ANPR license plates, rash driving & speed violations.',
    descriptionSimple: 'Catch dangerous drivers, view license plate scans, and respond to accident alerts.'
  },
  MAINTENANCE: {
    id: 'maintenance',
    name: 'Municipal Road Maintenance',
    nameSimple: 'Road Repair & Fix Team',
    icon: '🛠️',
    badgeColor: 'bg-amber-600',
    description: 'Track potholes, missing zebra crossings, damaged signboards & issue repair work orders.',
    descriptionSimple: 'See road damage, potholes, and broken signs to send repair workers.'
  },
  TRANSIT: {
    id: 'transit',
    name: 'Transit Fleet Authority',
    nameSimple: 'Bus Manager & Traffic Director',
    icon: '🚌',
    badgeColor: 'bg-emerald-600',
    description: 'Overview of bus fleet routes, passenger density, edge AI health & origin-destination flows.',
    descriptionSimple: 'Check where buses are, how crowded they are, and bus route delays.'
  },
  CITIZEN: {
    id: 'citizen',
    name: 'Public Citizen Safety View',
    nameSimple: 'City Resident / Normal Public View',
    icon: '👤',
    badgeColor: 'bg-purple-600',
    description: 'Public view of road safety index, city condition reports, and active hazard warnings.',
    descriptionSimple: 'Easy view for everyday citizens to see safe roads and city updates.'
  }
};

export const AuthProvider = ({ children }) => {
  // Default to null to present full login page landing screen
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const loginAsRole = (roleKey) => {
    const selectedRole = Object.values(ROLES).find((r) => r.id === roleKey);
    if (selectedRole) {
      setUser(selectedRole);
      setIsLoginOpen(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoginOpen(true);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        ROLES,
        loginAsRole,
        logout,
        isLoginOpen,
        setIsLoginOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
