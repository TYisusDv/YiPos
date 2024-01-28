// scripts/DataTable.js
import React, { useState, useEffect } from "react";
import styles from "../assets/css/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const DataTable = ({ endpoint, columns }) => {
    const ascendingArrow = "\u2191";
    const descendingArrow = "\u2193";

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [orderBy, setOrderBy] = useState("id");
    const [order, setOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showRows, setShowRows] = useState(10);

    useEffect(() => {
        const fetchData = async () => {  
            const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            
            const queryString = `?search=${search}&order_by=${orderBy}&order=${order}&page=${currentPage}&show=${showRows}`;
            const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}${queryString}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
            });

            const responseJson = await response.json();
            setData(responseJson.data);
            setTotalPages(responseJson.total_pages);
        }

        fetchData();
    }, [endpoint, search, orderBy, order, currentPage, showRows]);

    const handleSort = (column) => {
        setOrder((prevOrder) => (column === orderBy ? (prevOrder === "asc" ? "desc" : "asc") : "asc"));
        setOrderBy(column);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleShowRowsChange = (event) => {
        const selectedRows = parseInt(event.target.value, 10);
        setShowRows(selectedRows);
    };

    const generatePaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`${styles.btn} ${i === currentPage ? styles["bg-primary"] : styles["bg-t-primary"]} ${i === currentPage ? styles.active : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className={styles["table-responsive"]}>
            <div className={styles.filters}>
                <div className={styles.show}>
                    <span>
                        Mostrar
                    </span>
                    <select value={showRows} onChange={handleShowRowsChange}>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                    <span>
                        registros
                    </span>
                </div>
                <div className={styles["form-input"]}>
                    <FontAwesomeIcon icon={faSearch}/>
                    <input 
                        type="text" 
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.table}>
                <table border="1">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.field} onClick={() => handleSort(column.field)}>
                                    {column.label} {orderBy === column.field && (order === "asc" ? ascendingArrow : descendingArrow)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                {columns.map((column) => (
                                    <td key={column.field}>{item[column.field]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles["table-footer"]}>                
                <div className={styles["pagination-info"]}>
                    <span>Page {currentPage} of {totalPages}</span>
                </div>
                <div className={styles.pagination}>
                    <button className={`${styles.btn} ${styles["bg-primary"]}`} onClick={() => handlePageChange(currentPage - 1)}><FontAwesomeIcon icon={faAngleLeft}/></button>
                    {generatePaginationButtons()}
                    <button className={`${styles.btn} ${styles["bg-primary"]}`} onClick={() => handlePageChange(currentPage + 1)}><FontAwesomeIcon icon={faAngleRight}/></button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;