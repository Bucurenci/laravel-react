import {Link, NavLink} from "react-router-dom";
import {faCog, faFileImage, faPaw, faTengeSign, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Sidebar() {

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="#">
        <div className="sidebar-brand-icon rotate-n-15">
          <FontAwesomeIcon icon={faPaw} size="2x"/>
        </div>
        <div className="sidebar-brand-text mx-3">{import.meta.env.VITE_APP_NAME}</div>
      </Link>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item">
        <NavLink to="/users" className="nav-link">
          <FontAwesomeIcon icon={faUserAlt} className="me-2"/>
          <span>Users</span>
        </NavLink>
      </li>

      {/*<hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Interface
            </div>

            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                   aria-expanded="true" aria-controls="collapseTwo">
                    <FontAwesomeIcon icon={faCog} className="me-2"/>
                    <span>Components</span>
                </Link>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <Link className="collapse-item" to="buttons.html">Buttons</Link>
                        <Link className="collapse-item" to="cards.html">Cards</Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                   data-bs-target="#collapseUtilities"
                   aria-expanded="true" aria-controls="collapseUtilities">
                    <FontAwesomeIcon icon={faWrench} className="me-2"/>
                    <span>Utilities</span>
                </Link>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <Link className="collapse-item" to="utilities-color.html">Colors</Link>
                        <Link className="collapse-item" to="utilities-border.html">Borders</Link>
                        <Link className="collapse-item" to="utilities-animation.html">Animations</Link>
                        <Link className="collapse-item" to="utilities-other.html">Other</Link>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Addons
            </div>

            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
                   data-bs-target="#collapsePages"
                   aria-expanded="true" aria-controls="collapsePages">
                    <FontAwesomeIcon icon={faFolder} className="me-2"/>
                    <span>Pages</span>
                </Link>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                     data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <Link className="collapse-item" to="login.html">Login</Link>
                        <Link className="collapse-item" to="register.html">Register</Link>
                        <Link className="collapse-item" to="forgot-password.html">Forgot Password</Link>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <Link className="collapse-item" to="404.html">404 Page</Link>
                        <Link className="collapse-item" to="blank.html">Blank Page</Link>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="charts.html">
          <FontAwesomeIcon icon={faChartArea} className="me-2"/>
                <span>Charts</span></Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="tables.html">
          <FontAwesomeIcon icon={faTable} className="me-2"/>
                <span>Tables</span></Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="../../../public/img/undraw_rocket.svg" alt="..." />
                <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium
                    features, components, and more!</p>
                <Link className="btn btn-success btn-sm" to="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</Link>
            </div>*/}

      <li className="nav-item position-absolute bottom-0">

        <hr className="sidebar-divider"/>

        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse"
              data-bs-target="#collapseUtilities"
              aria-expanded="true" aria-controls="collapseUtilities">
          <FontAwesomeIcon icon={faTengeSign} className="me-2"/>
          <span>In progress</span>
        </Link>

        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
             data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">

            <NavLink to="/settings" className="collapse-item">
              <FontAwesomeIcon icon={faCog} className="me-2"/>
              <span>Settings</span>
            </NavLink>
            <NavLink to="/todo-list" className="collapse-item">
              <FontAwesomeIcon icon={faCog} className="me-2"/>
              <span>Todo List</span>
            </NavLink>
            <NavLink to="/use-loader" className="collapse-item">
              <FontAwesomeIcon icon={faFileImage} className="me-2"/>
              <span>UseLoader Hook</span>
            </NavLink>
          </div>
        </div>

      </li>

    </ul>
  );
}

export default Sidebar;
