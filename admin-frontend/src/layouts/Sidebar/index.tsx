import {Link, NavLink} from "react-router-dom";

function Sidebar() {

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="#">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">{import.meta.env.VITE_APP_NAME}</div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/users" className="nav-link">
                    <i className="fas fa-fw fa-user-alt"></i>
                    <span>Users</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/todo-list" className="nav-link">
                    <i className="fas fa-fw fa-list-alt"></i>
                    <span>Todo List</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/use-loader" className="nav-link">
                    <i className="fas fa-fw fa-list-alt"></i>
                    <span>UseLoader Hook</span>
                </NavLink>
            </li>

            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <i className="fas fa-fw fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>

            {/*<hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Interface
            </div>

            <li className="nav-item">
                <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                   aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
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
                    <i className="fas fa-fw fa-wrench"></i>
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
                    <i className="fas fa-fw fa-folder"></i>
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
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Charts</span></Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="tables.html">
                <i className="fas fa-fw fa-table"></i>
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

        </ul>
    );
}

export default Sidebar;
