class SchoolAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentSchool: null,
    isAddContent: false,
    currentData: {},
  };

  wstyle = null;

  async componentDidMount() {
    this.getCurrentSchool();

    this.wstyle = R5.wStyle(` 
      #school-wrap {
        display:flex;
        flex-direction: column;
        padding: 40px;
         font-family: "Nanum Gothic", sans-serif;

      }

      .school-content{
        display:flex;
        flex-direction:column;
       }
      

  
       .add-button {
        background-color: #0B5CD5;
        color: #FFFFFF;
        border: none;
        border-radius: 8px;
        width: 200px;
        height: 40px;
        cursor:pointer;
        margin-top: 20px
    
    
      }

      .add-button:hover {
        background-color: #D7E5FA;
        color: #0B5CD5;
      }
  //-------------------- form --------------------


  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999; 
    background-color: rgba(0,0,0, 0.4);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-wrap {
    display:flex;
    flex-direction: column;
    gap: 32px;
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

  .form-row {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%; 
  }
  
  .form-element {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    width: calc(100% / 3); 
  }

  .form-element > label {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 2px;
  }
  
  .form-element > input,
  .form-element > textarea {
    padding: 8px;
    border: none;
    border-bottom: 1px solid #C0BEBE;

  }
  
  .form-element > input:focus,
  .form-element > textarea:focus{
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
  
  .number-input {
    width: 100%; 
  }
  
  .text-input {
    width: 100%; 
  }

.check-input {
width: 100%;}
  
  .required:after {
    content: " *";
    color: red;
  }
  
  textarea {
    resize: none;
    width: 100%; 
  }

  ::placeholder {
      opacity: 0.5;
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
  

  .digit-inputs {
    display: flex;
  
  }

  .digit-inputs > input {
    padding: 8px;
    width: 24px;
    text-align: center;
    margin: 0 5px;
    border: none;
    border-bottom: 1px solid #C0BEBE;
  }
  
  .digit-inputs > input:focus {
    background-color:  rgb(11, 92, 213, 0.1);
    border-bottom: 1px solid #0B5CD5;
    outline: none;
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
  
  input.required-field {
    border: none;
    border-bottom: 1px solid #E54646;
    outline: none;
    background: rgb(227,68,68, 0.1);
  }
  

  .host-checkbox {
    padding:8px;
  }
  
        `);
  }

  componentWillUnmount() {
    if (this.wstyle != null) {
      this.wstyle.destroy();
      this.wstyle = null;
    }
    if (this.wstyleMatchItem != null) {
      this.wstyleMatchItem.destroy();
      this.wstyleMatchItem = null;
    }
  }

  async getData() {
    try {
      const response = await $.ajax({
        type: "GET",
        url: "/api/school_info/read/index.php",
      });
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async getCurrentSchool() {
    try {
      const res = await this.getData();
      const school = JSON.parse(res).school;
      this.setState({ currentSchool: { ...school } });
    } catch (err) {
      console.error(err);
    }
    ``;
  }

  handleSaveSchool = (data, index) => {
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

  handleAddSchool = (data) => {
    if (!data["school_host"]) {
      data["school_host"] = 0;
    }

    return $.ajax({
      type: "POST",
      url: "/api/school_info/create/index.php",
      data: data,
      success: (response) => {
        ReactDOM.render(
          <Toast type={"Success"} />,
          document.getElementById("toast-container")
        );
        this.setState({ isAddContent: false });
        window.location.reload();
      },
      error: (xhr, status, error) => {
        console.log("Error:", error);
      },
    });
  };

  handleStateChange = (e, key, newValue) => {
    const value =
      e.target.type === "checkbox" ? (e.target.checked ? 1 : 0) : newValue;

    this.setState((prevState) => ({
      currentData: {
        ...prevState.currentData,
        [key]: value,
      },
    }));

    e.target.classList.remove("required-field");
  };

  render() {
    const tableHeaders = {
      school_pid: "학교 고유번호 ",
      school_host: "호스트 여부",
      school_sc_code: "학교 코드",
      school_name: "학교 이름",
    };

    return (
      <div id="school-wrap">
        <div className="school-content">
          <div className="button-wrap">
            {!this.state.isAddContent && (
              <button
                className="add-button"
                onClick={() => this.setState({ isAddContent: true })}
              >
                학교 추가
              </button>
            )}
          </div>
          <div>
            <DataTable
              current={this.state.currentSchool}
              headers={tableHeaders}
              handlerFunct={this.handleSaveSchool}
              title={"학교 정보 테이블"}
              showEditIcon={true}
            />

            {this.state.isAddContent && (
              <div>
                <FormSchool
                  onCancelFunction={() =>
                    this.setState({ isAddContent: false })
                  }
                  onSubmitFunction={this.handleAddSchool}
                  handleStateChange={this.handleStateChange}
                  currentData={this.state.currentData}
                />
              </div>
            )}
          </div>
        </div>
        <div id="toast-container"></div>
      </div>
    );
  }
}

function FormSchool({
  onCancelFunction,
  onSubmitFunction,
  handleStateChange,
  currentData,
}) {
  const handleDigitInputChange = (index, e) => {
    const nextIndex = index + 1;
    const nextInput = document.getElementById(`digit-input-${nextIndex}`);
    const lastInputIndex = 6;
    if (nextInput && e.target.value.length === 1) {
      nextInput.focus();
    }
    if (index === lastInputIndex) {
      const concatenatedNumber = Array.from(
        { length: lastInputIndex + 1 },
        (_, i) => {
          const input = document.getElementById(`digit-input-${i}`);
          return input ? input.value : "";
        }
      ).join("");

      handleStateChange(e, "school_sc_code", parseInt(concatenatedNumber, 10));
    }
  };

  const handleSubmit = () => {
    const requiredFields = ["school_sc_code", "school_name"];
    const emptyFields = requiredFields.filter((field) => !currentData[field]);

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        const element = document.getElementById(field);
        if (element) {
          element.classList.add("required-field");
        }
      });
    } else {
      onSubmitFunction(currentData);
    }
  };

  return (
    <div className="overlay">
      <div className="form-wrap">
        <div className="contest-subtitle">학교 추가</div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">학교 코드</label>
            <div className="digit-inputs">
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <input
                  key={index}
                  id={`digit-input-${index - 1}`}
                  type="text"
                  maxLength="1"
                  pattern="[0-9]"
                  required
                  onChange={(e) => handleDigitInputChange(index - 1, e)}
                  className="digit-input"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">학교 이름</label>
            <input
              id="school_name"
              className="text-input"
              type="text"
              placeholder="학교 이름 입력"
              onChange={(e) =>
                handleStateChange(e, "school_name", e.target.value)
              }
            />
          </div>
          <div className="form-element">
            <label>호스트 여부</label>
            <label className="host-checkbox">
              <input
                type="checkbox"
                className="checkbox"
                id="school_host"
                onChange={(e) =>
                  handleStateChange(e, "school_host", e.target.value)
                }
              />
              호스트
            </label>
          </div>
        </div>
        <div className="button-wrap">
          <div className="cancel-button" onClick={onCancelFunction}>
            취소
          </div>
          <button className="save-button" onClick={handleSubmit}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
