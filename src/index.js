import React from 'react';

import { createRoot } from 'react-dom/client';

import Figure1 from './jsx/Figure1.jsx';

const container = document.getElementById('app-root-2022-africa_stat_day');
const root = createRoot(container);
root.render(<Figure1 />);
