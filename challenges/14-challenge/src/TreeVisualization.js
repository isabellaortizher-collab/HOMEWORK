import React from 'react';
import Tree from 'react-d3-tree';

const TreeVisualization = ({ treeData }) => {
  if (!treeData) {
    return <div>No hay datos del árbol para mostrar</div>;
  }

  return (
    <div id="treeWrapper" style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}>
      <Tree 
        data={treeData} 
        orientation="vertical"
        translate={{ x: 200, y: 200 }}
        pathFunc="step"
        nodeSize={{ x: 100, y: 100 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
        renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
          <g>
            <circle 
              r="15" 
              fill={nodeDatum.children ? "#5B8FF9" : "#5AD8A6"} 
              stroke="#333"
              strokeWidth="2"
              onClick={toggleNode}
            />
            <text 
              fill="white" 
              strokeWidth="1" 
              x="0" 
              y="5" 
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
            >
              {nodeDatum.name}
            </text>
            {nodeDatum.children && (
              <text 
                fill="black" 
                x="0" 
                y="25" 
                textAnchor="middle" 
                fontSize="10"
              >
                {nodeDatum.children.length > 0 ? '▼' : ''}
              </text>
            )}
          </g>
        )}
      />
    </div>
  );
};

export default TreeVisualization;