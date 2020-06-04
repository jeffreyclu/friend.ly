import React from 'react';
import { render } from 'react-dom';
import DashboardContainer from './components/DashboardContainer.jsx';

import styles from './scss/dashboard.scss';

render(<DashboardContainer />, document.getElementById('dashboardRoot'));
