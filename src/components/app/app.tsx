import * as React from 'react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/components/Routes';
import './App.scss';
import '../../assets/style/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(): ReactElement {
    const getClassName = () => {
        return 'main-content';
    };
    return (
        <div className={getClassName()}>
            <BrowserRouter>
                <div
                    className="dashboard-container"
                    style={{ paddingTop: '1.5rem' }}
                >
                    <Routes />
                </div>
                <ToastContainer />
            </BrowserRouter>
        </div>
    );
}

export default App;
