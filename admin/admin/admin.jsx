class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAdmin: null,
      isAddContent: false,
      currentData: {
        id: "",
        password: "",
        role: "master",
      },

    };

  }

  async componentDidMount() {
    this.wStyle = R5.wStyle(`
    
    #admin-wrap {
        display: flex;
        padding: 40px;
        font-family: "Nanum Gothic", sans-serif;
    }
    
    .add-admin-wrap {
        display: flex;
          
          flex-direction: column;
          align-items: center;
          background-color: #FFFFFF;
         border-radius: 8px;
          margin-top: 16px;
          color: #343C6A;
          border: 1px solid rgba(177, 177, 177, 0.10);
          font-family: "Nanum Gothic", sans-serif;
          font-size: 15px;
          padding: 40px;
          box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
    }
    
    .subtitle {
        color: #0B5CD5;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 900;
        font-size: 18px;
        margin-bottom:32px;
        align-self:flex-start;
    }

    .form-row {
        display: flex;
        flex-direction: row;
        gap: 32px;
        width: 100%; 
      }
      
      .form-element {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 8px;
      }
      
      .form-element > label {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 2px;
      }
      
      .form-element > input,
      .form-element > select {
        padding: 8px;
        border: none;
        border-bottom: 1px solid #C0BEBE;
        width: 100%;
      }
      
      .form-element > input:focus,
      .form-element > select:focus{
        border: none;
        border-bottom: 1px solid #0B5CD5;
        outline: none;
        background: rgb(11, 92, 213, 0.1);
        color:#0B5CD5;
    
      }

      input.required-field {
        border: none;
        border-bottom: 1px solid #E54646;
        outline: none;
        background: rgb(227,68,68, 0.1);
      }
     

      select {
        height: 32px;
      }
      select.required-field {
        border: none;
        border-bottom: 1px solid #E54646;
        outline: none;
        background-color: rgba(227, 68, 68, 0.1); /* Use background-color instead of background for better compatibility */
      }
      


      .button-wrap {
        display:flex;
        justify-content:end;
      }


    
      .cancel-button{
        background-color: #FFFFFF;
        border: 2px solid #0B5CD5;
       border-radius: 8px;
        color: #0B5CD5;
        padding: 8px 24px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 600;
        cursor: pointer;
      }
      .save-button {
        background-color: #0B5CD5;
        border: none;
       border-radius: 8px;
        color: white;
        padding: 8px 24px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 600;
        cursor: pointer;
      }

      .save-button:hover {
        background-color: #D7E5FA;
        color: #0B5CD5;
      }
      
      
    `);
  }

  async addNewAdmin(data) {
    try {
      await makeAjaxRequest("POST", "/api/admin/create/index.php", data);
      ReactDOM.render(
        <Toast type={"Success"} />,
        document.getElementById("toast-container")
      );
    } catch (error) {
      console.log(error);
    }
  }

  resetForm = () => {
    this.setState({
      currentData: {
        id: "",
        password: "",
        role: "master",
      },
    });
  };

  handleSaveClick = () => {
    const requiredFields = ["id", "password", "role"];
    const emptyFields = requiredFields.filter(
      (field) => !this.state.currentData[field]
    );

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        const element = document.getElementById(field);
        if (element) {
          element.classList.add("required-field");
        }
      });
    } else {
      this.addNewAdmin(this.state.currentData);
      this.resetForm();
    }
  };

  handleSaveAdmin = (data, index) => {
    return $.ajax({
      type: "POST",
      url: "/api/school_info/edit/index.php",
      data: data[index],
      success: function (response) {
        ReactDOM.render(
          <Toast type={"Success"} />,
          document.getElementById("toast-container")
        );
      },
      error: function (xhr, status, error) {
        console.log("Error:", error);
      },
    });
  };
  
  render() {
    handleStateChange = (e, key, newValue) => {
      this.setState((prevState) => ({
        currentData: {
          ...prevState.currentData,
          [key]: newValue,
        },
      }));

      e.target.classList.remove("required-fields");
    };
    const tableHeaders = {
        admin_pid: "학교 고유번호 ",
        school_host: "호스트 여부",
        school_sc_code: "학교 코드",
        school_name: "학교 이름",
      };
    return (
      
      <div id="admin-wrap">
        <div className="add-admin-wrap">
          <div className="subtitle">관리자 추가</div>

          <div className="form-row">
            <div className="form-element">
              <label className="required">아이디</label>
              <input
                id="id"
                type="text"
                placeholder="아이디"
                value={this.state.currentData.id}
                onChange={(e) => handleStateChange(e, "id", e.target.value)}
                required
              />
            </div>
            <div className="form-element">
              <label className="required">비밀번호</label>
              <input
                id="password"
                type="text"
                placeholder="*******"
                value={this.state.currentData.password}
                onChange={(e) =>
                  handleStateChange(e, "password", e.target.value)
                }
                required
              />
            </div>

            <div className="form-element">
              <label className="required">역할</label>
              <select
                name="role"
                value={this.state.currentData.role}
                onChange={(e) => handleStateChange(e, "role", e.target.value)}
              >
                <option value="master">Master</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
          <DataTable
              current={this.state.currentAdmin}
              headers={tableHeaders}
              handlerFunct={this.handleSaveAdmin}
              title={"관리자 정보 테이블"}
              showEditIcon={true}
            />
          <div className="button-wrap">
            <div className="cancel-button" onClick={this.resetForm}>
              초기화
            </div>
            <button className="save-button" onClick={this.handleSaveClick}>
              저장
            </button>
          </div>
        </div>
        <div id="toast-container"></div>
      </div>
    );
  }
}
