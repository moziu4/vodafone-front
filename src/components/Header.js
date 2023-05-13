import styles from "@/styles/Layout.module.css";
import stylesSidebar from "@/styles/Sidebar.module.css";
import LogOut from "@/utils/LogOut";
import { useRouter } from "next/router";
const Header = (props) => {
  const nombre = props.nombre;
  const rol = props.rol;
  const router = useRouter();
  const cerrarSession = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="row">
      <div>
        <p className={` ${stylesSidebar.titulo}`}>Vodafone</p>
      </div>
      <div className={styles.contentConfi}>
        <div>
          <div className={styles.textoConfiUsuario}>{nombre}</div>
          <div className={styles.textoConfiRol}>{rol}</div>
        </div>
        <button
          onClick={() => cerrarSession()}
          type="button"
          className={styles.btnConfiUsuario}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
};
export default Header;
