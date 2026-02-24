import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { TopPage } from '../pages/TopPage';
import { SummaryPage } from '../pages/SummaryPage';
import { EditPage } from '../pages/EditPage';
import { SendMessagePage } from '../pages/SendMessagePage';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthUserContext';
import { ChatMessageProvider } from '../contexts/ChatMessageContext';

function App() {
  return (
    <BrowserRouter>
      <ChatMessageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<SendMessagePage />} />
            <Route
              path="/top"
              element={
                <PrivateRoute>
                  <TopPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/summary"
              element={
                <PrivateRoute>
                  <SummaryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendances/:id/edit"
              element={
                <PrivateRoute>
                  <EditPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <TopPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ChatMessageProvider>
    </BrowserRouter>
  );
}

export default App;
