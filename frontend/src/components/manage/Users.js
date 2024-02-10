// components/manage/Users.js
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faPlus, faCheck, faSignal } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../scripts/DataTable";
import Modal from "../../scripts/Modal";
import ManageUsersAddModal from "../../modals/ManageUsersAddModal";
import styles from "../../assets/css/home.module.css";
import "animate.css";

const ManageUsers = ({ setModal }) => {  
  const [tableKey, setTableKey] = useState(0);  
  const [table, setTable] = useState(null);
  const [columns] = useState([
    { field: "id", label: "ID" },
    { field: "username", label: "Nombre de usuario" },
    { field: "email", label: "Correo electronico" },
    { field: "first_name", label: "Nombre(s)" },
    { field: "last_name", label: "Apellido(s)" },
    { field: "is_active", label: "Activo" },
    { field: "last_login", label: "Último acceso" },
    { field: "date_joined", label: "Fecha de ingreso" },
    { field: "actions", label: "Acciones" },
  ]);

  const reloadTable = useCallback(() => {
    const newTable = (
      <DataTable
        key={tableKey}
        endpoint="manage/users"
        columns={columns}    
      />
    );
    setTable(newTable);
  }, [columns, tableKey]);

  useEffect(() => {
    reloadTable();
  }, [reloadTable]); 

  return (
    <div>
      <div className={styles.header}>
          <div>
            <h1>Administrar usuarios</h1>
            <p>Administra, agrega, edita y deshabilita usuarios.</p>
          </div>
          <ul>
            <li>Manage</li>
            <li>/</li>
            <li className={styles.active}>Users</li>
          </ul>
      </div>
      <div className={styles["row-main"]}>        
        <div className={`${styles["row-wrap"]} ${styles["g-8px"]}`}>
          <div className={styles["col-4"]}>
            <div className={styles["panel-count"]}>
              <div className={`${styles.icon} ${styles["bg-t-primary"]}`}>
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div>
                <h3>0</h3>
                <p>Total usuarios</p>
              </div>
            </div>
          </div>
          <div className={styles["col-4"]}>
            <div className={styles["panel-count"]}>
              <div className={`${styles.icon} ${styles["bg-t-primary"]}`}>
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div>
                <h3>0</h3>
                <p>Usuarios activos</p>
              </div>
            </div>
          </div>
          <div className={styles["col-4"]}>
            <div className={styles["panel-count"]}>
              <div className={`${styles.icon} ${styles["bg-t-primary"]}`}>
                <FontAwesomeIcon icon={faSignal} />
              </div>
              <div>
                <h3>0</h3>
                <p>Usuarios online</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.row} ${styles["fd-column"]} ${styles["g-8px"]}`}>
          <div className={styles["col-12"]}>
            <div className={`${styles["d-flex"]} ${styles["g-8px"]}`}>
            </div>
          </div>
          <div className={styles["col-12"]}>
            <div className={styles.panel}>
              <div className={styles.head}>
                <h3 className={styles.title}>Usuarios</h3>
                <div>
                  <button 
                    className={`${styles.btn} ${styles["bg-primary"]}`} 
                    onClick={() => {
                      setModal(
                        <Modal setModal={setModal} title="Agregar usuarios" body={<ManageUsersAddModal setModal={setModal} setTableKey={setTableKey} />}></Modal>        
                      );
                    }}
                  ><FontAwesomeIcon icon={faPlus} /> Agregar</button>
                </div>
              </div>
              <div className={styles.body}>
                {table}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;