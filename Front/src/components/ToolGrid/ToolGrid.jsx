import { Panel, PanelGroup } from "react-resizable-panels";
import ComponentDetails from "./ComponentDetails/ComponentDetails";
import ListController from "./ListController/ListController";

import ResizeHandle from "./ResizeHandle";
import styles from "./styles.module.css";

export default function ToolGrid() {
  const items = [
    {
      chartType: "AxisChart",
      minValue: -255,
      maxValue: 256,
      minY: -350,
      maxY: 350,
    },
    {
      chartType: "SimpleButtonChart",
      minValue: 0,
      maxValue: 2,
      minY: -0.1,
      maxY: 1.1,
    },
    {
      chartType: "ThreeWayButtonChart",
      minValue: 0,
      maxValue: 3,
      minY: -0.1,
      maxY: 2.1,
    },
  ];
  return (
    <div className={styles.Container}>
      <div className={styles.BottomRow}>
        <PanelGroup direction="vertical">
          <Panel>
            <PanelGroup direction="horizontal">
              <Panel className={styles.Panel} minSize={20} order={1}>
                <div className={styles.PanelContent}>
                  <ListController items={items} />
                </div>
              </Panel>
              <ResizeHandle className="hover-target" />
              <Panel className={styles.Panel} minSize={20} order={2}>
                <div className={styles.PanelContent}>
                  <ComponentDetails chartType={"AxisChart"} />
                </div>
              </Panel>
              <ResizeHandle className="hover-target" />
              <Panel className={styles.Panel} collapsible={true} order={2}>
                <div className={styles.PanelContent}>right</div>
              </Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle className="hover-target" />
          <Panel
            className={styles.Panel}
            minSize={20}
            defaultSize={40}
            order={1}
          >
            <div className={styles.PanelContent}>bottom</div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
