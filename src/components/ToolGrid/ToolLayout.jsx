import SampleSplitter from "./SampleSplitter";
import { useResizable } from "react-resizable-layout";
import Overview from "./Overview/Overview";
import ComponentDetails from "./ComponentDetails/ComponentDetails";
import EditComponent from "./EditComponent/EditComponent";
import ListController from "./ListController/ListController";
import { cn } from "./utils/cn";
import "./ToolLayout.css";

const ToolLayout = () => {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true,
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 50,
  });
  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true,
  });

  return (
    <div
      className={
        "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
      }
    >
      <div className={"flex grow"}>
        <div
          className={cn("shrink-0 contents", isFileDragging && "dragging")}
          style={{ width: fileW }}
        >
          <ListController />
        </div>
        <SampleSplitter dir={"vertical"} isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={"flex grow"}>
          <div className={"grow bg-darker contents"}>
            <ComponentDetails />
          </div>
          <SampleSplitter
            dir={"vertical"}
            isDragging={isPluginDragging}
            {...pluginDragBarProps}
          />
          <div
            className={cn("shrink-0 contents", isPluginDragging && "dragging")}
            style={{ width: pluginW }}
          >
            <EditComponent />
          </div>
        </div>
      </div>
      <SampleSplitter
        dir={"horizontal"}
        isDragging={isTerminalDragging}
        {...terminalDragBarProps}
      />
      <div
        className={cn(
          "shrink-0 bg-darker contents",
          isTerminalDragging && "dragging"
        )}
        style={{ height: terminalH }}
      >
        <Overview />
      </div>
    </div>
  );
};

export default ToolLayout;
