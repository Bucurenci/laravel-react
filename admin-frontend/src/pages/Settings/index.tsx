import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Settings() {

  /*useEffect(() => {
    getUsers(paginationData.current_page);
  }, []);

  const getUsers = (page: number) => {
    setLoading(true);

    axiosClient.get('/users?page=' + page)
      .then(({data}) => {
        setUsers(data.data);
        setPaginationData({
          ...paginationData, current_page: data.meta.current_page, last_page: data.meta.last_page});
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }*/



  console.log('Settings Rendered');

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-header">
        <div className="d-flex flex-row justify-content-between py-2">
          <div className="align-self-start">
            <h1 className="h2">App Settings</h1>
          </div>
          <div className="align-self-end">
            <Link to="#" className="btn btn-success btn-lg text-white align-self-end">Add new</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
