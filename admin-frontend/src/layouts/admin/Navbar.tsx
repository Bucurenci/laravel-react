import React from 'react'
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";

function Navbar() {
  const {user, token} = useStateContext();

  const handleLogout = (ev) => {
    ev.preventDefault();

    localStorage.removeItem('ACCESS_TOKEN');
  }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle me-3">
                <i className="fa fa-bars"></i>
            </button>

            <form
                className="d-none d-sm-inline-block form-inline me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                           aria-label="Search" aria-describedby="basic-addon2" />
                    <button className="btn btn-primary input-group-append text-white" type="button">
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </form>

            <ul className="navbar-nav ms-auto">

                <li className="nav-item dropdown no-arrow d-sm-none">
                    <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                       data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </Link>
                    <div className="dropdown-menu  dropdown-menu-end p-3 shadow animated--grow-in"
                         aria-labelledby="searchDropdown">
                        <form className="form-inline me-auto w-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                       placeholder="Search for..." aria-label="Search"
                                       aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button"
                       data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-bell fa-fw"></i>
                        <span className="badge bg-danger badge-counter">3+</span>
                    </Link>
                    <div className="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in"
                         aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">
                            Alerts Center
                        </h6>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="me-3">
                                <div className="icon-circle bg-primary">
                                    <i className="fas fa-file-alt text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                        </Link>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="me-3">
                                <div className="icon-circle bg-success">
                                    <i className="fas fa-donate text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 7, 2019</div>
                                $290.29 has been deposited into your account!
                            </div>
                        </Link>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="me-3">
                                <div className="icon-circle bg-warning">
                                    <i className="fas fa-exclamation-triangle text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 2, 2019</div>
                                Spending Alert: We've noticed unusually high spending for your account.
                            </div>
                        </Link>
                        <Link className="dropdown-item text-center small text-gray-500" to="#">Show All Alerts</Link>
                    </div>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                    <Link className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button"
                       data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw"></i>
                        <span className="badge bg-danger badge-counter">7</span>
                    </Link>
                    <div className="dropdown-list dropdown-menu  dropdown-menu-end shadow animated--grow-in"
                         aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            Message Center
                        </h6>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="dropdown-list-image me-3">
                                <img className="rounded-circle" src="/img/undraw_profile_1.svg" alt="..." />
                                    <div className="status-indicator bg-success"></div>
                            </div>
                            <div className="font-weight-bold">
                                <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                    problem I've been having.
                                </div>
                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                        </Link>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="dropdown-list-image me-3">
                                <img className="rounded-circle" src="/img/undraw_profile_2.svg" alt="..." />
                                    <div className="status-indicator"></div>
                            </div>
                            <div>
                                <div className="text-truncate">I have the photos that you ordered last month, how
                                    would you like them sent to you?
                                </div>
                                <div className="small text-gray-500">Jae Chunk · 1d</div>
                            </div>
                        </Link>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="dropdown-list-image me-3">
                                <img className="rounded-circle" src="/img/undraw_profile_3.svg" alt="..." />
                                    <div className="status-indicator bg-warning"></div>
                            </div>
                            <div>
                                <div className="text-truncate">Last month's report looks great, I am very happy with
                                    the progress so far, keep up the good work!
                                </div>
                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                        </Link>
                        <Link className="dropdown-item d-flex align-items-center" to="#">
                            <div className="dropdown-list-image me-3">
                                <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..." />
                                    <div className="status-indicator bg-success"></div>
                            </div>
                            <div>
                                <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                    told me that people say this to all dogs, even if they aren't good...
                                </div>
                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                            </div>
                        </Link>
                        <Link className="dropdown-item text-center small text-gray-500" to="#">Read More Messages</Link>
                    </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                       data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="me-2 d-none d-lg-inline text-gray-600 small">{user.firstName} {user.lastName}</span>
                        <img className="img-profile rounded-circle" src="/img/undraw_profile.svg" />
                    </Link>
                    <div className="dropdown-menu  dropdown-menu-end shadow animated--grow-in"
                         aria-labelledby="userDropdown">
                        {/*<Link className="dropdown-item" to="#">
                            <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                            Settings
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                            Activity Log
                        </Link>
                        <div className="dropdown-divider"></div>*/}
                        <Link to="#" onClick={handleLogout} className="dropdown-item" data-toggle="modal" data-bs-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                            Logout
                        </Link>
                    </div>
                </li>

            </ul>

        </nav>
    );
}

export default Navbar;
