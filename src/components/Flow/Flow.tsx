import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useShallow } from 'zustand/shallow';

import useStore, { AppState } from '../../stores';
import { EntityCard } from './components';

const selector = (state: AppState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect
});

const nodeTypes = { entityCard: EntityCard };

export const Flow = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(useShallow(selector));

    return (
        <div className='p-4 h-screen w-[88%]'>
            <div className='w-full h-full p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
                <ReactFlow
                    proOptions={{ hideAttribution: true }}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                >
                    <Controls />
                    <MiniMap />
                    <Background gap={12} size={1} />
                </ReactFlow>
            </div>
        </div>
    );
};
