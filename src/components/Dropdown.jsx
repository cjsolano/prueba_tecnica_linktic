import { useState, useEffect } from "react";
import axios from "axios";

import "./Dropdown.css";

const Icon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 15.5C11.8684 15.5008 11.7379 15.4755 11.6161 15.4258C11.4943 15.376 11.3835 15.3027 11.29 15.21L7.29 11.21C7.19676 11.1168 7.1228 11.0061 7.07234 10.8843C7.02188 10.7624 6.99591 10.6319 6.99591 10.5C6.99591 10.3681 7.02188 10.2376 7.07234 10.1158C7.1228 9.99393 7.19676 9.88324 7.29 9.79001C7.38324 9.69677 7.49393 9.62281 7.61575 9.57235C7.73758 9.52189 7.86814 9.49591 8 9.49591C8.13186 9.49591 8.26243 9.52189 8.38425 9.57235C8.50608 9.62281 8.61677 9.69677 8.71001 9.79001L12 13.1L15.3 9.92001C15.392 9.81772 15.5041 9.73551 15.6293 9.67852C15.7545 9.62154 15.8902 9.591 16.0277 9.58882C16.1653 9.58664 16.3018 9.61286 16.4288 9.66586C16.5557 9.71885 16.6704 9.79746 16.7656 9.89679C16.8607 9.99611 16.9344 10.114 16.9819 10.2431C17.0295 10.3722 17.0499 10.5097 17.0419 10.647C17.0338 10.7844 16.9976 10.9186 16.9353 11.0413C16.873 11.1639 16.7861 11.2724 16.68 11.36L12.68 15.22C12.4971 15.3963 12.254 15.4964 12 15.5Z"
                fill="currentColor"
            />
        </svg>
    );
};

function Dropdown() {
    const [listFruits, setListFruits] = useState(null);
    const [listSearch, setListSearch] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [dropdownActive, setDropdownActive] = useState(false);

    useEffect(() => {
        const getFruits = () => {
            axios
                .get("http://127.0.0.1:8888/api/fruits.json")
                .then((response) => {
                    setListFruits(response.data.data);
                });
        };

        getFruits();
    }, []);

    function handleInputChange(event) {
        const valorInput = event.target.value;
        setInputValue(valorInput);

        const search = listFruits.fruits.filter((item) =>
            item.toLowerCase().includes(valorInput.toLowerCase())
        );
        setListSearch(search);
    }

    function handleClick() {
        setDropdownActive(!dropdownActive);

        if (!dropdownActive) {
            setInputValue("");
        } else if (listSearch.length == 0) {
          setInputValue("");
        }

        const dropdown = document.querySelector(".dropdown");
        const icon = document.querySelector(".icon");

        dropdown.classList.toggle("active");
        icon.classList.toggle("up");
    }

    function handleItemClick(event) {
        handleClick();
        setInputValue(event.target.innerText);
    }

    return (
        <div className="dropdwnContainer">
            <input
                type="text"
                placeholder={
                    dropdownActive ? "This is a search input" : "Select an item"
                }
                list="list-of-fruits"
                spellCheck="false"
                readOnly={!dropdownActive}
                value={inputValue}
                onChange={handleInputChange}
            />
            <span className="icon" onClick={handleClick}>
                <Icon />
            </span>
            <div className="dropdown">
                <div className="list-of-fruits">
                    {inputValue.length == 0 &&
                        listFruits &&
                        listFruits.fruits.map((fruit, index) => (
                            <li key={index} onClick={handleItemClick}>
                                {fruit}
                            </li>
                        ))}
                    {inputValue.length > 0 && listSearch.length > 0
                    ? (
                      listSearch.map((fruit, index) => (
                        <li key={index} onClick={handleItemClick}>
                            {fruit}
                        </li> 
                    ))
                    )
                    : listSearch.length == 0 && <div className="disabled">No items were found.</div>
                        }
                </div>
            </div>
        </div>
    );
}

export default Dropdown;
