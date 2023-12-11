import React, { useCallback } from "react";
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
    MarkerType, 
    Position
  } from "reactflow";
import "reactflow/dist/style.css";

const CreateTree = ({user}) => {
    console.log({user})

    const initialNodes = [
        {
          id: "1",
          type: "input",
          data: {
            label: (
              <>
                Тест <strong>с разными начертаниями</strong>
              </>
            )
          },
          position: { x: 250, y: 0 }
        },
        {
          id: "2",
          data: {
            label: (
              <>
                с открытой <strong>связью</strong>
              </>
            )
          },
          position: { x: 100, y: 100 }
        },
        {
          id: "3",
          data: {
            label: (
              <>
                изменение <strong>стилей</strong>
              </>
            )
          },
          position: { x: 400, y: 100 },
          style: {
            background: "#D6D5E6",
            color: "#333",
            border: "1px solid #222138",
            width: 180,
            nodeBorderRadius: '500px'
          }
        },
        {
          id: "4",
          position: { x: 250, y: 200 },
          data: {
            label: "просто нода"
          }
        },
        {
          id: "5",
          data: {
            label: "просто нода"
          },
          position: { x: 250, y: 325 }
        },
        {
          id: "6",
          type: "output",
          data: {
            label: (
              <>
                нода с картинкой
                <img src='/svg/user.svg'/>
              </>
            )
          },
          position: { x: 100, y: 480 }
        },
        {
          id: "7",
          type: "output",
          data: { label: "просто нода" },
          position: { x: 400, y: 450 }
        },
        {
            id: '8',
            type: 'output',
            data: {
              label: 'круглая',
            },
            className: 'circle',
            style: {
                borderRadius: '100%',
                backgroundColor: '#fff',
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            position: { x: 500, y: 200 },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          },

      ];

      const initialEdges = [
        { id: "e1-2", source: "1", target: "2", label: "промежуточная нода" },
        { id: "e1-3", source: "1", target: "3" },
        {
          id: "e3-4",
          source: "3",
          target: "4",
          animated: true,
          label: "анимированная линия"
        },
        {
          id: "e4-5",
          source: "4",
          target: "5",
          label: "линия со стрелкой",
          markerEnd: {
            type: MarkerType.ArrowClosed
          }
        },
        {
          id: "e5-6",
          source: "5",
          target: "6",
          type: "smoothstep",
          label: "промежуточная нода"
        },
        {
          id: "e5-7",
          source: "5",
          target: "7",
          type: "step",
          style: { stroke: "#f6ab6c" },
          label: "со стилем",
          animated: true,
          labelStyle: { fill: "#f6ab6c", fontWeight: 700 }
        }
      ];

    const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

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
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === "input") return "#0041d0";
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