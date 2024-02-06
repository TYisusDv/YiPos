// components/manage/Users.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../scripts/DataTable";
import Modal from "../../scripts/Modal";
import ManageUsersAddModal from "../../modals/ManageUsersAddModal";
import styles from "../../assets/css/home.module.css";
import "animate.css";

const ManageUsers = ({ setModal }) => {
  const columns = [
    { field: "id", label: "ID" },
    { field: "username", label: "Nombre de usuario" },
    { field: "email", label: "Correo electronico" },
    { field: "last_login", label: "Last Login" },
    { field: "date_joined", label: "Join Date" },
  ];  

  return (
    <div>
      <div className={styles.header}>
          <div>
            <h1>Administrar usuarios</h1>
            <p>Manipula a los usuarios</p>
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
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div>
                <h3>0</h3>
                <p>Total usuarios</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.row} ${styles["fd-column"]} ${styles["g-8px"]} ${styles["mt-16px"]}`}>
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
                        <Modal setModal={setModal} title="Agregar usuarios" body={<ManageUsersAddModal />}></Modal>        
                      );
                    }}
                  ><FontAwesomeIcon icon={faPlus} /> Agregar</button>
                </div>
              </div>
              <div className={styles.body}>
                <DataTable 
                  endpoint="manage/users"
                  columns={columns}    
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;