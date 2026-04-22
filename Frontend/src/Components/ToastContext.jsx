import { createContext, useState } from "react";
import '../CSS/Toast.css'

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();

    setToasts(prev => [...prev, { id, message }]);

    // auto remove after 3s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            {t.message}
          </div>
        ))}
      </div>

    </ToastContext.Provider>
  );
};