// src/components/NotificationPanel.jsx
import React, { useRef, useEffect } from 'react';

const NotificationPanel = ({ isOpen, onClose, notifications, onMarkAsRead, onClearAll }) => {
  const panelRef = useRef(null);

  // Handle clicks outside the panel to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Helper to format timestamp
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString(); // Fallback for older notifications
  };

  // Helper to get icon based on notification type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.257 3.328c.557-.96 1.43-1.637 2.493-1.637s1.936.677 2.493 1.637l7.632 13.21a2 2 0 01-1.723 3.098H2.348a2 2 0 01-1.723-3.098L8.257 3.328zM10 13a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 001-1V9a1 1 0 10-2 0V8a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Side Panel */}
      <div
        ref={panelRef}
        className="relative w-full md:w-96 bg-white shadow-xl flex flex-col h-full animate-slide-in-right"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close notifications"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-grow overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-6 text-center text-gray-500">No new notifications.</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start p-4 border-b border-gray-200 cursor-pointer transition-colors duration-200
                  ${notif.read ? 'bg-gray-50 text-gray-600' : 'bg-white hover:bg-gray-100 text-gray-800 font-medium'}`}
                onClick={() => onMarkAsRead(notif.id)}
              >
                <div className="flex-shrink-0 mr-3 mt-1">
                  {getTypeIcon(notif.type)}
                </div>
                <div className="flex-grow">
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notif.timestamp)}</p>
                </div>
                {!notif.read && (
                  <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full ml-2 mt-2" aria-label="Unread notification"></span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer with Clear All Button */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onClearAll}
              className="w-full text-center text-sm text-purple-600 hover:text-purple-800 font-semibold py-2 rounded-md transition-colors duration-200"
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;