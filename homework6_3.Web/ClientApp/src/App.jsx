import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from './Pages/HomePage';
import IncomePage from './Pages/IncomePage';
import MaaserPage from './Pages/MaaserPage';
import OverviewPage from './Pages/OverviewPage';
import AddIncomePage from './Pages/AddIncomePage';
import AddMaaserPage from './Pages/AddMaaserPage';

import Layout from './components/Layout';
import ManageSourcesPage from './Pages/ManageSourcesPage';

const App = () => {
    return (

        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/income" element={<IncomePage />} />
                    <Route path="/maaser" element={<MaaserPage />} />
                    <Route path="/overview" element={<OverviewPage />} />
                    <Route path="/add-income" element={<AddIncomePage />} />
                    <Route path="/add-maaser" element={<AddMaaserPage />} />
                    <Route path="/manage-sources" element={<ManageSourcesPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
