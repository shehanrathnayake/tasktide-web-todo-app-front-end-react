import './Loader.css'
export function Loader() {
    return (
        <div id="loader" className="d-flex align-items-center vh-100 justify-content-center">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}