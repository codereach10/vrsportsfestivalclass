class ContestAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveContest = this.handleSaveContest.bind(this);
  }

  state = {
    currentContest: null,
    isAddContent: false,
    currentData: {},
    banner_small: null,
    banner_mid: null,
    banner_large: null,
  };

  wstyle = null;

  async componentDidMount() {
    this.getCurrentContest();

    this.wstyle = R5.wStyle(` 
    #contest-main {
      display: flex;
      flex-direction: column;
      padding: 40px;
      font-family: "Nanum Gothic", sans-serif;
  }
  
  .contest-content {
      display: flex;
      flex-direction: column;
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
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.2);
  width: 70%;

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
  .form-element > textarea {
    padding: 8px;
    border: none;
    border-bottom: 1px solid #C0BEBE;
    width: 100%;
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

  .extension-info {
    display: inline-block;
    color: #B3B3B3;
    font-weight: 100;
    font-size: 10px;


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
  

  #register_start::-webkit-calendar-picker-indicator, 
  #register_end::-webkit-calendar-picker-indicator,
  #kickoff_start::-webkit-calendar-picker-indicator,
  #kickoff_end::-webkit-calendar-picker-indicator  {
    width: 30px;
    height: 30px;
  }
  


  .file-input::file-selector-button {
    
      background-color: #0B5CD5;
      border: none;
     border-radius: 8px;
      color: white;
      padding: 8px 16px;

      font-family: "Nanum Gothic", sans-serif;
      font-weight: 600;
      cursor: pointer;
  }


  .file-input::file-selector-button:hover {
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
      url: "/api/contest_info/read/index.php",
    });
  }

  handleSaveContest(data, index) {
    return $.ajax({
      type: "POST",
      url: "/api/contest_info/edit/index.php",
      data: data[index],
      success: function (response) {
        console.log(response);
        ReactDOM.render(
          <Toast type={"Success"} />,
          document.getElementById("toast-container")
        );
      },
      error: function (xhr, status, error) {
        console.log("Error:", error);
      },
    });
  }

  handleAddContest = (data) => {
    data["contest_state"] = 0;

    console.log(data);
    this.handleSaveBanners();
    return $.ajax({
      type: "POST",
      url: "/api/contest_info/create/index.php",
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

  handleSaveBanners = () => {
    const files = {
      banner_small: this.state.banner_small,
      banner_mid: this.state.banner_mid,
      banner_large: this.state.banner_large,
    };

    const formData = new FormData();
    let fileCount = 1; // Counter for generating unique keys

    Object.keys(files).forEach((key) => {
      if (files[key] && files[key].size > 0) {
        const uniqueKey = `${key}_${fileCount}`;
        formData.append(uniqueKey, files[key]);
        fileCount++;
      }
    });

    $.ajax({
      type: "POST",
      url: "/api/contest_info/upload_banner/index.php",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  };

  async getCurrentContest() {
    try {
      const res = await this.getData();
      let contest = JSON.parse(res).contest;

      this.setState({ currentContest: { ...contest } });
    } catch (err) {
      console.log(err);
    }
  }

  handleStateChange = (e, key, newValue) => {
    this.setState((prevState) => ({
      currentData: {
        ...prevState.currentData,
        [key]: newValue,
      },
    }));

    e.target.classList.remove("required-field");
  };

  handleFileChange = (e, type) => {
    if (type === "small") {
      this.setState({ banner_small: e.target.files[0] });
    } else if (type === "mid") {
      this.setState({ banner_mid: e.target.files[0] });
    } else if (type === "large") {
      this.setState({ banner_large: e.target.files[0] });
    }
  };

  render() {
    const tableHeaders = {
      contest_id: "고유번호",
      contest_cnt: "대회 횟수",
      contest_name: "대회 이름",
      kickoff_start: "대회 시작",
      kickoff_end: "대회 종료",
      contest_state: "상태",
    };

    return (
      <div id="contest-main">
        <div className="contest-content">
          <div className="button-wrap">
            {!this.state.isAddContent && (
              <button
                className="add-button"
                onClick={() => this.setState({ isAddContent: true })}
              >
                대회 추가
              </button>
            )}
          </div>
          <div>
            <DataTable
              current={this.state.currentContest}
              headers={tableHeaders}
              handlerFunct={this.handleSaveContest}
              navigationFunct={this.props.funct}
              title={"대회 정보 테이블"}
            />
          </div>
        </div>
        {this.state.isAddContent && (
          <FormContest
            onCancelFunction={() => this.setState({ isAddContent: false })}
            onSubmitFunction={this.handleAddContest}
            handleStateChange={this.handleStateChange}
            handleFileChange={this.handleFileChange}
            currentData={this.state.currentData}
          />
        )}
        <div id="toast-container"></div>
      </div>
    );
  }
}

function FormContest({
  onCancelFunction,
  onSubmitFunction,
  handleStateChange,
  handleFileChange,
  currentData,
}) {
  const handleSubmit = () => {
    const requiredFields = [
      "contest_cnt",
      "contest_name",
      "register_start",
      "register_end",
      "kickoff_start",
      "kickoff_end",
      "terms_info",
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

  const openDatepicker = () => {
    datepickerRef.current.focus();
  };

  return (
    <div className="overlay">
      <div className="form-wrap">
        <div className="contest-subtitle">대회 추가</div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">대회 회차</label>
            <input
              id="contest_cnt"
              className="number-input"
              type="number"
              placeholder="1"
              onChange={(e) =>
                handleStateChange(e, "contest_cnt", e.target.value)
              }
              required
            />
          </div>
          <div className="form-element">
            <label className="required">대회 이름</label>
            <input
              id="contest_name"
              className="text-input"
              type="text"
              placeholder="대회 이름 입력"
              onChange={(e) =>
                handleStateChange(e, "contest_name", e.target.value)
              }
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">대회 접수 시작 날짜</label>
            <input
              id="register_start"
              className="text-input"
              type="datetime-local"
              onChange={(e) =>
                handleStateChange(e, "register_start", e.target.value)
              }
            />
          </div>
          <div className="form-element">
            <label className="required">대회 접수 완료 날짜</label>
            <input
              id="register_end"
              className="text-input"
              type="datetime-local"
              onChange={(e) =>
                handleStateChange(e, "register_end", e.target.value)
              }
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">대회 진행 시작 날짜</label>
            <input
              id="kickoff_start"
              className="text-input"
              type="datetime-local"
              onChange={(e) =>
                handleStateChange(e, "kickoff_start", e.target.value)
              }
            />
          </div>
          <div className="form-element">
            <label className="required">대회 진행 완료 날짜</label>
            <input
              id="kickoff_end"
              className="text-input"
              type="datetime-local"
              onChange={(e) =>
                handleStateChange(e, "kickoff_end", e.target.value)
              }
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-element">
            <label>
              배너 이미지(작은){" "}
              <p className="extension-info">200 x 1000 pixel, .jpg 형식.</p>
            </label>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleStateChange(e, "banner_small", e.target.files[0].name);
                handleFileChange(e, "small");
              }}
            />
          </div>
          <div className="form-element">
            <label>
              배너 이미지(보통){" "}
              <p className="extension-info">200 x 1000 pixel, .jpg 형식</p>
            </label>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleStateChange(e, "banner_mid", e.target.files[0].name);
                handleFileChange(e, "mid");
              }}
            />
          </div>
          <div className="form-element">
            <label>
              배너 이미지(큰){" "}
              <p className="extension-info">200 x 1000 pixel, .jpg 형식</p>
            </label>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleStateChange(e, "banner_large", e.target.files[0].name);
                handleFileChange(e, "large");
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">대회 약관</label>
            <textarea
              id="terms_info"
              placeholder="대회 약관을 입력하세요"
              rows={10}
              cols={50}
              onChange={(e) =>
                handleStateChange(e, "terms_info", e.target.value)
              }
            />
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
