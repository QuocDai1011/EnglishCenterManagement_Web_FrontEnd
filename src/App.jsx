import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/authContext';
import { AuthGuard } from './context/AuthGuard';

import { publicRoutes, privateRoutes } from './routes';

function App() {
    return (
        <>
            <Toaster richColors position="bottom-right" theme="light" />

            <Router>
                <div className="App">
                    <AuthProvider>
                        <Routes>
                            {/* PUBLIC ROUTES */}
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route.layout ?? Fragment;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}

                            {/* PRIVATE ROUTES */}
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route.layout ?? Fragment;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <AuthGuard roles={route.roles}>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </AuthGuard>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </AuthProvider>
                </div>
            </Router>
        </>
    );
}

export default App;
