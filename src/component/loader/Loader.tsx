import './Loader.css'
export function Loader() {
    return (
        <div className="text-center">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}