import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { AuthGuard } from './context/AuthGuard';
import SignInForm from './pages/Login/signin-form';
import SignUpForm from './pages/Logup/signup-form';
import HomePage from './pages/Home/HomePage';
import { Toaster } from 'sonner';
import Admin from './pages/Admin';
import MyClass from './pages/MyClass';
import Student from './pages/Student/Student';
import AddStudentForm from './pages/Student/AddStudent';
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
                            path="/admin"
                            element={
                                <AuthGuard>
                                    <Admin />
                                </AuthGuard>
                            }
                        />
                        <Route
                            path="/class"
                            element={
                                <AuthGuard>
                                    <MyClass />
                                </AuthGuard>
                            }
                        />
                        <Route
                            path="/student"
                            element={
                                <AuthGuard>
                                    <Student />
                                </AuthGuard>
                            }
                        /><Route
                            path="/student/add"
                            element={
                                <AuthGuard>
                                    <AddStudentForm />
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
