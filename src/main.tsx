import { ReactFlowProvider } from '@xyflow/react';
import { createRoot } from 'react-dom/client';

import { Layout } from './layout';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <ReactFlowProvider>
    <Layout />
  </ReactFlowProvider>
);
