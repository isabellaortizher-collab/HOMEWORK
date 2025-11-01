import React, { useState, useEffect, useCallback } from 'react';
import BinaryTree from './BinaryTree';
import TreeVisualization from './TreeVisualization';

const BinaryTreeComponent = () => {
  const [tree] = useState(new BinaryTree());
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [treeData, setTreeData] = useState(null);
  const [traversalResults, setTraversalResults] = useState({
    preOrder: [],
    inOrder: [],
    postOrder: []
  });

  // ✅ Funciones estables con useCallback (elimina el warning)
  const updateTreeData = useCallback(() => {
    setTreeData(tree.toD3TreeFormat());
  }, [tree]);

  const updateTraversalResults = useCallback(() => {
    setTraversalResults({
      preOrder: tree.preOrder(),
      inOrder: tree.inOrder(),
      postOrder: tree.postOrder()
    });
  }, [tree]);

  // ✅ useEffect con dependencias correctas
  useEffect(() => {
    const initialValues = [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90];
    initialValues.forEach(value => tree.insert(value));
    updateTreeData();
    updateTraversalResults();
  }, [tree, updateTreeData, updateTraversalResults]);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      tree.insert(value);
      setInputValue('');
      updateTreeData();
      updateTraversalResults();
    }
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (!isNaN(value)) {
      const found = tree.search(value);
      setSearchResult(found ? ` Valor ${value} encontrado en el árbol` : ` Valor ${value} NO encontrado en el árbol`);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      if (action === 'insert') handleInsert();
      if (action === 'search') handleSearch();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Árbol Binario - Challenge 14</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>1. Insertar Números en el Árbol</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'insert')}
            placeholder="Ingresa un número"
            style={{ padding: '8px', fontSize: '16px' }}
          />
          <button 
            onClick={handleInsert}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Insertar
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>2. Buscar Valor en el Árbol</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'search')}
            placeholder="Buscar número"
            style={{ padding: '8px', fontSize: '16px' }}
          />
          <button 
            onClick={handleSearch}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#2196F3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Buscar
          </button>
        </div>
        {searchResult && (
          <p style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '4px',
            fontWeight: 'bold'
          }}>
            {searchResult}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Recorridos del Árbol</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div>
            <h3>PreOrder (N-L-R)</h3>
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#e3f2fd', 
              borderRadius: '4px',
              minHeight: '40px'
            }}>
              {traversalResults.preOrder.join(' → ')}
            </div>
          </div>
          <div>
            <h3>InOrder (L-N-R)</h3>
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#e8f5e8', 
              borderRadius: '4px',
              minHeight: '40px'
            }}>
              {traversalResults.inOrder.join(' → ')}
            </div>
          </div>
          <div>
            <h3>PostOrder (L-R-N)</h3>
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#fff3e0', 
              borderRadius: '4px',
              minHeight: '40px'
            }}>
              {traversalResults.postOrder.join(' → ')}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>3. Visualización del Árbol con react-d3-tree</h2>
        <TreeVisualization treeData={treeData} />
      </div>
    </div>
  );
};

export default BinaryTreeComponent;
