import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [excuse, setExcuse] = useState<String>();
  const [copyText, setCopyText] = useState<String>("Copy");

  const handleCreate = () => {
    const selected = document.querySelector("input[name='radio-btn']:checked");
    Axios.get(
      `https://excuser-three.vercel.app/v1/excuse/${selected?.id}`
    ).then((res) => {
      setExcuse(res.data[0].excuse);
    });
    setCopyText("Copy");
  };

  const handleCopy = async () => {
    const text = document.getElementById("excuse") as HTMLTitleElement;
    const content = text.innerHTML;
    try {
      await navigator.clipboard.writeText(content);
      setCopyText("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const box = document.getElementById("family") as HTMLInputElement;
    box.checked = true;
    return () => handleCreate();
  }, []);

  return (
    <div className="App">
      <h1>Excuse Generator</h1>
      <p className="description">
        Generate a excuse instantly by topic. A small but fun project from
        @uzayapiu
      </p>
      <div className="radio-buttons">
        <input type="radio" name="radio-btn" id="family" />
        <label htmlFor="family">Family</label>
        <input type="radio" name="radio-btn" id="office" />
        <label htmlFor="office">Office</label>
        <input type="radio" name="radio-btn" id="children" />
        <label htmlFor="children">Children</label>
        <input type="radio" name="radio-btn" id="college" />
        <label htmlFor="college">College</label>
        <input type="radio" name="radio-btn" id="party" />
        <label htmlFor="party">Party</label>
        <input type="radio" name="radio-btn" id="funny" />
        <label htmlFor="funny">Funny</label>
        <input type="radio" name="radio-btn" id="unbelievable" />
        <label htmlFor="unbelievable">Unbelievable</label>
        <input type="radio" name="radio-btn" id="developers" />
        <label htmlFor="developers">Developers</label>
        <input type="radio" name="radio-btn" id="gaming" />
        <label htmlFor="gaming">Gaming</label>
      </div>
      <button onClick={handleCreate}>Generate</button>
      <div className="seperator"></div>
      <h3 className="excuse" id="excuse">
        {excuse}
      </h3>
      <div onClick={handleCopy} className="copy">
        <img className="copy-icon" src="copy.png" alt="" />
        {copyText}
      </div>
      <div className="credit">
        <div>
          API used:{" "}
          <a href="https://excuser-three.vercel.app/">
            https://excuser-three.vercel.app
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
