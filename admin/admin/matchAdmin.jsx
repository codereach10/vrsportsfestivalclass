class MatchAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentMatch: null,
    isAddContent: false,
    currentData: {},
    schools: null,
  };

  wstyle = null;

  async componentDidMount() {
    this.getCurrentMatch();
    this.getSchoolList();

    this.wstyle = R5.wStyle(` 
    #match-wrap {
      display: flex;
      flex-direction: column;
      padding: 40px;
      font-family: "Nanum Gothic", sans-serif;
  }
  
  .match-content {
      display: flex;
      flex-direction: column;
  }


  .button-wrap{
    display:flex;
    justify-content: center;
  }
  
  .add-button {
    background-color: #0B5CD5;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    width: 100%;
    height: 40px;
    cursor:pointer;
    margin-top: 20px


  }
  .add-button:hover {
    background-color: #D7E5FA;
    color: #0B5CD5;
  }

  //----- form ------

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
    gap: 32px;
    width: 100%; 
  }
  
  .form-element {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    width: 100% ;
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
  
  .required:after {
    content: " *";
    color: red;
  }
  
  textarea {
    resize: none;
    width: 100%; 
  }

  
  .button-wrap-form {
    display:flex;
    justify-content:end;
    gap: 8px;
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

  getData() {
    return $.ajax({
      type: "GET",
      url: "/api/schedule/index.php",
    });
  }

  handleSaveMatch = (data, index) => {
    return $.ajax({
      type: "POST",
      url: "/api/schedule/edit/index.php",
      data: data[index],
      success: (response) => {
        ReactDOM.render(
          <Toast type={"Success"} />,
          document.getElementById("toast-container")
        );
      },
      error: (xhr, status, error) => {
        console.log("Error:", error);
      },
    });
  };

  handleAddMatch = (data) => {
    return $.ajax({
      type: "POST",
      url: "/api/schedule/create/index.php",
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

  async getCurrentMatch() {
    try {
      const res = await this.getData();

      let match = JSON.parse(res).schedule;

      this.setState({ currentMatch: { ...match } });
    } catch (err) {
      console.log(err);
    }
  }

  getSchoolList = () => {
    return $.ajax({
      type: "GET",
      url: "/api/school_info/read/index.php",
      success: (response) => {
        this.setState({ schools: JSON.parse(response).school });
      },
    });
  };

  handleStateChange = (e, key, newValue) => {
    console.log(key + " " + newValue);
    this.setState((prevState) => ({
      currentData: {
        ...prevState.currentData,
        [key]: newValue,
      },
    }));

    e.target.classList.remove("required-field");
  };
  render() {
    const tableHeaders = {
      uid: "고유번호",
      apSn: "콘텐츠 코드",
      host: "경기 호스트",
      name: "경기 이름",
      state: "상태",
      players: "플레이어",
    };

    const filteredContests = {};

    if (this.state.currentMatch) {
      Object.keys(this.state.currentMatch).forEach((contestKey) => {
        const contest = this.state.currentMatch[contestKey];
        const filteredContest = {};
        Object.keys(contest).forEach((header) => {
          if (tableHeaders.hasOwnProperty(header)) {
            filteredContest[header] = contest[header];
          }
        });
        filteredContests[contestKey] = filteredContest;
      });
    }

    return (
      <div id="match-wrap">
        <div className="match-content">
          <div>
            <DataTable
              current={filteredContests}
              headers={tableHeaders}
              handlerFunct={this.handleSaveMatch}
              title="경기 정보 테이블"
            />
            <div className="button-wrap">
              {!this.state.isAddContent && (
                <button
                  className="add-button"
                  onClick={() => this.setState({ isAddContent: true })}
                >
                  경기 추가
                </button>
              )}
            </div>
            {this.state.isAddContent && (
              <div>
                <FormMatch
                  onCancelFunction={() =>
                    this.setState({ isAddContent: false })
                  }
                  onSubmitFunction={this.handleAddMatch}
                  handleStateChange={this.handleStateChange}
                  currentData={this.state.currentData}
                  schools={this.state.schools}
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

function FormMatch({
  onCancelFunction,
  onSubmitFunction,
  handleStateChange,
  currentData,
  schools,
}) {
  const handleSubmit = () => {
    const requiredFields = [
      "gs_apSn",
      "gs_scCode",
      "gs_pid1",
      "gs_pid2",
      "gs_name",
      "gs_round",
      "gs_num",
      "gs_hour",
      "gs_playminutes",
      "gs_datetime_start",
      "gs_datetime_end",
    ];

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

  function getSchoolByName(schools, name) {
    const school = Object.values(schools).find(
      (school) => school.school_name === name
    );

    return school.school_pid;
  }

  return (
    <div className="form-wrap">
      <div className="contest-subtitle">경기 추가</div>
      <div className="form-row">
        <div className="form-element">
          <label>콘텐츠 코드</label>
          <input
            className="number-input"
            type="number"
            onChange={(e) => handleStateChange(e, "gs_apSn", e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>호스트 코드</label>
          <input
            className="number-input"
            type="number"
            onChange={(e) => handleStateChange(e, "gs_scCode", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-element">
          <label>참가자 1:</label>
          <select
            onChange={(e) =>
              handleStateChange(
                e,
                "gs_pid1",
                getSchoolByName(schools, e.target.value)
              )
            }
          >
            {Object.values(schools).map((school, index) => (
              <option key={index} value={school.school_name}>
                {school.school_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-element">
          <label>참가자 2:</label>
          <select
            onChange={(e) =>
              handleStateChange(
                e,
                "gs_pid2",
                getSchoolByName(schools, e.target.value)
              )
            }
          >
            {Object.values(schools).map((school, index) => (
              <option key={index} value={school.school_name}>
                {school.school_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-element">
          <label>경기 이름</label>
          <input
            className="text-input"
            type="text"
            onChange={(e) => handleStateChange(e, "gs_name", e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>라운드</label>
          <input
            className="number-input"
            type="number"
            onChange={(e) => handleStateChange(e, "gs_round", e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>회차</label>
          <input
            className="number-input"
            type="number"
            onChange={(e) => handleStateChange(e, "gs_num", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-element">
          <label>경기 시작 시</label>
          <input
            className="number-input"
            type="number"
            onChange={(e) => handleStateChange(e, "gs_hour", e.target.value)}
            required
          />
        </div>
        <div className="form-element">
          <label>경기 시작 분</label>
          <input
            className="number-input"
            type="number"
            onChange={(e) =>
              handleStateChange(e, "gs_playminutes", e.target.value)
            }
            required
          />
        </div>
        <div className="form-element">
          <label>경기 시작 날짜</label>
          <input
            type="datetime-local"
            onChange={(e) =>
              handleStateChange(e, "gs_datetime_start", e.target.value)
            }
            required
          />
        </div>
        <div className="form-element">
          <label>경기 종료 날짜</label>
          <input
            type="datetime-local"
            onChange={(e) =>
              handleStateChange(e, "gs_datetime_end", e.target.value)
            }
            required
          />
        </div>
      </div>
      <div className="button-wrap-form">
        <div className="cancel-button" onClick={onCancelFunction}>
          취소
        </div>
        <button className="save-button" onClick={handleSubmit}>
          저장
        </button>
      </div>
    </div>
  );
}
