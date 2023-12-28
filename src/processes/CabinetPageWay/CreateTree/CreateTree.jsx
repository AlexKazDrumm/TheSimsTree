import React, { useCallback, useState } from "react";
import styles from './CreateTree.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";
import RegularButton from "../../../components/UI/RegularButton/RegularButton";
import RightBar from "../../../components/RightBar/RightBar";
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

    const initialNodes = [
      // Первое поколение
      {
        id: '1',
        data: { label: '' }, // Убрали текстовую метку
        position: { x: 250, y: 25 },
        style: { 
          backgroundImage: 'url("https://cs14.pikabu.ru/post_img/big/2023/03/04/3/1677897829149630315.jpg")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
        sourcePosition: Position.Right,
      },
      {
        id: '2',
        data: { label: '' },
        position: { x: 450, y: 25 },
        style: { 
          backgroundImage: 'url("https://preview.redd.it/cine2pw8p1691.png?width=640&crop=smart&auto=webp&s=5f9fe08e41d3228828a3ac676f3e7bd0fc74ded4")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
        sourcePosition: Position.Left,
      },
      // Второе поколение
      {
        id: '3',
        data: { label: '' },
        position: { x: 350, y: 150 },
        style: { 
          backgroundImage: 'url("https://i.ytimg.com/vi/0mOvJR354OE/maxresdefault.jpg")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
      },
      // Третье поколение
      {
        id: '4',
        data: { label: '' },
        position: { x: 350, y: 275 },
        style: { 
          backgroundImage: 'url("https://astralsims777.com/wp-content/uploads/2019/06/Sims-4-personag-ofeliya-sunflower-716x690.jpg")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
        sourcePosition: Position.Left,
      },
      {
        id: '5',
        data: { label: '' },
        position: { x: 50, y: 25 },
        style: { 
          backgroundImage: 'url("https://i1.imageban.ru/out/2019/02/22/2e5a9fee4d5453e9bdd17718fe294bb2.jpg")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
      },
      // Дети отца-одиночки
      {
        id: '6',
        data: { label: '' },
        position: { x: 0, y: 150 },
        style: { 
          backgroundImage: 'url("https://64bits.media/static/records/4dc66465d48d4aa6934f52ae94523b75.jpeg")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
      },
      {
        id: '7',
        data: { label: '' },
        position: { x: 100, y: 150 },
        style: { 
          backgroundImage: 'url("https://astralsims777.com/wp-content/uploads/2018/06/Sims-4-personag-alex.jpg")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
      },
      // Супруг и ребенок одного из детей
      {
        id: '8',
        data: { label: '' },
        position: { x: 100, y: 275 },
        style: { 
          backgroundImage: 'url("https://amlgames.com/applications/core/interface/imageproxy/imageproxy.php?img=http://www.pictureshack.ru/images/46589_30_05_2019_12-03-43.png&key=b0d6250f1b02d2e9b7872133db3b20cdccbb80ec96c6b73529d70a1ca8b01130")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
        sourcePosition: Position.Right,
      },
      {
        id: '9',
        data: { label: '' },
        position: { x: 225, y: 400 },
        style: { 
          backgroundImage: 'url("https://preview.redd.it/collection-of-a-couple-of-my-favorite-sims-ive-made-p-v0-c5p4s5y1fc981.png?width=640&crop=smart&auto=webp&s=e674b6dcedf09c155057087025a4f2e5d7d0381f")', // Указываем фоновое изображение
          backgroundSize: 'cover', // Растягиваем изображение, чтобы оно покрыло весь узел
          backgroundPosition: 'center', // Центрируем изображение
          backgroundRepeat: 'no-repeat',
          borderRadius: '50%', 
          width: '70px', 
          height: '70px' 
        },
      },
    ];

    const initialEdges = [
      // Соединения первого поколения
      { id: 'e1-3', source: '1', target: '3', type: 'step', animated: false, label: "L" },
      { id: 'e2-3', source: '2', target: '3', type: 'step', animated: false },
      // Соединение ко второму поколению
      { id: 'e3-4', source: '3', target: '4', type: 'step', animated: false },
      { id: 'e5-6', source: '5', target: '6', type: 'step', animated: false },
      { id: 'e5-7', source: '5', target: '7', type: 'step', animated: false },
      // Соединения супруга и ребенка
      { id: 'e7-8', source: '7', target: '8', type: 'step', animated: false },
      { id: 'e8-9', source: '8', target: '9', type: 'step', animated: false },
      { id: 'e4-9', source: '4', target: '9', type: 'step', animated: false },
    ];

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