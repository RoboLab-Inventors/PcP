import Overview from './Overview/Overview';
import ComponentDetails from './ComponentDetails/ComponentDetails';
import EditComponent from './EditComponent/EditComponent';
import ListController from './ListController/ListController';
import './ToolGrid.css';

const ToolGrid = () => {
    // Removed useState for widths and related functions

    return (
        <div className="tool-grid-container" style={{ marginTop: '20vh', height: '40vh' }}>
            <div className="grid-container grid-container--fit" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                <div className="resizable-box">
                    <ComponentDetails />
                </div>
                <div className="resizable-box">
                    <EditComponent />
                </div>
                <div className="resizable-box">
                    <ListController />
                </div>
            </div>
            <div className='overview-container'>
                <Overview />
            </div>
        </div>
    );
};

export default ToolGrid;