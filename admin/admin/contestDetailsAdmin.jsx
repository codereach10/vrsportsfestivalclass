class ContestDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contest: null,
      stats: null,
      activeTag: "contest-info",
      isEdit: false,
      schools: null,
      matches: null,
      contents: null,
      searchTerm: null,
      isPopupOpen: false,
      isMatchPopupOpen: false,
    };
  }

  async componentDidMount() {
    const contentId =
      parseInt(this.props.option) ||
      parseInt(JSON.parse(localStorage.getItem("currentContest")));
    this.getOneContest(contentId);
    this.getStats(contentId);
    this.getSchools(contentId);
    this.getMatches(contentId);
    this.getContentList();

    this.wStyle = R5.wStyle(`
    #contest-detail {
      display: flex;
      flex-direction: column;


    }
      .contest-info {
        align-items: center;
      
       border-radius: 8px;
        margin-top: 16px;
        color: #343C6A;
      
        font-family: "Nanum Gothic", sans-serif;
        font-size: 15px;
        padding: 40px;
     
      }

      .title-wrap {
        width: 100%;
        display:flex;
        align-items:center;
      }
      .contest-title {
        color: #0B5CD5;
        font-weight: 900;
        font-size: 18px;
      }

      .indicator-status {
        display: inline-flex;
        align-items: center;
        margin-left: 16px;
        width: max-content;
        text-align: center;
        padding: 2px 10px;
   
    
     

      }
      
      .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 8px; 
       
      }


      .dot.before {
        background-color: #2D97CC;
      }
      
      .dot.during {
        background-color: #097969;
      
      }
      
      .dot.end {
        background-color: #E84848;
   
      }
      
      
      .before {
       color: #2D97CC;
        background: rgb(0, 195, 219, 0.25);     border-radius: 15px;
      }
      
      .during {
        color: #0CA934;
        background: rgb(12, 169, 52, 0.25); border-radius: 15px;
      
      }
      
      .end {
        color: #E84848;
          background: rgb(232, 72, 72, 0.25);
          border-radius: 15px;

   
      }
      

      .tags {
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-top: 32px;
        margin-bottom: 32px;

      }

      .menuTag {
        width: 150px;
        height: 35px;
        border-radius: 8px;
        background-color: #D7E5FA; 
        color: #0B5CD5;
        line-height: 35px;
        cursor: pointer;
        text-align: center;
       
      }
      
      .menuTag.active {
        background-color: #0B5CD5;
        color: #FFFFFF;
 
      }

      .button-wrap {
        display:flex;
        justify-content:end;
      }

        
      .add-button {
        background-color: #0B5CD5;
        color: #FFFFFF;
        border: none;
        border-radius: 8px;
        width: 200px;
        height: 40px;
        cursor:pointer;
      }


      .add-button:hover {
        background-color: #D7E5FA;
        color: #0B5CD5;
      }

      //----------- contest-details ----------------

      .contest-details {
        display: flex;
        flex-direction: column;
        background-color: 

      }

      .basic-data {
        display: flex;
        flex-direction: row;
        justify-content:center;
        gap: 32px;
          background-color: #FFFFFF;
          border: 1px solid rgba(177, 177, 177, 0.10);
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
      }
      
      .detail-element {
        display:flex;
        flex-direction: column;
  
        text-align: center;
        gap: 8px;
        width: 100px;
      
      }


      .terms,   .dashboard-item  {
        margin-top: 16px;
        background-color: #FFFFFF;
          border: 1px solid rgba(177, 177, 177, 0.10);
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
      }

      .terms-text {
        height: 100px;
        padding: 8px;
        overflow-y: auto;
      }



      .dashboard-data {
        display:flex;
        gap: 16px;
        margin: auto;
   

      }

      .dashboard-item {
        width:100px;
        height:70px;
       
      }

      .dash {
        font-size: 48px;
      }
      

      .align-right {
        margin-left: auto;
      }

      .edit-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 25px;
        border-radius: 8px;
        background-color: #0B5CD5;
        color: #FFFFFF;
        line-height: 25px;
        cursor: pointer;
        margin-bottom: 16px;


      }

      .edit-save-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 25px;
        border-radius: 8px;
        background-color: #0B5CD5;   border: 2px solid #0B5CD5;
        color: #FFFFFF;
        line-height: 25px;
        cursor: pointer;
        margin-bottom: 16px;
        padding: 8px 24px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 600;
        white-space: nowrap;

      }

      .edit-cancel-button {


        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 25px;
        border-radius: 8px;
        background-color: #FFFFFF;
        border: 2px solid #0B5CD5;
        color: #0B5CD5;
        line-height: 25px;
        cursor: pointer;
        margin-bottom: 16px;
        padding: 8px 24px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 600;
        white-space: nowrap;
      }

      .edit-button:hover {
        background-color: #D7E5FA;
        color: #0B5CD5;
      }

      .edit-save-button:hover {
        background-color: #D7E5FA;
        color: #0B5CD5;
      }

      .edit-button > img {
        height: 20px;
        width: 20px;
        filter: invert(100%) sepia(100%) saturate(50%) hue-rotate(329deg) brightness(160%) contrast(101%);
      }

      .edit-button:hover >img {
        filter: brightness(0) saturate(100%) invert(21%) sepia(68%) saturate(3688%) hue-rotate(211deg) brightness(92%) contrast(91%);
      }

      .search-wrap{
        display:flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;

      }

      .search-input > input{
        padding: 8px;
        border: none;
        border-bottom: 1px solid #C0BEBE;
      
      }

      .search-input > input:focus {
        border: none;
        border-bottom: 1px solid #0B5CD5;
        outline: none;
        background: rgb(11, 92, 213, 0.1);
        color:#0B5CD5;
      }

      .search-input > button {
        padding: 8px;
        background-color: #0B5CD5;   
        border:none;   
        border-radius:0 4px 4px 0;
        color: #FFFFFF;
        width: 32px;
        height: 32px;
      }


    

      .contest_state_button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 25px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 16px;
        padding: 8px 32px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 600;
        white-space: nowrap;
      }
      .start-contest {
        background-color: #D8FAD7;
        color: #37833b;
       
      }

      .finish-contest {
      
        background-color: #FAD7D7;
        color:#c8372d;

       
      }

      .start-contest:hover {
        background-color: #9EE09E; /* Light green */
        color: #226622; /* Dark green */
        border: 1px solid #226622; /* Dark green */
      }
      
      .finish-contest:hover {
        background-color: #F49F9F; /* Light red */
        color: #8B0000; /* Dark red */
        border: 1px solid #8B0000; /* Dark red */
      }
      



      //---------form --------------


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

      .form-container {
        display:flex;
        flex-direction: column;
        gap: 16px;
        background-color: #FFFFFF;
       border-radius: 8px;
        margin-top: 16px;
        color: #343C6A;
        border: 1px solid rgba(177, 177, 177, 0.10);
        font-family: "Nanum Gothic", sans-serif;
        font-size: 15px;
        padding: 40px;
        box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
        width: 520px;
      }


      .form-row {
        display: flex;
        flex-direction: row;
        gap: 32px;
        width: 100%; 
      }


      .subtitle {
        color: #0B5CD5;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 900;
        font-size: 18px;
        align-self:flex-start;
      }

      .school-search 
 {
    padding: 8px;
    border: none;
    border-bottom: 1px solid #C0BEBE;

  }
  
  .school-search:focus
  {
    border: none;
    border-bottom: 1px solid #0B5CD5;
    outline: none;
    background: rgb(11, 92, 213, 0.1);
    color:#0B5CD5;

  }

      .scrollable-list {
        max-height: 160px; 
        overflow-y: auto; 
      }
      
      .two-column-list {
        column-count: 2;
        column-gap: 20px; /* Adjust the gap between columns as needed */
      }

      li {
        list-style-type: none;
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
      

      .detail-title {    font-family: "Nanum Gothic", sans-serif;
        font-size: 16px;
        color: #B3B3B3;
      }
      
      .detail-input{
        padding: 8px;
        border: none;
        border-bottom: 1px solid #C0BEBE;
        width: 100%;
      }
      
      .detail-input:focus{
        border: none;
        border-bottom: 1px solid #0B5CD5;
        outline: none;
        background-color: rgb(11, 92, 213, 0.1);
        color:#0B5CD5;
    
      }

      input.required-field {
        border: none;
        border-bottom: 1px solid #E54646;
        outline: none;
        background: rgb(227,68,68, 0.1);
      }
    
    

      
   `);
  }

  async getData() {
    const contestId =
      parseInt(this.props.option) ||
      parseInt(JSON.parse(localStorage.getItem("currentContest")));
    try {
      const response = await makeAjaxRequest(
        "POST",
        "/api/contest_schools/read/index.php",
        { contest_id: contestId }
      );

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  getContentList = () => {
    return $.ajax({
      type: "GET",
      url: "/api/content_info/read/index.php",
      success: (response) => {
        this.setState({ contents: JSON.parse(response).content });
      },
    });
  };

  async getOneContest(contestId) {
    const response = await makeAjaxRequest(
      "POST",
      "/api/contest_info/read_single/index.php",
      {
        contest_id: contestId,
      }
    );

    this.setState({ contest: response.contest[0] });
  }

  async getStats(contestId) {
    const response = await makeAjaxRequest("POST", "/api/stats/index.php", {
      contest_id: contestId,
    });

    this.setState({ stats: response });
  }

  async getSchools(contestId) {
    const response = await makeAjaxRequest(
      "POST",
      "/api/contest_schools/read/index.php",
      { contest_id: contestId }
    );

    this.setState({ schools: response.school });
  }

  async getMatches(contestId) {
    const response = await makeAjaxRequest(
      "POST",
      "/api/content_info/read_contest/index.php",
      { contest_id: contestId }
    );

    this.setState({ matches: response.matches });
  }

  handleEditContest = async () => {
    await makeAjaxRequest(
      "POST",
      "/api/contest_info/edit/index.php",
      this.state.contest
    );
  };

  getContentCode(contents, name) {
    const content = Object.values(contents).find(
      (cont) => cont.ap_name === name
    );

    return content.parent_ap_sn;
  }
  handleSaveContestMatch = async (data, index) => {
    const dataToSave = {};

    dataToSave["uid"] = data[index].gs_uid;
    (dataToSave["apSn"] = data[index].ap_name),
      (dataToSave["host"] = data[index].host_name);
    dataToSave["name"] = data[index].gs_name;
    dataToSave["state"] = data[index].gs_state;
    dataToSave["datetime_start"] = data[index].gs_datetime_start;
    dataToSave["pid1_name"] = data[index].pid1_name;
    dataToSave["pid2_name"] = data[index].pid2_name;

    console.log(dataToSave);

    await makeAjaxRequest("POST", "/api/schedule/edit/index.php", dataToSave);

    console.log();
  };

  handleDelete = async (contestId, schoolId) => {
    const response = await makeAjaxRequest(
      "POST",
      "/api/contest_schools/delete_one/index.php",
      {
        contest_id: contestId,
        school_id: schoolId,
      }
    );

    if (response.code == 200) {
      window.location.reload();
    }
  };

  handleTagClick = (menuTag) => {
    this.setState({ activeTag: menuTag });
  };

  handleChangeState = async (contestId, contestState) => {
    const response = await makeAjaxRequest(
      "POST",
      "/api/contest_info/change_state/index.php",
      {
        contest_id: contestId,
        contest_state: contestState,
      }
    );
    if (response.code == 200) {
      window.location.reload();
    }
  };

  renderContentForActiveTag = () => {
    const tableHeaders = {
      seq: "번호",
      school_name: "학교 이름",
      school_sc_code: "학교 코드",
    };

    handleSearchInputChange = (event) => {
      this.setState({ searchTerm: event.target.value });
    };

    handleInputChange = (title, value) => {
      this.setState((prevState) => ({
        contest: {
          ...prevState.contest,
          [title]: value,
        },
      }));
    };

    switch (this.state.activeTag) {
      case "contest-info":
        const DetailElement = ({ title, value, type, change }) => {
          if (this.state.isEdit && type !== "dash") {
            return (
              <div className="detail-element">
                <div className="detail-title">{title}</div>
                {type === "date" ? (
                  <input
                    className="detail-input"
                    type="datetime-local"
                    value={new Date(value).toISOString().slice(0, 16)}
                    onChange={change}
                  />
                ) : (
                  <input
                    className="detail-input"
                    type="text"
                    value={value}
                    onChange={change}
                  />
                )}
              </div>
            );
          } else {
            return (
              <div className="detail-element">
                <div className="detail-title">{title}</div>
                <div className={`detail-value ${type === "dash" && "dash"}`}>
                  {value}
                </div>
              </div>
            );
          }
        };

        return (
          <div className="contest-details">
            <div className="align-right">
              {this.state.isEdit ? (
                <div className="button-wrap">
                  <div
                    className="edit-cancel-button"
                    onClick={() => {
                      this.setState({ isEdit: false }),
                        window.location.reload();
                    }}
                  >
                    취소
                  </div>
                  <div
                    className="edit-save-button"
                    onClick={() => {
                      this.handleEditContest(),
                        this.setState({ isEdit: false });
                    }}
                  >
                    저장
                  </div>
                </div>
              ) : (
                <div
                  className="edit-button"
                  onClick={() => this.setState({ isEdit: true })}
                >
                  <img src="/admin/assets/edit.svg" />
                </div>
              )}
            </div>
            <div className="contest-wrap">
              {this.state.contest && (
                <div className="basic-data">
                  <DetailElement
                    title="번호"
                    value={this.state.contest.contest_id}
                  />
                  <DetailElement
                    title="회차"
                    value={this.state.contest.contest_cnt}
                    change={(e) =>
                      handleInputChange("contest_cnt", e.target.value)
                    }
                  />
                  <DetailElement
                    title="접수 시작일"
                    value={formatDate(this.state.contest.register_start)
                      .split("T")
                      .join("\r\n")}
                    type="date"
                    change={(e) =>
                      handleInputChange("register_start", e.target.value)
                    }
                  />
                  <DetailElement
                    title="접수 종료일"
                    value={formatDate(this.state.contest.register_end)
                      .split("T")
                      .join("\r\n")}
                    type="date"
                    change={(e) =>
                      handleInputChange("register_end", e.target.value)
                    }
                  />
                  <DetailElement
                    title="대회 시작일"
                    value={formatDate(this.state.contest.kickoff_start)
                      .split("T")
                      .join("\r\n")}
                    type="date"
                    change={(e) =>
                      handleInputChange("kickoff_start", e.target.value)
                    }
                  />
                  <DetailElement
                    title="대회 종료일"
                    value={formatDate(this.state.contest.kickoff_end)
                      .split("T")
                      .join("\r\n")}
                    type="date"
                    change={(e) =>
                      handleInputChange("kickoff_end", e.target.value)
                    }
                  />

                  <div className="state-button">
                    {this.state.contest &&
                    this.state.contest.contest_state == "0" ? (
                      <div
                        className="contest_state_button start-contest"
                        onClick={(e) =>
                          this.handleChangeState(
                            this.state.contest.contest_id,
                            1
                          )
                        }
                      >
                        대회 시작
                      </div>
                    ) : this.state.contest &&
                      this.state.contest.contest_state == "1" ? (
                      <div
                        className="contest_state_button finish-contest"
                        onClick={(e) =>
                          this.handleChangeState(
                            this.state.contest.contest_id,
                            2
                          )
                        }
                      >
                        대회 종료
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              <div className="terms">
                <div className="detail-title">대회 약관</div>
                {this.state.isEdit ? (
                  <textarea
                    className="detail-input"
                    value={this.state.contest && this.state.contest.terms_info}
                    onChange={(e) =>
                      handleInputChange("terms_info", e.target.value)
                    }
                  />
                ) : (
                  <div className="terms-text">
                    {this.state.contest && this.state.contest.terms_info}
                  </div>
                )}
              </div>
              {this.state.stats && (
                <div className="dashboard-data">
                  <div className="dashboard-item">
                    <DetailElement
                      title="참가 학교"
                      value={this.state.stats.count_schools}
                      type="dash"
                    />
                  </div>
                  <div className="dashboard-item">
                    <DetailElement
                      title="전체 경기"
                      value={this.state.stats.count_match}
                      type="dash"
                    />
                  </div>
                  <div className="dashboard-item">
                    <DetailElement
                      title="남은 경기"
                      value={this.state.stats.count_match_left}
                      type="dash"
                    />
                  </div>
                  <div className="dashboard-item">
                    <DetailElement
                      title="종료 경기"
                      value={this.state.stats.count_match_over}
                      type="dash"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "game":
        const matchHeaders = {
          gs_uid: "번호",
          ap_name: "콘텐츠 이름",
          gs_name: "경기 이름",
          gs_datetime_start: "경기 시작 시간",
          gs_players: "프레이어",
          gs_state: "경기 상태",
        };

        const contestId =
          parseInt(this.props.option) ||
          parseInt(JSON.parse(localStorage.getItem("currentContest")));
        return (
          <div>
            <div className="button-wrap">
              <button
                className="add-button"
                onClick={() => this.setState({ isMatchPopupOpen: true })}
              >
                경기 추가
              </button>
            </div>

            <DataTable
              current={this.state.matches}
              headers={matchHeaders}
              handlerFunct={this.handleSaveContestMatch}
              showEditIcon={true}
              showResetIcon={true}
              title=""
            />

            {this.state.isMatchPopupOpen && (
              <FormContestMatches
                contents={this.state.contents}
                schools={this.state.schools}
                contentId={contestId}
                closeFunct={() => this.setState({ isMatchPopupOpen: false })}
              />
            )}
          </div>
        );
      case "schools":
        const filteredSchools = this.state.searchTerm
          ? Object.values(this.state.schools).filter((school) =>
              school["school_name"].includes(this.state.searchTerm)
            )
          : this.state.schools;

        const contentId =
          parseInt(this.props.option) ||
          parseInt(JSON.parse(localStorage.getItem("currentContest")));
        return (
          <div>
            <div className="search-wrap">
              <div className="search-input">
                <input
                  type="text"
                  className="search-term"
                  placeholder="학교이름"
                  value={this.state.searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>{" "}
              <div className="button-wrap">
                <button
                  className="add-button"
                  onClick={() => this.setState({ isPopupOpen: true })}
                >
                  학교 추가
                </button>
              </div>
            </div>

            <DataTable
              current={filteredSchools}
              headers={tableHeaders}
              title=""
              showDeleteIcon={true}
              handleDelete={this.handleDelete}
            />

            {this.state.isPopupOpen && (
              <FormContestSchools
                chosenSchools={this.state.schools}
                contentId={contentId}
                closeFunct={() => this.setState({ isPopupOpen: false })}
              />
            )}
          </div>
        );
      default:
        return "";
    }
  };

  renderColorIndicator(state) {
    let indicatorColor, indicatorText;
    switch (state) {
      case "0":
        indicatorColor = "before";
        indicatorText = "진행전";
        break;
      case "1":
        indicatorColor = "during";
        indicatorText = "진행중";
        break;
      case "2":
        indicatorColor = "end";
        indicatorText = "종료";
        break;
      default:
        indicatorColor = "black";
        indicatorText = "Unknown";
    }
    return (
      <span className={`indicator-status ${indicatorColor}`}>
        {indicatorText} <span className={`dot ${indicatorColor}`}></span>
      </span>
    );
  }

  render() {
    return (
      <div id="contest-detail">
        <div className="contest-info">
          <div className="title-wrap">
            <div className="contest-title">
              {this.state.contest && this.state.contest.contest_name}
            </div>{" "}
            {this.state.contest &&
              this.renderColorIndicator(this.state.contest.contest_state)}
          </div>

          <div className="tags">
            <div
              className={`menuTag ${
                this.state.activeTag === "contest-info" ? "active" : ""
              }`}
              onClick={() => this.handleTagClick("contest-info")}
            >
              대회 정보
            </div>
            <div
              className={`menuTag ${
                this.state.activeTag === "game" ? "active" : ""
              }`}
              onClick={() => this.handleTagClick("game")}
            >
              경기
            </div>
            <div
              className={`menuTag ${
                this.state.activeTag === "schools" ? "active" : ""
              }`}
              onClick={() => this.handleTagClick("schools")}
            >
              참가 학교
            </div>
          </div>

          <div className="main-content">{this.renderContentForActiveTag()}</div>
        </div>
      </div>
    );
  }
}

class FormContestSchools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      searchQuery: "",
      checkedSchools: [],
      newSchools: [],
      deleteSchools: [],
    };
  }

  async componentDidMount() {
    try {
      const data = await makeAjaxRequest(
        "GET",
        "/api/school_info/read/index.php"
      );

      this.setState({
        schools: data.school,
        checkedSchools: this.props.chosenSchools,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async addNewSchools(contest_id, schools) {
    console.log(schools);
    try {
      await makeAjaxRequest("POST", "/api/contest_schools/add/index.php", {
        contest_id: contest_id,
        school_ids: schools,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async deleteSchools(contest_id, delSchool) {
    try {
      const response = await makeAjaxRequest(
        "POST",
        "/api/contest_schools/delete/index.php",
        { contest_id: contest_id, school_ids: delSchool }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  cancel() {
    this.props.closeFunct();
  }

  savingInProgress = false;

  async save(contestId) {
    if (this.savingInProgress) {
      return;
    }

    try {
      this.savingInProgress = true;
      await this.addNewSchools(contestId, this.state.newSchools);
      await this.deleteSchools(contestId, this.state.deleteSchools);
      this.props.closeFunct();
      window.location.reload();
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      this.savingInProgress = false;
    }
  }

  render() {
    const filteredSchools = this.state.schools.filter((school) =>
      school.school_name.includes(this.state.searchQuery)
    );

    handleChangeCheckbox = (schoolId, isChecked) => {
      const { checkedSchools, newSchools, deleteSchools, schools } = this.state;

      let updatedCheckedSchools = [...checkedSchools];

      if (isChecked) {
        const schoolToAdd = schools.find(
          (school) => school.school_pid === schoolId
        );

        const newSchool = { school_id: schoolToAdd.school_pid };
        updatedCheckedSchools.push(newSchool);

        if (!newSchools.includes(schoolId)) {
          this.setState((prevState) => ({
            newSchools: [...prevState.newSchools, schoolId],
          }));
        }
        if (deleteSchools.includes(schoolId)) {
          this.setState((prevState) => ({
            deleteSchools: prevState.deleteSchools.filter(
              (id) => id !== schoolId
            ),
          }));
        }
      } else {
        updatedCheckedSchools = updatedCheckedSchools.filter(
          (school) => school.school_id !== schoolId
        );

        if (newSchools.includes(schoolId)) {
          this.setState((prevState) => ({
            newSchools: prevState.newSchools.filter((id) => id !== schoolId),
          }));
        }
        if (!deleteSchools.includes(schoolId)) {
          this.setState((prevState) => ({
            deleteSchools: [...prevState.deleteSchools, schoolId],
          }));
        }
      }

      this.setState({ checkedSchools: updatedCheckedSchools });
    };

    return (
      <div className="overlay">
        <div className="form-container">
          <h2 className="subtitle">참가 학교 추가</h2>
          <input
            type="text"
            className="school-search"
            placeholder="학교 이름 검색"
            value={this.state.searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />
          <p>{Object.keys(this.state.checkedSchools).length}개 선택됨 </p>
          <div className="school-list">
            <div className="scrollable-list">
              <ul className="two-column-list">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <li key={school.school_pid}>
                      <label>
                        <input
                          type="checkbox"
                          value={school.school_pid}
                          checked={this.state.checkedSchools.some(
                            (c) => c.school_id === school.school_pid
                          )}
                          onChange={(e) =>
                            handleChangeCheckbox(
                              school.school_pid,
                              e.target.checked
                            )
                          }
                        />
                        {school.school_name}
                      </label>
                    </li>
                  ))
                ) : (
                  <div>학교 전재하지 않습니다...</div>
                )}
              </ul>
            </div>
          </div>

          <div className="button-wrap">
            <button className="cancel-button" onClick={() => this.cancel()}>
              취소
            </button>
            <button
              className="save-button"
              onClick={() => this.save(this.props.contentId)}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class FormContestMatches extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      match: [],
    };
  }

  handleStateChange = (e, key, value) => {
    this.setState((prevState) => ({
      match: {
        ...prevState.match,
        [key]: value,
      },
    }));

    e.target.classList.remove("required-fields");
  };

  getSchoolPidByName(schools, name) {
    const school = Object.values(schools).find(
      (school) => school.school_name == name
    );

    return school.school_id;
  }

  getSchoolCodeByName(schools, name) {
    const school = Object.values(schools).find(
      (school) => school.school_name == name
    );

    return school.school_sc_code;
  }

  getContentCode(contents, name) {
    const content = Object.values(contents).find(
      (cont) => cont.ap_name === name
    );

    return content.ap_sn;
  }
  async addNewMatch(contest_id, matches) {
    const data = {
      gs_contestID: contest_id,
      gs_apSn: this.getContentCode(this.props.contents, matches.gs_apSn),
      gs_scCode: this.getSchoolCodeByName(
        this.props.schools,
        matches.gs_scCode
      ),
      gs_pid1: this.getSchoolPidByName(this.props.schools, matches.gs_pid1),
      gs_pid2: this.getSchoolPidByName(this.props.schools, matches.gs_pid2),
      gs_name: matches.gs_name,
      gs_round: matches.gs_round,
      gs_num: matches.gs_num,
      gs_datetime_start: matches.gs_datetime_start,
      gs_datetime_end: matches.gs_datetime_end,
    };

    try {
      await makeAjaxRequest("POST", "/api/schedule/create/index.php", data);

      this.props.closeFunct();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { contents, schools } = this.props;

    const renderSelect = (key, options) => (
      <select
        className="edit-input"
        id={key}
        onChange={(e) => this.handleStateChange(e, key, e.target.value)}
      >
        <option value="" disabled selected>
          선택
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );

    const renderTextInput = (key, isDisabled = false) => (
      <input
        className="text-input"
        type="text"
        id={key}
        onChange={(e) => this.handleStateChange(e, key, e.target.value)}
        required
        disabled={isDisabled}
      />
    );

    const renderDateTimeInput = (key) => (
      <input
        type="datetime-local"
        id={key}
        onChange={(e) => this.handleStateChange(e, key, e.target.value)}
        required
      />
    );

    const handleSave = async () => {
      const requiredFields = [
        "gs_apSn",
        "gs_scCode",
        "gs_pid1",
        "gs_pid2",
        "gs_name",
        "gs_round",
        "gs_num",
        "gs_datetime_start",
        "gs_datetime_end",
      ];
      const emptyFields = requiredFields.filter(
        (field) => !this.state.match[field]
      );

      if (emptyFields.length > 0) {
        emptyFields.forEach((field) => {
          const element = document.getElementById(field);
          if (element) {
            element.classList.add("required-field");
          }
        });
      } else {
        await this.addNewMatch(this.props.contentId, this.state.match);
        //  window.location.reload();
      }
    };

    return (
      <div className="overlay">
        <div className="form-container">
          <h2 className="subtitle">경기 추가</h2>
          <div className="form-row">
            <div className="form-element">
              <label className="required">콘텐츠</label>
              {renderSelect(
                "gs_apSn",
                contents.map((content) => content.ap_name)
              )}
            </div>

            <div className="form-element">
              <label className="required">호스트</label>
              {renderSelect(
                "gs_scCode",
                schools
                  .filter((school) => school.host == 1)
                  .map((school) => school.school_name)
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-element">
              <label className="required">프레이어 1</label>
              {renderSelect(
                "gs_pid1",
                schools
                  .filter((school) => school.host == 0)
                  .map((school) => school.school_name)
              )}
            </div>
            <div className="form-element">
              <label className="required">프레이어 2</label>
              {renderSelect(
                "gs_pid2",
                schools
                  .filter((school) => school.host == 0)
                  .map((school) => school.school_name)
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-element">
              <label className="required">경기 이름</label>
              {renderTextInput("gs_name")}
            </div>
            <div className="form-element">
              <label className="required">라운드</label>
              {renderTextInput("gs_round")}
            </div>
            <div className="form-element">
              <label className="required"> 회차</label>
              {renderTextInput("gs_num")}
            </div>
          </div>
          <div className="form-row">
            <div className="form-element">
              <label className="required">시작 날짜</label>
              {renderDateTimeInput("gs_datetime_start")}
            </div>
            <div className="form-element">
              <label className="required">종료 날짜</label>
              {renderDateTimeInput("gs_datetime_end")}
            </div>
          </div>

          <div className="button-wrap">
            <div
              className="cancel-button"
              onClick={() => this.props.closeFunct()}
            >
              취소
            </div>
            <button className="save-button" onClick={() => handleSave()}>
              저장
            </button>
          </div>
        </div>{" "}
      </div>
    );
  }
}
