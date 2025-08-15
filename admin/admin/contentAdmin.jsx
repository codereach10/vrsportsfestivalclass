class ContentAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentContent: null,
    isAddContent: false,
    currentData: {},
  };

  wstyle = null;
  async componentDidMount() {
    this.getCurrentContent();

    this.wstyle = R5.wStyle(` 

    #content-wrap {
      display: flex;
      flex-direction: column;
      padding: 40px;
      font-family: "Nanum Gothic", sans-serif;
  }
  
  .content-content {
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
    margin-top: 20px;
  }

  .add-button:hover {
    background-color: #D7E5FA;
    color: #0B5CD5;
  }

    //------form ------


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
    .content-subtitle {
    
        color: #0B5CD5;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 900;
        font-size: 18px;

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
      url: "/api/content_info/read/index.php",
    });
  }

  async getCurrentContent() {
    try {
      const res = await this.getData();
      let content = JSON.parse(res).content;

      this.setState({ currentContent: { ...content } });
    } catch (err) {
      console.log(err);
    }
  }

  handleSaveContent = (data, index) => {
    return $.ajax({
      type: "POST",
      url: "/api/content_info/edit/index.php",
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

  handleAddContent = (data) => {
    return $.ajax({
      type: "POST",
      url: "/api/content_info/create/index.php",
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
    this.setState((prevState) => ({
      currentData: {
        ...prevState.currentData,
        [key]: newValue,
      },
    }));

    e.target.classList.remove("required-fields");
  };
   handleDelete = async (contestId,schoolId,seq) => {
    console.log("contestId:"+contestId);
    console.log("schoolId:"+schoolId);
    console.log("seq:"+seq);
    const response = await makeAjaxRequest(
      "POST",
      "/api/content_info/delete_one/index.php",
      {
        ap_sn: seq,
      }
    );

    if (response.code == 200) {
      window.location.reload();
    }
  };
  render() {
    const tableHeaders = {
      ap_sn: "콘텐츠 코드",
      parent_ap_sn: "상위 콘텐츠 코드",
      ap_name: "콘텐츠명",
      ap_intro: "콘텐츠 소개",
      ap_guide: " 플레이 방법",
      ap_rule: "경기 규정",
    };

    return (
      <div id="content-wrap">
        <div className="content-content">
          <div className="button-wrap">
            {!this.state.isAddContent && (
              <button
                className="add-button"
                onClick={() => this.setState({ isAddContent: true })}
              >
                콘텐츠 추가
              </button>
            )}
          </div>
          <div>
            <DataTable
              current={this.state.currentContent}
              headers={tableHeaders}
              handlerFunct={this.handleSaveContent}
              title="콘텐츠 정보 테이블"
              showEditIcon={true}
              showDeleteIcon={true}
              handleDelete={this.handleDelete}
            />

            {this.state.isAddContent && (
              <div>
                <FormContent
                  onCancelFunction={() =>
                    this.setState({ isAddContent: false })
                  }
                  onSubmitFunction={this.handleAddContent}
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

function FormContent({
  onCancelFunction,
  onSubmitFunction,
  handleStateChange,
  currentData,
}) {
  const handleSubmit = () => {
    const requiredFields = ["ap_sn","parent_ap_sn", "ap_name", "ap_intro", "ap_guide", "ap_rule"];
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
        <div className="content-subtitle">콘텐츠 추가</div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">콘텐츠 코드</label>
            <input
              id="ap_sn"
              className="number-input"
              type="number"
              placeholder="1111"
              onChange={(e) => {
                handleStateChange(e, "ap_sn", e.target.value);
              }}
            />
          </div>
          <div className="form-element">
            <label className="required">상위 콘텐츠 코드</label>
            <input
              id="parent_ap_sn"
              className="number-input"
              type="number"
              placeholder="1111"
              onChange={(e) => {
                handleStateChange(e, "parent_ap_sn", e.target.value);
              }}
            />
          </div>
          <div className="form-element">
            <label className="required">콘텐츠명</label>
            <input
              id="ap_name"
              className="text-input"
              type="text"
              placeholder="콘텐츠 이름 입력"
              onChange={(e) => {
                handleStateChange(e, "ap_name", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-row">  
          <div className="form-element">
            <label className="required">콘텐츠 소개 </label>
            <input
              id="ap_intro"
              className="text-input"
              type="text"
              placeholder="콘텐츠 소개 입력"
              onChange={(e) => {
                handleStateChange(e, "ap_intro", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-element">
            <label className="required">콘텐츠 플레이 방법 </label>
            <input
              id="ap_guide"
              className="text-input"
              type="text"
              placeholder="콘텐츠 플레이 방법 입력"
              onChange={(e) => {
                handleStateChange(e, "ap_guide", e.target.value);
              }}
            />
          </div>

          <div className="form-element">
            <label className="required">콘텐츠 경기 규정 </label>
            <input
              id="ap_rule"
              className="text-input"
              type="text"
              placeholder="콘텐츠 콘텐츠 경기 규정 입력"
              onChange={(e) => {
                handleStateChange(e, "ap_rule", e.target.value);
              }}
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
