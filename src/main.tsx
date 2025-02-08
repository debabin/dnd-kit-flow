import { createRoot } from 'react-dom/client';

import { Layout } from './layout';

import './index.css';
import { ReactFlowProvider } from '@xyflow/react';

createRoot(document.getElementById('root')!).render(
  <ReactFlowProvider>
    <Layout />
  </ReactFlowProvider>
);
