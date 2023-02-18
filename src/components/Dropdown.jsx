import { useState, useEffect } from 'react'
import axios from "axios";

import './Dropdown.css'

const baseURL = "http://127.0.0.1:8888/api";

function Dropdown() {
    
    const [listFruits, setListFruits] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8888/api/fruits.json").then((response) => {
            setListFruits(response.data.data.fruit);
        });
      }, []);

      //console.log("listFruits",listFruits);

  return (
    <div className="dropdownContainer">
        <input
            className="dropdownInput"
            list="list-of-fruits"
            placeholder="Select an item"
        />
        <datalist id="list-of-fruits">
            {listFruits && listFruits.map((fruit, index) => (
                <option key={index} value={fruit} />
            ))}
        </datalist>
    </div>
  )
}

export default Dropdown
