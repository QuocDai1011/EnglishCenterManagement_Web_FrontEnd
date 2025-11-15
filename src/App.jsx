import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/authContext';
import { AuthGuard } from './context/AuthGuard';

import { DefaultLayout } from './layouts';
import { publicRoutes } from './routes';

import SignInForm from './pages/Login/signin-form';
import SignUpForm from './pages/Logup/signup-form';
import HomePage from './pages/Home/HomePage';
import Admin from './pages/RoleAdmin/Admin';

function App() {
    return (
        <>
            <Toaster richColors position="bottom-right" theme="light" />

            <Router>
                <div className="App">
                    <AuthProvider>
                        <Routes>
                            {/* ============================
                                AUTH ROUTES
                            ============================ */}
                            <Route path="/login" element={<SignInForm />} />
                            <Route path="/register" element={<SignUpForm />} />

                            {/* ADMIN */}
                            <Route
                                path="/admin"
                                element={
                                    <AuthGuard roles={['Admin']}>
                                        <Admin />
                                    </AuthGuard>
                                }
                            />

                            {/* TEACHER */}
                            <Route
                                path="/teacher" 
                                element={
                                    <AuthGuard roles={['Teacher']}>
                                        <Admin />
                                    </AuthGuard>
                                }
                            />

                            {/* STUDENT (Default Home) */}
                            <Route
                                path="/"
                                element={
                                    <AuthGuard roles={['Student']}>
                                        <HomePage />
                                    </AuthGuard>
                                }
                            />
                        </Routes>
                    </AuthProvider>
                </div>
            </Router>
        </>
    );
}

export default App;
