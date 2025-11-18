import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header.jsx';
import Sidebar from '../../components/ui/Sidebar';
import WelcomeHeader from './components/WelcomeHeader.jsx';
import QuickStatsGrid from './components/QuickStatsGrid';
import QuickActionsPanel from './components/QuickActionsPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import UpcomingSchedule from './components/UpcomingSchedule';
import SystemStatusPanel from './components/SystemStatusPanel';
import NotificationCenter from './components/NotificationCenter';
import { useSelector } from 'react-redux';
 
const UnifiedDashboard = () => {

 
  const loggedUser = useSelector(state => state.user.loggedUser);
   const userRole = loggedUser.user.role ; // Default to 'patient' if not set



  const [currentTime, setCurrentTime] = useState('');


  // Mock stats data
  const mockStats = {
    patient: {
      upcomingAppointments: '3',
      pendingResults: '2',
      prescriptionsDue: '1',
      healthScore: '85%'
    },
    doctor: {
      todaysPatients: '12',
      pendingReviews: '8',
      teleconsultations: '5',
      satisfaction: '4.8'
    },
    admin: {
      bedOccupancy: '78%',
      staffOnDuty: '145',
      inventoryAlerts: '6',
      revenueToday: '$24.5K'
    },
    government: {
      activeFacilities: '127',
      diseaseAlerts: '3',
      resourceUtilization: '82%',
      policyCompliance: '94%'
    }
  };

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date();
      const timeString = now?.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);



  const handleActionClick = (action) => {
    if (action?.id === 'emergency' || action?.id === 'emergency-coord') {
      alert(`Emergency protocol activated for ${userData?.[userRole]?.name}. Emergency services have been notified.`);
    }
  };

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {/* <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} /> */}
      <main className={`pt-16 healthcare-transition `}>
        <div className="p-6 space-y-6">
          {/* Role Switcher - Demo Purpose */}
          {/* <div className="bg-white p-4 rounded-lg border border-slate-200 healthcare-shadow">

            {userRole}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">Demo: Switch User Role</span>
              <div className="flex space-x-2">
                {['patient', 'doctor', 'admin', 'government']?.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`px-3 py-1 text-xs font-medium rounded-full healthcare-transition ${userRole === role
                        ? 'bg-primary text-white' : 'bg-muted text-text-secondary hover:bg-slate-200'
                      }`}
                  >
                    {role?.charAt(0)?.toUpperCase() + role?.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div> */}

          {/* Welcome Header */}
          <WelcomeHeader
            userRole={userRole}
            userName={loggedUser?.user.name || 'User'}
            currentTime={currentTime}
          />

          {/* Quick Stats and Actions Panel */}
          <div className=' flex flex-col  gap-6'>
            <QuickStatsGrid
              userRole={userRole}
              stats={loggedUser?.user?.[userRole]}
            />


            <QuickActionsPanel
              userRole={userRole}
              onActionClick={handleActionClick}
            />
          </div>


          {/* Main Content Grid */}
          <div className="w-full">
          
           


              {/* Recent Activity */}
              <RecentActivityFeed
                userRole={userRole}
                activities={[]}
              />

              {/* System Status */}
              {/* <SystemStatusPanel
                userRole={userRole}
                systemStatus={{}}
              /> */}
           

            {/* Right Column */}
            {/* <div className="space-y-6"> */}
              {/* Upcoming Schedule */}
              {/* <UpcomingSchedule
                userRole={userRole}
                scheduleItems={[]}
              /> */}

              {/* Notification Center */}
              {/* <NotificationCenter
                userRole={userRole}
                notifications={[]}
              /> */}
            {/* </div> */}
          </div>

          {/* Emergency Contact Bar */}
          {/* <div className="bg-gradient-to-r from-destructive to-red-700 p-4 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold">911</span>
                </div>
                <div>
                  <h3 className="font-semibold">Emergency Services</h3>
                  <p className="text-sm opacity-90">24/7 immediate assistance available</p>
                </div>
              </div>
              <button className="bg-white text-destructive px-6 py-2 rounded-lg font-medium hover:bg-white/90 healthcare-transition">
                Call Now
              </button>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default UnifiedDashboard;