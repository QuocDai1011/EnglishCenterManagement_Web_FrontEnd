import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { AuthGuard } from './context/AuthGuard';
import SignInForm from './pages/Login/signin-form';
import SignUpForm from './pages/Logup/signup-form';
import HomePage from './pages/Home/HomePage';
import { Toaster } from 'sonner';
import Admin from './pages/Admin';

function App() {
    return (
        <>
            <Toaster richColors position="bottom-right" theme="light" />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<SignInForm />} />
                        <Route path="/register" element={<SignUpForm />} />
                        <Route
                            path="/admin"
                            element={
                                <AuthGuard roles={['Admin']}>
                                    <Admin />
                                </AuthGuard>
                            }
                        />
                        <Route
                            path="/tearcher"
                            element={
                                <AuthGuard roles={['Teacher']}>
                                    <Admin />
                                </AuthGuard>
                            }
                        />
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
            </BrowserRouter>
        </>
    );
}

export default App;