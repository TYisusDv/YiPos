// scripts/DataTable.js
import React, { useState, useEffect } from "react";
import { GetTokenModel } from '../models/TokenModel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleLeft, faAngleRight, faCircleCheck, faCircleXmark, faFingerprint, faEdit } from "@fortawesome/free-solid-svg-icons";
import AlertFormat from "./AlertFormat";
import styles from "../assets/css/home.module.css";

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
    const [alert, setAlert] = useState(null);

    function formatTime(item) {
        let formatted = null;
        if(item){
            let datetime = new Date(item);
            let options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            formatted = datetime.toLocaleString('es-GT', options);
        }        
        return formatted;
    }

    useEffect(() => {
        const fetchData = async () => {  
            const getTokenModel = await GetTokenModel();

            if (!getTokenModel.success) {
                return {
                    "success": false,
                    "msg": getTokenModel.msg,
                }; 
            }
            
            const queryString = `?search=${search}&order_by=${orderBy}&order=${order}&page=${currentPage}&show=${showRows}`;
            const response = await fetch(`http://127.0.0.1:8000/v1/${endpoint}${queryString}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getTokenModel.authToken}`,
                },
            });

            const responseJson = await response.json();
            if(responseJson.success){
                const response_data = responseJson.data
                const updatedData = response_data.map(element => {
                    if (endpoint === 'manage/users') {
                        const f_last_login = formatTime(element.last_login);
                        const f_date_joined = formatTime(element.date_joined);
                        const f_is_active = element.is_active ? <span className={`${styles.badge} ${styles["bg-primary"]}`}><FontAwesomeIcon icon={faCircleCheck} /> Si</span> : <span className={`${styles.badge} ${styles["bg-danger"]}`}><FontAwesomeIcon icon={faCircleXmark} /> No</span>;

                        return { 
                            ...element, 
                            id: <span className={`${styles.badge} ${styles["bg-primary"]}`}><FontAwesomeIcon icon={faFingerprint} /> {element.id}</span>, 
                            last_login: f_last_login,
                            date_joined: <span className={`${styles.badge} ${styles["bg-primary"]}`}>{f_date_joined}</span>,
                            is_active: f_is_active,
                            actions: <button className={`${styles.btn} ${styles["btn-sm"]} ${styles["bg-primary"]}`}><FontAwesomeIcon icon={faEdit} /> Editar</button>
                        };
                    }
                    return element;
                });

                setData(updatedData);
                setTotalPages(responseJson.total_pages);
                return;
            }

            setAlert(
                <AlertFormat
                    setAlert={setAlert}
                    type="danger"
                    title="Error!"
                    message={responseJson.msg ? responseJson.msg : "Error al cargar la tabla."}
                />
            );
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
                    className={`${styles.btn} ${styles["btn-pagination"]} ${i === currentPage ? styles["bg-primary"] : styles["bg-t-primary"]} ${i === currentPage ? styles.active : ""}`}
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
            {alert}
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
                        {data.map((item, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td key={`${column.field}_${index}`}>
                                        {column.field === 'id' ? item.id : (item[column.field] !== null && item[column.field] !== "" ? item[column.field] : "-")}
                                    </td>
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
                    <button className={`${styles.btn} ${styles["btn-pagination"]} ${styles["bg-t-primary"]}`} onClick={() => handlePageChange(currentPage - 1)}><FontAwesomeIcon icon={faAngleLeft}/></button>
                    {generatePaginationButtons()}
                    <button className={`${styles.btn} ${styles["btn-pagination"]} ${styles["bg-t-primary"]}`} onClick={() => handlePageChange(currentPage + 1)}><FontAwesomeIcon icon={faAngleRight}/></button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;