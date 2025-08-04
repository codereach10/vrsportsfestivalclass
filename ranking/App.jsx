class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: {},
      schoolRanking: {},
      selectedApName: null,
      selectedSchoolName: null,
      selectedGroup: "A",
      showLoginPopup: false,
      showDeleteConfirmation: false,
      showEditConfirmation: false,
      showRankingUpdateConfirmation: false,
      password: "",
      error: "",
      isEdit: false,
      isMore: false,
      editingScores: {},
      deletingSeq: null,
      updateDate: null,
      regCount: {},
      // Add pagination state
      currentPage: 1, // Current page number
      itemsPerPage: 20, // Number of items to display per page
    };
  }

  async componentDidMount() {
    this.getUpdateDate();
    this.getCurrentRanking();
    const savedApName = localStorage.getItem("rankingMenu");
    if (savedApName) {
      this.setState({ selectedApName: savedApName });
    }

    this.wstyle = R5.wStyle(`
      #ranking-main {
        display: flex;
        flex-direction: row;
        height: 100vh;
        align-items: flex-start;
        background-color: #FFFFF;
        font-family: "Nanum Gothic", sans-serif;
        overflow-y: scroll;
      }

      .admin-buttons {
        display: flex;
        gap: 20px;
        position: absolute; 
        top: 20px; 
        right: 20px;
      }

      .admin-button {
        background-color:  #1D70F0;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
  
      .admin-button:hover {
        background-color: #145AB3;
      }
  
      .edit-button {
        background-color: #6DC765;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100px;     
        margin-right: 10px; 
        margin-left: auto;
        margin-top: 20px;
        }
  
      .edit-button:hover {
        background-color: #4D8948;
      }

    .side-menu {
      display: flex;
      justify-content: center;
      gap: 20px;
      width: 100%;
}

.side-menu-item {
  cursor: pointer;
  color: #b6b6b6; 
  height: 80px;
  width: 140px;
  line-height: 80px;
  padding: 15px;
  margin: 5px 0;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
  background-image: url('assets/button_off.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.side-menu-item:hover {
  color: #FFFFFF; 
  background-image: url('assets/button_on.png');
}

.side-menu-item.active {
  color: #FFFFFF; 
  background-image: url('assets/button_on.png');
}

/* Style for admin */
.side-menu-item.admin {
  background-image: url('../assets/button_off.png');
}

.side-menu-item.admin:hover {
  background-image: url('../assets/button_on.png');
}

.side-menu-item.admin.active {
  background-image: url('../assets/button_on.png');
}


      .title {
        font-style: normal;
        font-weight: bold;
        font-size: 46px;
        color: #1D70F0;
      }

      .ranking-container {
        display: flex;
        flex-direction: column;
        width: 100%;
     
       
      }

      .ranking-image {
        display: flex;
        flex-direction: column;
        align-items:center;
        margin: 10px 0;
     
      }

      
      .ranking-image  > img:nth-child(1) {
          width: 50%; 
          height: 50%; 
          object-fit: cover;

      }
      


      .ranking-tables {
        display: flex;
        justify-content: center;
        gap: 20px;
        color: #FFFFFF;

      }


      .ranking-header {    
        color: #04317e;
        width: 70%;
        margin: 0 auto;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
        background-image: url('assets/ranking_bar.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
     

      }

      .ranking-body {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        color: #FFF;
        padding: 0px 15px 100px 15px;
        background-color: #edf2f2;
        overflow-y: auto;
        
      }

      .ranking-record {
        display: grid;
        grid-template-columns: 60px 250px 100px 300px auto;  
        height: 30px;
        gap: 20px;
        line-height: 30px;
        background-color: #FFFFFF;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        background-image: url('assets/ranking_list_back.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
               margin-top: 5px;
      
      }


      .ranking-record.admin {
        display: grid;
        grid-template-columns: 60px 250px 100px 100px 300px 100px auto; 
      }

      .ranking-record.more {
       display: grid;
       grid-template-columns: 250px 100px 300px auto;
      }

      .ranking-record-window {
        display: grid;
        grid-template-columns: auto 1fr 1fr 1fr ;  
        height: 50px;
        gap: 20px;
        line-height: 50px;
        background-color: #FFFFFF;
        padding-left: 10px;
        padding-right: 10px;   
    
      }

    
   

      .ranking-center {
       
        text-align:center;
      }

      .ranking-alert {
        height: auto;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        padding:10px  0px;
        color: #FFF;
        font-size: 14px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }

      .heading {
        font-size: 14px;
        color: #FFFF; 
        background: none;
        background-color: #14438e;
        text-align: center;
      }


      .ranking-decor {
        width: 100%;
        height: 40px;
      
        background-image: url('assets/ranking_decor.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
  


      .login-popup {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 350px;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 5px;fod
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        text-align: center;
      }

      .more-popup {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 500;
        text-align: center;
      }


  .edit-input {
  
       padding: 10px;
       background-color: rgba(29, 112, 240, 0.2);
       color: #FFFFFF;
       border:none;
       border-radius: 5px;
       width: 50px;

}

.edit-input:focus {
 outline: #1D70F0 solid;
 }

      .login-popup p {
  
        font-weight: 900;
        font-size: 34px;
      }

      .login-popup input {
   
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .login-button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #1D70F0;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .login-button:hover {
        background-color: #145AB3;
      }

      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 400;
      }

      .popup-buttons {
        display: flex;
        gap: 20px;
        margin-top: 20px;
      }

      .delete-button {
        margin: auto;
        width: 100px;
        height: 40px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #DC4646;
        color: white;
        cursor: pointer;
      }

      .delete-button:hover {
        background-color: #A73636;
      }


      .see-more-button {
       margin: auto;
        width: 100px;
        height: 30px;
    
        padding: 0px 20px;
        border: none;
        border-radius: 5px;
        background-color: #11438e;
        color: white;
        cursor: pointer;
      }


      .cancel-button {  
      width: 100px;
      height: 35px;
      border: 2px solid #1D70F0;
      color: #1D70F0;
      border-radius: 5px;
      background-color: white;
      }
   

      .confirm-button {  
      width: 100px;
        background-color: #1D70F0;
        color: white;
        border: none;
   border-radius: 5px;
      }

      .exit-button {
        position: absolute;
        top: 10px; 
        right: 10px; 
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }

      .top-menu {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-content: center;

   
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;


      }

      .top-menu > button {
      background: none;
      color: #6bade4;
      font-size: 18px;
      font-weight: bold;
      border: none;
      padding: 10px 10px;      
      cursor: pointer;
      }

 
      
      .top-menu > .selected {
     
      color: #19468b;
      text-shadow: 1px 0 0 #FFF,0 1px 0 #FFF,-1px 0 0#FFF,0 -1px 0 #FFF;
      border: none;
    
      padding: 10px 10px;      
      cursor: pointer;
      
      }

      .ranking-spot {
      display: flex;
      justify-content: center;
      font-weight: 900;
      color: #04317e;
      background-repeat: no-repeat;
      background-size: cover;
        
      }

      .buttons-wrapper {
      display:flex;
      gap: 10px;
      }





      }

      .pagination {
          display: flex;
          list-style-type: none;
      }
      
      .pagination-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          border-top: 1px solid rgba(177, 177, 177, 0.10);
    
      }
      
      .pagination li {
          width: 20px;
          height: 20px;
          background: #D7E5FA;
          color: #0B5CD5;
          text-align: center;
         border-radius: 8px;
          padding: 4px;
          margin: 2px;
          cursor: pointer;
      }
      .pagination li:hover {
        background-color: #0B5CD5;
        color: #FFFFFF;
      }
      
      
      .pagination li.activePage {
          background-color: #0B5CD5;
          color: #FFFFFF;
      }
    `);
  }

  componentWillUnmount() {
    if (this.wstyle != null) {
      this.wstyle.destroy();
      this.wstyle = null;
    }
  }

  getCurrentRanking = async () => {
    const isAdmin = this.props.path == "/ranking/admin/";
    try {
      $.ajax({
        type: "GET",
        url: "/api/ranking/read",
        success: (data, status, xhr) => {
          try {
            this.setState({
              regCount: JSON.parse(data).count,
            });
            let categorizedData = {};
            let schoolCategorizedData = {};

            JSON.parse(data).ranking.forEach((entry) => {
              let ap_sn = entry.ranking_ap_sn;
              let school_sc = entry.ranking_school_sc;

              if (!categorizedData[ap_sn]) {
                categorizedData[ap_sn] = [];
              }
              categorizedData[ap_sn].push(entry);

              if (!schoolCategorizedData[school_sc]) {
                schoolCategorizedData[school_sc] = [];
              }
              schoolCategorizedData[school_sc].push(entry);
            });

            Object.keys(categorizedData).forEach((ap_sn) => {
              const result = [];
              const schoolScCounts = {};

              categorizedData[ap_sn].forEach((entry) => {
                const { ranking_school_sc, ranking_score, created_at } = entry;
                const isTimeScore = /^\d+:\d+(.\d+)?$/.test(ranking_score);

                if (!schoolScCounts[ranking_school_sc]) {
                  schoolScCounts[ranking_school_sc] = 0;
                }

                const scoreToCompare = isTimeScore
                  ? ranking_score.split(/[:.]/).reduce((acc, curr, index) => {
                      if (index === 0) return acc + parseInt(curr) * 60; // Minutes to seconds
                      if (index === 1) return acc + parseInt(curr); // Seconds
                      if (index === 2) return acc + parseInt(curr) / 100; // Milliseconds to seconds
                      return acc;
                    }, 0)
                  : parseInt(ranking_score);

                let existingEntryIndex = result.findIndex(
                  (e) => e.ranking_school_sc === ranking_school_sc
                );

                if (existingEntryIndex !== -1) {
                  const existingEntry = result[existingEntryIndex];
                  const existingScore = isTimeScore
                    ? existingEntry.ranking_score
                        .split(/[:.]/)
                        .reduce((acc, curr, index) => {
                          if (index === 0) return acc + parseInt(curr) * 60; // Minutes to seconds
                          if (index === 1) return acc + parseInt(curr); // Seconds
                          if (index === 2) return acc + parseInt(curr) / 100; // Milliseconds to seconds
                          return acc;
                        }, 0)
                    : parseInt(existingEntry.ranking_score);

                  if (
                    (isTimeScore &&
                      scoreToCompare < existingScore &&
                      ((!isAdmin && created_at < this.state.updateDate) ||
                        isAdmin)) ||
                    (!isTimeScore &&
                      scoreToCompare > existingScore &&
                      ((!isAdmin && created_at < this.state.updateDate) ||
                        isAdmin))
                  ) {
                    result[existingEntryIndex] = entry;
                  }
                } else {
                  result.push(entry);
                  schoolScCounts[ranking_school_sc]++;
                }
              });

              result.sort((a, b) => {
                if (/\d+:\d+(.\d+)?$/.test(a.ranking_score)) {
                  const timeA = a.ranking_score
                    .split(/[:.]/)
                    .reduce((acc, curr, index) => {
                      if (index === 0) return acc + parseInt(curr) * 60;
                      if (index === 1) return acc + parseInt(curr);
                      if (index === 2) return acc + parseInt(curr) / 100;
                      return acc;
                    }, 0);
                  const timeB = b.ranking_score
                    .split(/[:.]/)
                    .reduce((acc, curr, index) => {
                      if (index === 0) return acc + parseInt(curr) * 60;
                      if (index === 1) return acc + parseInt(curr);
                      if (index === 2) return acc + parseInt(curr) / 100;
                      return acc;
                    }, 0);
                  return timeA - timeB;
                } else {
                  return (
                    parseFloat(b.ranking_score) - parseFloat(a.ranking_score)
                  );
                }
              });

              categorizedData[ap_sn] = result;
            });

            Object.keys(schoolCategorizedData).forEach((school_sc) => {
              schoolCategorizedData[school_sc].sort(
                (a, b) => parseInt(b.ranking_score) - parseInt(a.ranking_score)
              );
            });

            this.setState({
              ranking: categorizedData,
              schoolRanking: schoolCategorizedData,
            });
          } catch (error) {
            console.error("Error parsing response data!", error);
          }
        },
        error: (xhr, status, error) => {
          console.error("Error loading data!", error);
          this.setState({ error: "데이터 로드 중 오류가 발생했습니다." });
        },
      });
    } catch (error) {
      console.error("Request error!", error);
      this.setState({ error: "요청 중 오류가 발생했습니다." });
    }
  };

  getUpdateDate = async () => {
    try {
      $.ajax({
        type: "GET",
        url: "/api/ranking_admin/read",
        success: (data, status, xhr) => {
          this.setState({
            updateDate: JSON.parse(data).current_confirmed_date,
          });
        },
        error: (xhr, status, error) => {
          console.error("Error loading data!", error);
          this.setState({ error: "데이터 로드 중 오류가 발생했습니다." });
        },
      });
    } catch (error) {
      console.error("Request error!", error);
      this.setState({ error: "요청 중 오류가 발생했습니다." });
    }
  };

  handleApSelection = (apName) => {
    this.setState({ selectedApName: apName, currentPage: 1 });
    localStorage.setItem("rankingMenu", apName);
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLoginSubmit = async () => {
    const { password } = this.state;
    try {
      const response = await $.post("../../login/_login.php", {
        id: "festivaladmin",
        password,
      });

      if (JSON.parse(response).code === 0) {
        this.setState({ showLoginPopup: false, password: "", error: "" });

        window.location.reload();
      } else {
        this.setState({ error: response.message });
      }
    } catch (error) {
      this.setState({ error: "Login failed. Please try again." });
    }
  };

  handleEditToggle = () => {
    if (!this.state.isEdit) {
      const editingScores = {};
      if (this.state.schoolRanking[this.state.selectedSchoolName]) {
        this.state.schoolRanking[this.state.selectedSchoolName]
          .filter(
            (record) => record.ranking_ap_sn === this.state.selectedApName
          )
          .forEach((value) => {
            editingScores[value.seq] = value.ranking_score;
          });
      }
      this.setState({ isEdit: true, editingScores });
    } else {
      // Exiting edit mode
      this.setState({ isEdit: false, editingScores: {} });
    }
  };

  handleMoreToggle = (schoolName) => {
    this.setState((prevState) => ({ isMore: !prevState.isMore }));
    this.setState({ selectedSchoolName: schoolName });
  };

  toggleLoginPopup = () => {
    this.setState((prevState) => ({
      showLoginPopup: !prevState.showLoginPopup,
    }));
  };

  handleLogout = () => {
    $.ajax({
      type: "GET",
      url: "../../login/_logout.php",
      success: (response) => {
        window.location.reload();
      },
    });
  };

  handleDelete = (seq) => {
    this.setState({ showDeleteConfirmation: true, deletingSeq: seq });
  };

  handleConfirmDelete = () => {
    const { deletingSeq } = this.state;
    $.ajax({
      type: "POST",
      url: "../../api/ranking/delete/",
      data: { seq: deletingSeq },
      success: (response) => {
        window.location.reload();
      },
      error: (xhr, status, error) => {
        console.error("Error deleting data!", error);
      },
    });
    this.setState({ showDeleteConfirmation: false });
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteConfirmation: false });
  };

  handleEdit = () => {
    this.setState({ showEditConfirmation: true });
  };

  handleConfirmEdit = () => {
    const updates = Object.entries(this.state.editingScores).map(
      ([id, score]) => ({
        seq: id,
        ranking_score: score.trim() === "" ? null : score,
      })
    );

    $.ajax({
      type: "POST",
      url: "../../api/ranking/edit/",
      data: { updates: updates },
      success: (response) => {
        this.setState({
          isEdit: false,
          editingScores: {},
          showEditConfirmation: false,
        });
        window.location.reload();
      },
      error: (xhr, status, error) => {
        console.error("Error updating data!", error);
      },
    });
  };

  handleCancelEdit = () => {
    this.setState({ showEditConfirmation: false });
  };

  handleScoreChange = (e, id) => {
    const value = e.target.value;
    this.setState((prevState) => ({
      editingScores: {
        ...prevState.editingScores,
        [id]: value,
      },
    }));
  };

  handleGroupSelection = (group) => {
    this.setState({ selectedGroup: group, currentPage:1 });
  };
  updateRanking = () => {
    $.ajax({
      type: "GET",
      url: "../../api/ranking_admin/update/",
      success: (response) => {
        window.location.reload();
      },
      error: (xhr, status, error) => {
        console.error("Error deleting data!", error);
      },
    });
  };

  handleCancelUpdate = () => {
    this.setState({ showRankingUpdateConfirmation: false });
  };

  handleConfirmUpdate = () => {
    this.updateRanking();
    this.setState({ showRankingUpdateConfirmation: false });
  };
  /*
  downloadVideo = async (videoKey) => {
    AWS.config.update({
      accessKeyId: this.props.awsAccessKeyId,
      secretAccessKey: this.props.awsSecretKey,
      region: this.props.awsRegion,
    });

    const s3 = new AWS.S3();
    var contentDisposition = 'attachment; filename="' + videoKey + '".mp4';

    const params = {
      Bucket: "school-festival",
      Key: videoKey,
      ResponseContentDisposition: contentDisposition,
      Expires: 60,
    };

    try {
      const url = s3.getSignedUrl("getObject", params);

      const link = document.createElement("a");
      link.href = url;
      link.download = videoKey;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Download successful");
    } catch (err) {
      console.error("Download error:", err);
      alert("비디오가 존재하지 않습니다");
    }
  };
  */

  downloadVideo = async (videoFileName) => {
    try {
      // 서버 내 업로드 경로: /uploads 폴더에 저장
      const url = '/uploads/'+videoFileName+'.mp4';

      // 다운로드 링크 생성 및 클릭
      const link = document.createElement("a");
      link.href = url;
      link.download = videoFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Download started");
    } catch (err) {
      console.error("Download error:", err);
      alert("비디오가 존재하지 않습니다");
    }
  };
  // Add handlePageChange method
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  Pagination = ({ currentPage, pageSize, totalElements, onPageChange }) => {
    const totalPages = Math.ceil(totalElements / pageSize);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null; // 1페이지일 때 출력 안함 

    return (
      <div className="pagination-wrap">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={currentPage === number ? "activePage" : null}
              onClick={() => onPageChange(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const {
      ranking,
      schoolRanking,
      selectedApName,
      selectedSchoolName,
      selectedGroup,
      showLoginPopup,
      showDeleteConfirmation,
      showEditConfirmation,
      showRankingUpdateConfirmation,
      password,
      error,
      isEdit,
      isMore,
      regCount,
      currentPage, // Get currentPage from state
      itemsPerPage, // Get itemsPerPage from state
    } = this.state;

    const isAdmin = this.props.path == "/ranking/admin/";
    const isLogin = this.props.isLoggedIn;
    const apOrder = ["붐붐 베이스볼", "얼티밋러닝", "농구대잔치","대박터트리기"];

    const adminClass = isAdmin ? "admin" : "";

    // Filter and paginate the ranking data
    const filteredRanking = ranking[selectedApName]
      ? ranking[selectedApName]
        .filter(
          (entry) =>
            entry.school_group === selectedGroup &&
            (!isAdmin ? entry.created_at < this.state.updateDate : true)
        )
      : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRanking.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div id="ranking-main">
        <div className="ranking-container">
          <div className="ranking-image">
            <img
              src={isAdmin ? "../assets/image_top.png" : "assets/image_top.png"}
            />
          </div>
          <div className="side-menu">
            {Object.entries(ranking)
              .sort(
                ([, valueA], [, valueB]) =>
                  apOrder.indexOf(valueA[0].ap_name) -
                  apOrder.indexOf(valueB[0].ap_name)
              )
              .map(([apName, record]) => (
                <div
                  key={apName}
                  className={`${selectedApName === apName ? "active" : ""} side-menu-item ${adminClass}`}
                  onClick={() => this.handleApSelection(apName)}
                >
                  {record[0].ap_name}
                </div>
              ))}
          </div>
          {isAdmin && (
            <div className="admin-buttons">
              <button
                className="admin-button"
                onClick={() => this.setState({ showLoginPopup: true })}
              >
                관리자
              </button>
              {isLogin && isAdmin && (
                <button
                  className="admin-button"
                  onClick={() =>
                    this.setState({ showRankingUpdateConfirmation: true })
                  }
                >
                  랭킹 갱신
                </button>
              )}
            </div>
          )}

          {selectedApName && (
            <div>
              {/* <div
                className="top-menu"
                style={{
                  backgroundImage: isAdmin
                    ? "url(../assets/group_bg.png)"
                    : "url(assets/group_bg.png)",
                }}
              >
                <button
                  className={selectedGroup === "A" ? "selected" : ""}
                  onClick={() => this.handleGroupSelection("A")}
                >
                  Group A
                </button>{" "}
                <button
                  className={selectedGroup === "B" ? "selected" : ""}
                  onClick={() => this.handleGroupSelection("B")}
                >
                  Group B
                </button>
                <button
                  className={selectedGroup === "C" ? "selected" : ""}
                  onClick={() => this.handleGroupSelection("C")}
                >
                  Group C
                </button>{" "}
                <button
                  className={selectedGroup === "D" ? "selected" : ""}
                  onClick={() => this.handleGroupSelection("D")}
                >
                  Group D
                </button>
              </div> */}
              <div
                className="ranking-alert"
                style={{
                  backgroundImage: isAdmin
                    ? "url(../assets/time_bg.png)"
                    : "url(assets/time_bg.png)",
                }}
              >
                - 랭킹 갱신 일정 : 9월 24일(화), 9월 26일(목), 9월 30일(월),
                10월 2일(수), 10월 7일(월), 10월 8일(화) <br />- 최종 순위
                공지일 : 10월 10일(목) <br />※ 랭킹 갱신 일정 및 최종 순위
                공지일은 대회 진행 상황에 따라서 유동적으로 변경될 수 있음.{" "}
                <br />※ 랭킹 갱신 일정 오전에 검수하여 오후 1시를 기준으로
                업데이트 진행
              </div>
              <div
                className="ranking-header"
                style={{
                  backgroundImage: isAdmin
                    ? "url(../assets/ranking_bar.png)"
                    : "url(assets/ranking_bar.png)",
                }}
              >
              {ranking[selectedApName] && ranking[selectedApName][0].ap_name}
              </div>
              <div className="ranking-tables">
                <div className="ranking-table">
                  <div className="ranking-body">
                    <div
                      className={`ranking-record ${isAdmin ? "admin" : ""} heading`}
                    >
                      <div>순위</div>
                      <div>학교명</div>
                      <div className="ranking-center">점수</div>
                      {isAdmin && (
                        <div className="ranking-center">등록 횟수</div>
                      )}
                      <div className="ranking-center">등록 날짜</div>
                      {isAdmin && isLogin && (
                        <div>상태</div>
                      )} 
                      <div></div>
                    </div>
                    {/*ranking[selectedApName] &&
                      ranking[selectedApName]
                        .filter(
                          (entry) =>
                            entry.school_group === selectedGroup &&
                            (!isAdmin
                              ? entry.created_at < this.state.updateDate
                              : true)
                        )*/
                        currentItems
                        .map((value, index) => (
                          <div
                            key={index}
                            className={`ranking-record ${isAdmin ? "admin" : ""}`}
                            style={{
                              backgroundImage: isAdmin
                                ? "url(../assets/ranking_list_back.png)"
                                : "url(assets/ranking_list_back.png)",
                            }}
                          >
                            <div
                              className="ranking-spot"
                              style={{
                                backgroundImage: isAdmin
                                  ? "url(../assets/ranking_list_front.png)"
                                  : "url(assets/ranking_list_front.png)",
                              }}
                            >
                              {indexOfFirstItem + index + 1}
                            </div>
                            <div>{value.school_name}</div>
                            <div className="ranking-center">
                              {/^\d+:\d+(.\d+)?$/.test(value.ranking_score)
                                ? value.ranking_score
                                : parseInt(
                                    value.ranking_score
                                  ).toLocaleString()}
                            </div>
                            {isAdmin && (
                              <div className="ranking-center">
                                {
                                  regCount[value.ranking_school_sc][
                                    value.ranking_ap_sn
                                  ]
                                }
                              </div>
                            )}
                            <div className="ranking-center">
                              {value.created_at}
                            </div>
                            {isAdmin && isLogin && (
                              <div className="ranking-center">
                                {value.status}
                              </div>
                            )}
                            <div className="buttons-wrapper">
                              {isAdmin && isLogin && (
                                <button
                                  className="see-more-button"
                                  onClick={() =>
                                    this.handleMoreToggle(
                                      value.ranking_school_sc
                                    )
                                  }
                                >
                                  더 보기
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                  </div>
                  <div className="ranking-decor"></div>
                </div>
              </div>
            </div>
          )}
          <this.Pagination
          currentPage={currentPage}
          pageSize={itemsPerPage}
          totalElements={filteredRanking.length} // Use the length of filtered data
          onPageChange={this.handlePageChange}
        />
        </div>
        
        {showLoginPopup && (
          <div>
            <div
              className="popup-overlay"
              onClick={this.toggleLoginPopup}
            ></div>
            <div className="login-popup">
              {!isLogin ? (
                <div>
                  <p>관리자 패스워드</p>
                  <b>발급된 관리자 패스워드를 입력해주세요</b>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />
                  {error && <div style={{ color: "red" }}>{error}</div>}
                  <div className="popup-buttons">
                    <button
                      className="login-button"
                      onClick={this.toggleLoginPopup}
                    >
                      취소
                    </button>
                    <button
                      className="login-button"
                      onClick={this.handleLoginSubmit}
                    >
                      확인
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    className="exit-button"
                    onClick={this.toggleLoginPopup}
                  >
                    x
                  </button>

                  <p>로그아웃 하시겠습니까?</p>
                  <button className="login-button" onClick={this.handleLogout}>
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {showDeleteConfirmation && (
          <div>
            <div className="popup-overlay"></div>
            <div className="login-popup">
              <p>랭킹 데이터 삭제</p>
              <b>랭킹 데이터를 삭제 하시겠습니까?</b>
              <b style={{ color: "red" }}>
                [경고] 삭제한 랭킹 데이터는 복구되지 않으니 반드시 확인 후
                삭제해주세요.
              </b>

              <div className="popup-buttons">
                <button
                  className="cancel-button"
                  onClick={this.handleCancelDelete}
                >
                  아니오
                </button>
                <button
                  className="confirm-button"
                  onClick={this.handleConfirmDelete}
                >
                  예
                </button>
              </div>
            </div>
          </div>
        )}

        {isMore && (
          <div>
            <div className="popup-overlay"></div>
            <div className="more-popup">
              <div className="ranking-body">
                <div className="ranking-record more heading">
                  <div>학교명</div>
                  <div className="ranking-center">점수</div>
                  <div className="ranking-center">등록 날짜</div>
                </div>
                {this.state.schoolRanking[selectedSchoolName] &&
                  this.state.schoolRanking[selectedSchoolName]
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )

                    .filter((record) => record.ranking_ap_sn === selectedApName)
                    .map((value, index) => (
                      <div
                        key={index}
                        className="ranking-record-window ranking-record more"
                        style={{
                          backgroundImage: isAdmin
                            ? "url(../assets/ranking_list_back.png)"
                            : "url(assets/ranking_list_back.png)",
                        }}
                      >
                        <div>{value.school_name}</div>
                        <div>
                          {isEdit ? (
                            <input
                              className="edit-input"
                              type="text"
                              value={
                                this.state.editingScores[value.seq]
                                  ? this.state.editingScores[value.seq]
                                  : ""
                              }
                              onChange={(e) =>
                                this.handleScoreChange(e, value.seq)
                              }
                            />
                          ) : (
                            <b className="ranking-center">
                              {/^\d+:\d+(.\d+)?$/.test(value.ranking_score)
                                ? value.ranking_score
                                : parseInt(
                                    value.ranking_score
                                  ).toLocaleString()}
                            </b>
                          )}
                        </div>
                        <div className="ranking-center">
                          <b>{value.created_at}</b>
                        </div>
                        <div className="buttons-wrapper">
                          <button
                            className="see-more-button"
                            onClick={() =>
                              this.downloadVideo(value.ranking_video)
                            }
                          >
                            비디오
                          </button>
                          {isEdit && (
                            <button
                              className="delete-button"
                              onClick={() => this.handleDelete(value.seq)}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                {isLogin && (
                  <button
                    className="edit-button"
                    onClick={isEdit ? this.handleEdit : this.handleEditToggle}
                  >
                    {isEdit ? "편집 완료" : "편집"}
                  </button>
                )}
              </div>
              <button
                className="exit-button"
                onClick={() => {
                  this.handleMoreToggle();
                  this.setState({ isEdit: false });
                }}
              >
                x
              </button>
            </div>
          </div>
        )}

        {showEditConfirmation && (
          <div>
            <div className="popup-overlay"></div>
            <div className="login-popup">
              <p>랭킹 데이터 편집</p>
              <b>변경된 랭킹 데이터를 저장 하시겠습니까?</b>
              <div className="popup-buttons">
                <button
                  className="cancel-button"
                  onClick={this.handleCancelEdit}
                >
                  아니오
                </button>
                <button
                  className="confirm-button"
                  onClick={this.handleConfirmEdit}
                >
                  예
                </button>
              </div>
            </div>
          </div>
        )}

        {showRankingUpdateConfirmation && (
          <div>
            <div className="popup-overlay"></div>
            <div className="login-popup">
              <h1>랭킹 갱신</h1>
              <b>랭킹을 갱신하시겠습니까?</b>
              <div className="popup-buttons">
                <button
                  className="cancel-button"
                  onClick={this.handleCancelUpdate}
                >
                  아니오
                </button>
                <button
                  className="confirm-button"
                  onClick={this.handleConfirmUpdate}
                >
                  예
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
