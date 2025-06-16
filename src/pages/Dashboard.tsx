
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DonorDashboard from '@/components/DonorDashboard';
import PatientDashboard from '@/components/PatientDashboard';
import AdminDashboard from '@/components/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'donor':
      return <DonorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
};

export default Dashboard;
