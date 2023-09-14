import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TodoList() {
  const [works, setWorks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newWork, setNewWork] = useState("");

  const loadWorks = () => {
    axios
      .get("http://localhost:3000/api/v1/works")
      .then((res) => {
        setWorks(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const loadCompleted = () => {
    axios
      .get("http://localhost:3000/api/v1/completed")
      .then((res) => {
        setCompleted(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadWorks();
    loadCompleted();
  }, []);

  const addWork = () => {
    if (newWork.trim() === "") {
      alert("Vui lòng nhập tên công việc");
      return;
    }

    axios
      .post("http://localhost:3000/api/v1/works", {
        name: newWork,
        status: 0,
      })
      .then((res) => {
        console.log("Công việc đã được thêm thành công:", res.data.result);
        setNewWork("");
        loadWorks();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteWorks = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/works/${id}`)
      .then((res) => {
        console.log("Công việc chưa hoàn thành đã được xóa thành công");
        loadWorks();
      })
      .catch((err) => console.log(err));
  };

  const handleCheckWorks = (id) => {
    axios
      .put(`http://localhost:3000/api/v1/works/${id}`, {})
      .then((res) => {
        console.log("Công việc đã chuyển trạng thái thành công");
        loadWorks();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteComplete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/api/v1/completed/${id}`)
      .then((res) => {
        console.log("Công việc đã hoàn thành đã được xóa thành công");
        loadCompleted();
      })
      .catch((err) => console.log(err));
  };

  const handleCheckCompleted = (id) => {
    axios
      .put(`http://localhost:3000/api/v1/completed/${id}`, {})
      .then((res) => {
        console.log("Công việc đã chuyển trạng thái thành công");
        loadWorks();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="user-manage">
      <h1>TODO LIST</h1>
      <div className="full">
        <div className="input-group mb-3 inpur">
          <input
            type="text"
            className="form-control"
            placeholder="Add"
            value={newWork}
            onChange={(e) => setNewWork(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            onClick={addWork}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="todoList">
          <div className="uncompletedTasks">
            <h2>Uncompleted Tasks</h2>
            <div>
              {works.map((work, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 5px",
                      margin: "10px 0px",
                      backgroundColor: "white",
                    }}
                  >
                    {work.name}{" "}
                    <div>
                      <i
                        onClick={() => handleDeleteWorks(work.id)}
                        className="fa-solid fa-trash-can"
                      ></i>
                      <i
                        style={{ paddingLeft: "10px" }}
                        onClick={() => handleCheckWorks(work.id)}
                        className="fa-regular fa-circle-check"
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="completedTasks">
            <h2>Completed Tasks</h2>
            <div>
              {completed.map((completedTask, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 5px",
                      margin: "10px 0px",
                      backgroundColor: "white",
                    }}
                  >
                    {completedTask.name}
                    <div>
                      <i
                        onClick={() => handleDeleteComplete(completedTask.id)}
                        className="fa-solid fa-trash-can"
                      ></i>
                      <i
                        style={{ paddingLeft: "10px" }}
                        onClick={() => handleCheckCompleted(completedTask.id)}
                        className="fa-solid fa-circle-check"
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
