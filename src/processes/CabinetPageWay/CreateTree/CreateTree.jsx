import React, { useCallback, useState } from "react";
import styles from './CreateTree.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";
import RegularButton from "../../../components/UI/RegularButton/RegularButton";
import RightBar from "../../../components/RightBar/RightBar";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    BaseEdge,
    getStraightPath,
    useStore
  } from "reactflow";
import "reactflow/dist/style.css";

const CreateTree = ({user}) => {
    console.log({user})

    const [menu, setMenu] = useState(null);

    const [aaa, setAAA] = useState('')
    

    const onPaneClick = useCallback(() => setMenu(null), []);

    const ContextMenu = ({ id, top, left, onClick, setNodes }) => {
      const removeBackgroundImage = () => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === id) {
              const updatedStyle = { ...node.style };
              delete updatedStyle.backgroundImage; // Удаление свойства backgroundImage
              return { ...node, style: updatedStyle };
            }
            return node;
          })
        );
      };
    
      return (
        <div style={{ position: 'absolute', top, left }} className="context-menu" onClick={onClick}>
          <button onClick={() => setAAA('AAA!')}>Изменить</button>
          <br/>
          <button onClick={() => setAAA('AAA!')}>Сохранить</button>
        </div>
      );
    };





    /* Tmp node and edge styles */
    const characterNodeStyle = {
      width: '90px',
      height: '90px',
      border: '3px solid #285471',
      borderRadius: '50%',
      boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
    const  connectionNodeStyle = {
      width: '34px',
      height: '34px',
      border: '3px solid #285471',
      borderRadius: '50%',
      boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white'
    };
    const edgeStyle = {
      stroke: '#285471',
      strokeWidth: '3px'
    };

    /* Edge view mode (steps or straight) */
    const PATH_MODE_STEP = 'step';
    const PATH_MODE_STRAIGHT = 'straight';
    const [pathMode, setPathMode] = useState(PATH_MODE_STEP);

    /* Initial nodes and edges */
    const initialNodes = [
      /* Characters */
      { id: '1', position: { x: 250, y: 25 }, style: {...characterNodeStyle, backgroundImage: 'url("https://cs14.pikabu.ru/post_img/big/2023/03/04/3/1677897829149630315.jpg")'}},
      { id: '2', position: { x: 450, y: 25 }, style: {...characterNodeStyle, backgroundImage: 'url("https://preview.redd.it/cine2pw8p1691.png?width=640&crop=smart&auto=webp&s=5f9fe08e41d3228828a3ac676f3e7bd0fc74ded4")'}},
      { id: '3', position: { x: 350, y: 150 }, style: {...characterNodeStyle, backgroundImage: 'url("https://i.ytimg.com/vi/0mOvJR354OE/maxresdefault.jpg")'}},
      { id: '4', position: { x: 350, y: 275 }, style: {...characterNodeStyle, backgroundImage: 'url("https://astralsims777.com/wp-content/uploads/2019/06/Sims-4-personag-ofeliya-sunflower-716x690.jpg")'}},
      { id: '5', position: { x: 50, y: 25 }, style: {...characterNodeStyle, backgroundImage: 'url("https://i1.imageban.ru/out/2019/02/22/2e5a9fee4d5453e9bdd17718fe294bb2.jpg")'}},
      { id: '6', position: { x: 0, y: 150 }, style: {...characterNodeStyle, backgroundImage: 'url("https://64bits.media/static/records/4dc66465d48d4aa6934f52ae94523b75.jpeg")'}},
      { id: '7', position: { x: 100, y: 150 }, style: {...characterNodeStyle, backgroundImage: 'url("https://astralsims777.com/wp-content/uploads/2018/06/Sims-4-personag-alex.jpg")'}},
      { id: '8', position: { x: 100, y: 275 }, style: {...characterNodeStyle, backgroundImage: 'url("https://amlgames.com/applications/core/interface/imageproxy/imageproxy.php?img=http://www.pictureshack.ru/images/46589_30_05_2019_12-03-43.png&key=b0d6250f1b02d2e9b7872133db3b20cdccbb80ec96c6b73529d70a1ca8b01130")'}},
      { id: '9', position: { x: 225, y: 400 }, style: {...characterNodeStyle, backgroundImage: 'url("https://preview.redd.it/collection-of-a-couple-of-my-favorite-sims-ive-made-p-v0-c5p4s5y1fc981.png?width=640&crop=smart&auto=webp&s=e674b6dcedf09c155057087025a4f2e5d7d0381f")'}},
      
      /* Connections */
      { id: '1-2',  position: { x: 500, y: 500 }, draggable: false, style: connectionNodeStyle},
      { id: '8-4',  position: { x: 500, y: 500 }, draggable: false, style: connectionNodeStyle},
    ];

    const initialEdges = [
      { id: 'e1', source: '1', target: '2', type: 'custom-edge', data: {connection: '1-2', pathMode}, style: edgeStyle },
      { id: 'e2', source: '1-2', target: '3', type: 'custom-edge', data: {pathMode}, style: edgeStyle },

      { id: 'e3', source: '3', target: '4', type: 'custom-edge', data: {pathMode}, style: edgeStyle },
      { id: 'e4', source: '5', target: '6', type: 'custom-edge', data: {pathMode}, style: edgeStyle },
      { id: 'e5', source: '5', target: '7', type: 'custom-edge', data: {pathMode}, style: edgeStyle },

      { id: 'e6', source: '7', target: '8', type: 'custom-edge', data: {pathMode}, style: edgeStyle },
      { id: 'e7', source: '8', target: '4', type: 'custom-edge', data: {connection: '8-4', pathMode}, style: edgeStyle },
      { id: 'e8', source: '8-4', target: '9', type: 'custom-edge', data: {pathMode}, style: edgeStyle },
    ];





    /* Custom step-path generation */
    const getCustomStepPath = ({ sourceX, sourceY, targetX, targetY }) => {
      const edgePath = `M ${sourceX},${sourceY} v ${(targetY - sourceY) / 2} h ${targetX - sourceX} v ${(targetY - sourceY) / 2}`;
      return [edgePath];
    }

    /* Custom edge */
    function CustomEdge({ id, source, target, data, style }) {
      const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
      const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

      if (!sourceNode || !targetNode) {
        return null;
      }

      const sourceX = sourceNode.position.x + sourceNode.width / 2;
      const sourceY = sourceNode.position.y + sourceNode.height / 2;
      const targetX = targetNode.position.x + targetNode.width / 2;
      const targetY = targetNode.position.y + targetNode.height / 2;

      const [edgePath] = (
        data?.pathMode === PATH_MODE_STEP ? getCustomStepPath : 
        data?.pathMode === PATH_MODE_STRAIGHT ? getStraightPath : () => [])({ sourceX, sourceY, targetX, targetY });
      
      if (data?.connection) {
        useStore(useCallback((store) => {
          const connectionNode = store.nodeInternals.get(data.connection); 
          connectionNode.position.x = (sourceX + targetX - connectionNode.width) / 2;
          connectionNode.position.y = (sourceY + targetY - connectionNode.height) / 2;
        }, [data.connection, sourceX, sourceY, targetX, targetY]));
      }
      
      return (
        <BaseEdge id={id} path={edgePath} style={style} />
      );
    };

    const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onNodeContextMenu = useCallback(
      (event, node) => {
        event.preventDefault();
        const reactFlowBounds = event.target.getBoundingClientRect();
    
        setMenu({
          id: node.id,
          top: event.clientY - reactFlowBounds.top,
          left: event.clientX - reactFlowBounds.left + 220,
        });
      },
      []
    );

   
    

    

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
        edgeTypes={{ 'custom-edge': CustomEdge }}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
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
      {menu && <ContextMenu {...menu} onClick={onPaneClick} setNodes={setNodes} />}
      {aaa && <div>{aaa}</div>}
    </ReactFlow>
  );
};

    return(
        <>
            <select value={pathMode} onChange={(e) => setPathMode(e.target.value)} style={{position: 'fixed', zIndex: '1000'}}>
              <option value={PATH_MODE_STEP}>Step</option>
              <option value={PATH_MODE_STRAIGHT}>Straight</option>
            </select>
            <div className={styles.backgroundContainer}></div>
            <div className={styles.container}>
                <RightBar />
                <div className={styles.blurContainer} style={user.role_id == 1 ? {display: 'none'} : {display: 'flex'}}>
                    <div className={styles.marginWrapper}>
                        <TitleBlock text='Название династии' />
                    </div>
                    
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
                </div>
                {user.role_id == 2 &&
                    <div className={styles.zaglushka}>
                        <div className={styles.zTitle}>Сул-Сул!</div>
                        <div className={styles.zSubtitle1}>Сейчас тут пустовато. Не пугайтесь!</div>
                        <div className={styles.zSubtitle2}>Основной функционал работы с древом сейчас  в разработке. Мы обязательно уведомим Вас по почте или в нашем <a className={styles.tglink} href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">телеграм-канале</a>, когда все будет готово ;)</div>
                        <div className={styles.zSubtitle3}>Спасибо, что ждете и остаетесь с нами!</div>
                    </div>
                }
                {user.role_id == 1 &&
                    <div style={{zIndex: '10000', height: '92vh'}}>
                        <Flow />
                    </div>
                }
            </div>
        </>
    )
}

export default CreateTree;