import React, { useCallback, useState, useEffect } from "react";
import styles from './EditTree.module.css'
import TitleBlock from "../UI/TitleBlock/TitleBlock";
import RegularButton from "../UI/RegularButton/RegularButton";
import NodeContextMenu from "../Modals/NodeContextMenu/NodeContextMenu";
import EditCharacterModal from "../Modals/EditCharacterModal/EditCharacterModal";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Position
  } from "reactflow";
import "reactflow/dist/style.css";
import { fetchTreeCharacters } from "../../features/features";
import { generateNodesAndEdges } from "../../utils/utils";

const EditTree = ({tree, lifeForms, setSelectedTree}) => {

    const [characters, setCharacters] = useState([]);

    const [initialNodes, setInitialNodes] = useState([]);
    const [initialEdges, setInitialEdges] = useState([]);

    const [selectedNode, setSelectedNode] = useState([])

    const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
    const [showEditCharacterModal, setShowEditCharacterModal] = useState(false)

    const getCharacters = async () => {
      const token = localStorage.getItem('authToken');
      if (tree && tree.id && token) {
          const characters = await fetchTreeCharacters(token, tree.id);
          if (characters) {
            console.log({characters});
            setCharacters(characters); // Сохраняем данные персонажей
            const { nodes, edges } = generateNodesAndEdges(characters);
            setInitialNodes(nodes);
            setInitialEdges(edges);
          }
      }
  };

    useEffect(() => {
        
    
        getCharacters();
    }, [tree]);

    const ContextMenu = ({ nodeId, x, y, onClose }) => {
        // Закрыть меню при нажатии на любую кнопку
        const handleClick = () => {
          onClose();
        };
      
        return (
          <div
            style={{
              position: 'absolute',
              left: x,
              top: y,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              padding: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              zIndex: 9999
            }}
          >
            <p>Node ID: {nodeId}</p>
            {/* Добавьте здесь дополнительные опции меню */}
            <button onClick={handleClick}>Закрыть меню</button>
          </div>
        );
    };

    const [contextMenu, setContextMenu] = useState(null);

    const onNodeContextMenu = (event, node) => {
        event.preventDefault();
        setContextMenu({
        nodeId: node.id,
        x: event.clientX,
        y: event.clientY
        });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const Flow = () => {
        const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
        const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
        
        const onNodeClick = (event, node) => {
          const characterData = characters.find(char => char.id == node.id);
          setSelectedNode(characterData); // Устанавливаем выбранного персонажа
          setShowNodeContextMenu(true);  
        };
    
        const onConnect = useCallback(
            (params) => setEdges((eds) => addEdge(params, eds)),
            [setEdges]
        );
      
        return (
          <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              fitView
              attributionPosition="top-right"
            >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.type === "input") return "#1141d0";
                if (n.type === "output") return "#ff0072";
                if (n.type === "default") return "#1a192b";
      
                return "#eee";
              }}
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background;
      
                return "#fff";
              }}
              nodeBorderRadius={2}
            />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        );
    };

    return (
        <>
            <div className={styles.marginWrapper}>
                <TitleBlock text='Название династии' />
            </div>
            {selectedNode && showNodeContextMenu &&
              <NodeContextMenu 
                showNodeContextMenu={showNodeContextMenu} 
                setShowNodeContextMenu={setShowNodeContextMenu} 
                setShowEditCharacterModal={setShowEditCharacterModal}
                character={selectedNode}  // Передаем данные персонажа
              />
            }
            {selectedNode && showEditCharacterModal &&
              <EditCharacterModal 
                showEditCharacterModal={showEditCharacterModal} 
                setShowEditCharacterModal={setShowEditCharacterModal} 
                character={selectedNode}
                characters={characters}
                lifeForms={lifeForms}
                getCharacters={getCharacters}
                setSelectedNode={setSelectedNode}
              />
            }
            <div className={styles.marginWrapper}>
                <div className={styles.topRow}>
                    <div className={styles.buttons}>
                        <div className={styles.button}>
                            <RegularButton text='О династии' type='grey' width={'166px'} height={'28px'} textSize={'12px'}/>
                        </div>
                        <div className={styles.button}>
                            <RegularButton text='Об авторе' type='grey' width={'166px'} height={'28px'} textSize={'12px'} />
                        </div>
                    </div>
                    <div className={styles.selecterBlock}>
                        <span style={{marginRight: '10px', marginBottom: '9px'}}>Предпросмотр</span><img src='./svg/selecter_left.svg' />
                    </div>
                </div>
            </div>
            <div style={{zIndex: '10000', height: '92vh'}}>
                <Flow />
            </div>
        </>
    )
}

export default EditTree