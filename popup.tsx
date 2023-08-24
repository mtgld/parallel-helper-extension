import './assets/popup.scss';
import './contents/font.css';
import MetaguildLogoSrc from "data-base64:~assets/metaguild_logo.png"
import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  const [toggle, setToggle] = useStorage("toggle", "1")

  return (
    <div className="popup">
      <p className="instruction">To utilize the extension, hover over the card name and hold down the <span>Shift</span> key simultaneously. Alternatively, hover over the text first and then press the <span>Shift</span> key.</p>
      <p className="small">Turn On/Off the extension.</p>
      <label className="switch">
        <input checked={Boolean(Number(toggle))} type="checkbox" onChange={(e) => {
          setToggle(e.target.checked ? "1" : "0")
        }}/>
        <span className="slider round">
        </span>
      </label>
      <div className="footer">
        Developed by&nbsp;
        <a target="_blank" href="https://x.com/metaguild">
          Metaguild
          <img className="logo" src={MetaguildLogoSrc} alt="MetaguildLogo"/>
        </a>
      </div>
    </div>
  )
}

export default IndexPopup
