import {useRef, useState} from "react";
import axiosClient from "../../../../axios-client";

export default function ModalForm() {
  const nameRef = useRef<HTMLInputElement>(null!);
  const typeRef = useRef<HTMLInputElement>(null!);
  const valueRef = useRef<HTMLInputElement>(null!);
  const [errors, setErrors] = useState();

  const onSubmit = (ev) => {
    ev.preventDefault();

    let payload = {
      name: nameRef.current.value,
      type: typeRef.current.value,
      value: JSON.stringify(valueRef.current.value),
    }

    setErrors(null);

    axiosClient.post(`/settings`, payload)
      .then(({data}) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);

        const response = error.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  return (
    <form onSubmit={onSubmit} className="user">

      <div className="mb-3">
        <input ref={nameRef} type="text" className="form-control form-control-user" id="setting_name"
               placeholder="Name..."/>
        {errors && errors.name && <div className="text-danger ps-3 mt-2">{errors.name[0]}</div>}
      </div>

      <div className="mb-3">
        <select ref={typeRef} className="form-select form-control-user" id="setting_type">
          <option>Choose an option</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="select">Dropdown</option>
        </select>
        {errors && errors.type && <div className="text-danger ps-3 mt-2">{errors.type[0]}</div>}
      </div>

      <div className="mb-3">
        <input ref={valueRef} type="text" className="form-control form-control-user" id="setting_value"
               placeholder="Value..."/>
        {errors && errors.value && <div className="text-danger ps-3 mt-2">{errors.value[0]}</div>}
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary btn-user text-white">
          Create
        </button>
      </div>
    </form>
  );
}
