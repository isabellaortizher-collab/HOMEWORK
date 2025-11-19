import React, { useState } from 'react';
import styles from '../styles/MenuTree.module.scss';

const MenuTree = ({ nodes, level = 0 }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpand = (nodeId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <ul className={`${styles['menu-level']} ${styles[`menu-level-${level}`]}`}>
      {nodes.map((node) => (
        <li key={node.id} className={styles['menu-item']}>
          <div className={styles['menu-item-header']}>
            {node.children && node.children.length > 0 ? (
              <button
                className={styles['expand-btn']}
                onClick={() => toggleExpand(node.id)}
                aria-expanded={expandedItems.has(node.id)}
              >
                {expandedItems.has(node.id) ? '−' : '+'}
              </button>
            ) : (
              <span className={styles['expand-placeholder']}></span>
            )}
            
            <a 
              href={node.link} 
              className={styles['menu-link']}
              onClick={(e) => {
                e.preventDefault();
                if (node.component) {
                  console.log(`Mostrando componente: ${node.component}`);
                }
              }}
            >
              {node.title}
            </a>
          </div>
          
          {node.children && node.children.length > 0 && expandedItems.has(node.id) && (
            <MenuTree nodes={node.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuTree;
