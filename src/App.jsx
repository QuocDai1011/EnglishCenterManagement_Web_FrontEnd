import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { AuthGuard } from './context/AuthGuard';
import SignInForm from './pages/Login/signin-form';
import SignUpForm from './pages/Logup/signup-form';
import HomePage from './pages/Home/HomePage';
import { Toaster } from 'sonner';

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<SignInForm />} />
                        <Route path="/register" element={<SignUpForm />} />
                        <Route
                            path="/"
                            element={
                                <AuthGuard>
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
