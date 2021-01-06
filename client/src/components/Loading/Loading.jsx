import loadingIcon from "../../assets/loadingIcon.svg";
import "./style.css";
function Loading() {
  return (
    <>
      <div className="loading-container">
        <img width="120px" src={loadingIcon} alt="Loading..." />
      </div>
    </>
  );
}

export default Loading;
