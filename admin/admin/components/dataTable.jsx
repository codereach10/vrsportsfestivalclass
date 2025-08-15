class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editModes: [],
      currentPage: 1,
      pageSize: 5,
      currentData: {},
      schools: null,
      contents: null,
      admins: null,
      isEditing: false,
      editedRowIdx: null,

      sortBy: null,
      sortDirection: null,
      
      showDeletePopup: false,
      deleteRowIndex: null,
      deleteContestId: null,
      deleteSchoolId: null,
      deleteAdminId: null,
      deleteContentId: null,
    };
  }

  componentDidMount() {
    this.getSchoolList();
    this.getContentList();
    this.getAdminList();
    this.wstyle = R5.wStyle(`
        #table-wrap {
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
  
        
    .contest-subtitle { 
      color: #0B5CD5;
      font-family: "Nanum Gothic", sans-serif;
      font-weight: 900;
      font-size: 18px;
      margin-bottom:32px;
      align-self:flex-start;

    
  }
  
  
  table {
    border-collapse: collapse;
    width: 95%;
    background: #D7E5FA;
    border-radius: 8px;
  }
  
  
  

      
      .table-header {
          height: 48px;
          width: 100%;
          font-family: "Inter",sans-serif; 
          color: #0B5CD5;
          
      }
      
      .table-header th {
          text-align: left;
          padding: 12px;
          padding-right: 48px;
          font-weight: 600;
          white-space: nowrap;
  
      }


      tr {
        min-height: 48px;     
        padding: 16px;
    
      
      }


      .clickable-row:hover {
        cursor: pointer;
        outline:2px solid #D7E5FA;
        
      }

  
      td {
     
          padding: 16px;
      }
      
      .table-data {
    
          text-align: left;
          minHeight: 48px;
        
      }
      
      tbody {
          border-top: 1px solid rgba(177, 177, 177, 0.10);
   
      }
      
    
      .edit-button {
          width: 24px;
          height: 24px;
          padding: 8px 24px;
  
          cursor: pointer;
      }
      
      .edit-window-overlay {
        display: flex;
        justify-content: flex-end; 
        align-items:center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999; 
      }
      
      .edit-window {
        width: 450px; 
        height: 80%;
        overflow-y: auto;
        background-color: #FFFFFF;
        padding: 56px;
        box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
        transition: margin-right 0.3s ease; 
        margin-right: 48px;
        border-radius: 8px;
      }
      
  
    .nodata-info {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
      height: 200px;
      background-color: #FFFFFF;
      color: #B3B3B3;


    }

    .empty-icon {
      width: 70px;
    }
    .icon {
      width:24px;
      height:24px;
      cursor: pointer;
    }
   
  
    .static-field {
      padding: 4px;
      minHeight: 46px;
      width: 100%;
      font-size: 15px;
    }
    
      textarea {
      resize: none; 
      width: 100%;
      padding: 8px;
      overflow: hidden; 
    
      }
      
      .button-wrap {
        display: flex;
        gap: 4px;
      }
      
      .edit-cell {
          padding: 16px;
          width: 200px;
      }
    
      .tag {
          border-radius: 15px;
          width: 100px;
          text-align: center;
          padding: 5px 0;
      }
      
      .before {
          color: #2D97CC;
          background: rgb(0, 195, 219, 0.25);
      }
      
      .ready {
          color: #FFAA04;
          background: rgb(236, 215, 0, 0.25);
      }
      
      .during {
          color: #0CA934;
          background: rgb(12, 169, 52, 0.25);
      }
      
      .end {
          color: #E84848;
          background: rgb(232, 72, 72, 0.25);
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
      
      .versus {
          font-weight: bold;
          width: max-content;
      }
    
      .school-name {
        font-weight: bold;
      }
    
      .school-code {
   color: #B1B1B1;
        font-size: 12px;
      }
  
  
      .even-row {
        background-color: #ffffff; 
      }
      
      .odd-row {
        background-color: #F2F7FF; 
  
      }



      

      //------- form -------
      .form-element {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 8px;
        margin-bottom:32px;
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



      select {
          height: 48px;
          outline: none;
          border:none;
          border-bottom: 1px solid #C0BEBE;
      }


      .edit-button-wrap{
        display:flex;
        justify-content:end;
        gap: 16px;
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
        background-color: #3f73ff;
      }
      

      //----search dropdown ----

      .section {
        margin: 0 auto;
        padding: 5rem 0 2rem;
     }

     .columns-wrapper {
      max-width: 75rem;
      height: auto;
      margin: 0 auto;
      padding: 0 1.25rem;
   }

   .form-group {
    position: relative;
}

.dropdown {
    position: relative;
}

dropdown-select {
    position: relative;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    cursor: pointer;
    user-select: none;
    width: 100%;
    height: auto;
    padding: 0.75rem 1.25rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    color: var(--color-black);
    background-clip: padding-box;
    background-color: var(--color-white);
    box-shadow: var(--shadow-medium);
    transition: all 0.3s ease-in-out;
}

dropdown-menu {
    position: absolute;
    display: none;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 10;
    border-radius: 0.25rem;
    background-color: var(--color-white);
    box-shadow: var(--shadow-large);
    transition: all 0.3s ease-in-out;
}

dropdown-menu dropdown-inner {
    max-height: 16rem;
    overflow-y: scroll;
    overflow-x: hidden;
}

dropdown-menu::-webkit-scrollbar {
    width: 5px;
    height: auto;
}

dropdown-menu::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background-color: var(--color-greys);
    box-shadow: var(--shadow-small);
}

dropdown-menu dropdown-item {
    font-family: inherit;
    font-size: 1rem;
    font-weight: normal;
    line-height: inherit;
    cursor: pointer;
    user-select: none;
    padding: 0.65rem 1.25rem;
    background-color: var(--color-white);
    transition: all 0.2s ease-in-out;
}

dropdown-menu dropdown-item:hover {
    color: var(--color-black);
    background-color: var(--color-greys);
}

dropdown-menu dropdown-item.is-select,
dropdown-menu dropdown-item.is-select:hover {
    color: var(--color-white);
    background-color: var(--color-blues);
}

dropdown-menu form-search {
    display: block;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    width: 100%;
    height: auto;
    padding: 0.65rem 1.25rem;
    border: none;
    outline: none;
    color: var(--color-black);
    background-clip: padding-box;
    background-color: var(--color-light);
}

   
//------- custom drop down search --


 

        `);
  }

  toggleEditMode = (index) => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      editedRowIdx: index,
    }));
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleSort = (column) => {
    this.setState(
      (prevState) => {
        let sortDirection = "asc";

        if (prevState.sortBy === column) {
          sortDirection = prevState.sortDirection === "asc" ? "desc" : null;
        }

        return {
          sortBy: column,
          sortDirection: sortDirection,
        };
      },
      () => {
        if (this.state.sortBy === column && this.state.sortDirection === null) {
          this.setState({
            sortBy: null,
            sortDirection: null,
          });
        }
      }
    );
  };

  getSchoolList = () => {
    return $.ajax({
      type: "GET",
      url: "/api/school_info/read/index.php",
      success: (response) => {
        this.setState({ schools: JSON.parse(response).school });
      },
      error: (xhr, status, error) => {
        console.error("Error fetching school list:", error);
      },
    });
  };

  getContentList = () => {
    return $.ajax({
      type: "GET",
      url: "/api/content_info/read/index.php",
      success: (response) => {
        this.setState({ contents: JSON.parse(response).content });
      },
      error: (xhr, status, error) => {
        console.error("Error fetching content list:", error);
      },
    });
  };

  getAdminList = () => {
    return $.ajax({   
      type: "GET",
      url: "/api/admin/read/index.php",
      success: (response) => {
        this.setState({ admins: JSON.parse(response).admin });
      },
      error: (xhr, status, error) => {
        console.error("Error fetching admin list:", error);
      },
    });
  };

  handleDeleteClick = (idx) => {
    const { current } = this.props;
    const rowToDelete = current[idx];

    const { contest_id, school_id, school_pid, seq , ap_sn } = rowToDelete;

    this.setState({
      showDeletePopup: true,
      deleteRowIndex: idx,
      deleteContestId: contest_id,
      deleteSchoolId: school_id|school_pid,
      deleteAdminId: seq,
      deleteContentId: ap_sn
    });
  };

  render() {
    const { currentPage, pageSize, isEditing, editedRowIdx } = this.state;
    const { headers, current } = this.props;
    const indexOfLastElement = currentPage * pageSize;
    const indexOfFirstElement = indexOfLastElement - pageSize;

    const filteredContests = {};

    if (current) {
      Object.keys(current).forEach((contestKey) => {
        const contest = current[contestKey];
        const filteredContest = {};
        Object.keys(contest).forEach((header) => {
          if (header == "pid1_name" || header == "pid2_name") {
            if (!filteredContest["gs_players"]) {
              filteredContest["gs_players"] = [];
            }
            filteredContest["gs_players"].push(contest[header]);
          } else if (header == "host_name") {
            filteredContest["host_name"] = contest[header];
          }
          if (headers.hasOwnProperty(header)) {
            filteredContest[header] = contest[header];
          }
        });
        filteredContests[contestKey] = filteredContest;
      });
    }

    let sortedData = filteredContests ? Object.values(filteredContests) : [];

    if (this.state.sortBy) {
      sortedData.sort((a, b) => {
        const valueA = a[this.state.sortBy];
        const valueB = b[this.state.sortBy];

        const dateA = new Date(valueA * 1000);
        const dateB = new Date(valueB * 1000);

        if (!isNaN(dateA) && !isNaN(dateB)) {
          return this.state.sortDirection === "asc"
            ? dateA - dateB
            : dateB - dateA;
        } else {
          return this.state.sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
      });
    }

    return (
      <div id="table-wrap">
        <div className="contest-subtitle">{this.props.title}</div>
        {sortedData && sortedData.length > 0 ? (
          <table>
            <thead>
              <tr className="table-header">
                {Object.entries(headers).map(([column, header], index) => (
                  <th key={index} onClick={() => this.handleSort(column)}>
                    {header}
                    {this.state.sortBy === column && (
                      <span>
                        {this.state.sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                    {this.state.sortBy !== column && <span>▶</span>}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedData
                .slice(indexOfFirstElement, indexOfLastElement)
                .map((element, idx) => (
                  <DataRow
                    key={idx}
                    element={element}
                    idx={idx}
                    handleEdit={this.toggleEditMode}
                    tableName={this.props.title}
                    navigationFunc={this.props.navigationFunct}
                    showDeleteIcon={this.props.showDeleteIcon}
                    showEditIcon={
                      this.props.showEditIcon &&
                      (element.hasOwnProperty("gs_state")
                        ? element.gs_state === "0"
                        : true)
                    }
                    showResetIcon={this.props.showResetIcon}
                    handleDeleteClick={() => 
                      this.handleDeleteClick(indexOfFirstElement + idx)
                    }
                  />
                ))}
            </tbody>
          </table>
        ) : (
          <div className="nodata-info">
            <img
              src="/admin/assets/empty.svg"
              className="empty-icon"
              alt="nodata"
            />
            데이터 없음
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalElements={current ? Object.values(current).length : 0}
          onPageChange={this.handlePageChange}
        />

        {isEditing && (
          <EditWindow
            element={current[(currentPage - 1) * 5 + editedRowIdx]} //Elements
            onCancel={() => this.toggleEditMode(null)}
            onSave={() => {
              this.props.handlerFunct(
                this.props.current,
                (currentPage - 1) * 5 + editedRowIdx,
                currentPage
              );
              this.toggleEditMode(null);
            }}
            isEditing={isEditing}
            schools={this.state.schools}
            contents={this.state.contents}
            currentPage={currentPage}
          />
        )}
        {this.state.showDeletePopup && (
          <DeleteConfirmationPopup
            onCancel={() => this.setState({ showDeletePopup: false })}
            onDelete={() =>
              this.props.handleDelete(
                this.state.deleteContestId,
                this.state.deleteSchoolId,
                this.state.deleteAdminId||this.state.deleteContentId
              )
            }
          />
        )}
      </div>
    );
  }
}

function getSchoolByName(schools, name) {
  const school = Object.values(schools).find(
    (school) => school.school_name === name
  );

  return school;
}

function formatDate(value, timezoneOffset = 0) {
  // Validate the input date format
  const isValidDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value);
  if (isValidDateFormat) {
    return value;
  }

  // Convert Unix timestamp to Date object
  const date = new Date(value * 1000);

  const adjustedDate = new Date(
    date.getTime() + timezoneOffset * 60 * 60 * 1000
  );

  // Format date components
  const formattedDate = formatDateComponents(adjustedDate);
  return formattedDate;
}

function formatDateComponents(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const renderFormElement = (
  key,
  value,
  idx,
  schools,
  contents,
  admins,
  handleStateChange
) => {
  const renderSelect = (options) => (
    <select
      className="edit-input"
      value={value}
      onChange={(e) => handleStateChange(key, e.target.value)}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  const renderDateTimeInput = () => (
    <input
      type="datetime-local"
      value={value}
      onChange={(e) => handleStateChange(key, e.target.value)}
      required
    />
  );

  const renderTextInput = (isDisabled = false) => (
    <input
      className="text-input"
      type="text"
      value={value}
      onChange={(e) => handleStateChange(key, e.target.value)}
      required
      disabled={isDisabled}
    />
  );

  switch (key) {
    case "contest_state":
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>;
          {renderSelect(["시작전", "진행중", "종료"])}
        </div>
      );

    case "state":
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>;
          {renderSelect(["경기전", "경기시작", "경기중", "경기종료"])}
        </div>
      );
    case "register_start":
    case "register_end":
    case "kickoff_start":
    case "kickoff_end":
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>
          {renderDateTimeInput()}
        </div>
      );

    case "ap_name":
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>
          {renderSelect(contents.map((content) => content.ap_name))}
        </div>
      );
    case "host_name":
      return (
        <CustomDropdown
          label={"host_name"}
          value={value}
          onSelect={(option) => handleStateChange("host_name", option)}
          options={Object.values(schools)
            .filter((school) => school.school_host == 1)
            .map((school) => school.school_name)}
        />
      );
    case "pid1_name":
    case "pid2_name":
      return (
        <CustomDropdown
          label={key}
          value={value}
          onSelect={(option) => handleStateChange(key, option)}
          options={Object.values(schools)
            .filter((school) => school.school_host == 0)
            .map((school) => school.school_name)}
        />
      );

    case "gs_state":
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>
          {renderSelect(["경기전", "경기시작", "경기중", "경기종료"])}
        </div>
      );

    case "gs_datetime_start":
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>
          {renderDateTimeInput()}
        </div>
      );
    case "role":
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>
          <select
            className="edit-input"
            value={value}
            onChange={(e) => handleStateChange(key, e.target.value)}
          >
            <option value="master">마스터</option>
            <option value="manager">관리자</option>
            <option value="ranking">랭킹</option>
          </select>
        </div>
      );
    default:
      const isDisabled = key === "contest_id" || key === "gs_uid" || key === "admin_id" || key === "seq" || key === "id" || key === "school_pid" || key === "school_sc_code" || key === "ap_sn" || key === "parent_ap_sn";
      return (
        <div key={idx} className="form-element">
          <label className="required">{key}</label>
          {renderTextInput(isDisabled)} 
        </div>
      );
  }
};

class EditWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedElement: this.props.element,
    };
  }

  handleStateChange = (key, newValue, index = null) => {
    const { editedElement } = this.state;
    if (key === "players" && typeof index === "number" && index >= 0) {
      let playerVal = {};
      playerVal.uid = newValue.school_pid;
      playerVal.scCode = newValue.school_sc_code;
      playerVal.name = newValue.school_name;

      if (!editedElement.players) {
        editedElement.players = [];
      }
      editedElement.players[index] = playerVal;
    } else {
      editedElement[key] = newValue;
    }

    this.setState({ editedElement });
  };

  render() {
    return (
      <div className="edit-window-overlay" onClick={this.props.onCancel}>
        <div
          className={`edit-window ${this.props.isEditing ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="contest-subtitle">데이터 수정</h2>
          <div>
            {Object.entries(this.props.element).map(([key, value], index) =>
              renderFormElement(
                key,
                value,
                (this.props.currentPage - 1) * 5 + index,
                this.props.schools,
                this.props.contents,
                this.props.admins,
                this.handleStateChange
              )
            )}

            <div className="edit-button-wrap">
              <button
                className="cancel-button"
                type="button"
                onClick={this.props.onCancel}
              >
                취소
              </button>
              <button
                className="save-button"
                onClick={() => this.props.onSave()}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function DataRow({
  element,
  idx,
  handleEdit,
  tableName,
  navigationFunc,
  showDeleteIcon,
  showEditIcon,
  showResetIcon,
  handleDeleteClick,
}) {
  const rowClassName = idx % 2 === 0 ? "even-row" : "odd-row";

  const handleRowClick = () => {
    if (tableName === "대회 정보 테이블") {
      navigationFunc("contestDetail", element.contest_id);
    }
  };

  const resetMatch = async () => {
    await makeAjaxRequest("POST", "/api/schedule/update_state/index.php", {
      gs_uid: element.gs_uid,
      gs_state: 0,
    });

    window.location.reload();
  };

  return (
    <tr
      className={`${rowClassName} ${
        tableName === "대회 정보 테이블" ? "clickable-row" : ""
      }`}
      onClick={handleRowClick}
    >
      {Object.entries(element)
        .filter(([key, _]) => key !== "host_name")
        .map(([key, value], index) => (
          <td key={index} className="table-data">
            {key === "contest_state" ? (
              <div className="static-field" key={index}>
                {value == 0 ? (
                  <p className="tag before">시작전</p>
                ) : value == 1 ? (
                  <p className="tag during">진행중</p>
                ) : (
                  <p className="tag end">종료</p>
                )}
              </div>
            ) : key === "state" || key === "gs_state" ? (
              <div className="static-field" key={index}>
                {value == 0 ? (
                  <p className="tag before">경기전</p>
                ) : value == 1 ? (
                  <p className="tag ready">경기시작</p>
                ) : value == 2 ? (
                  <p className="tag during">경기중</p>
                ) : (
                  <p className="tag end">경기종료</p>
                )}
                {key === "gs_state" && <p>{element.host_name}</p>}
              </div>
            ) : key === "players" ? (
              <div key={index}>
                {value.map((player, playerIndex) => (
                  <div key={playerIndex}>
                    <p className="school-name">{player.name}</p>
                    <p className="school-code">{player.scCode}</p>
                  </div>
                ))}
              </div>
            ) : key === "register_start" ||
              key === "register_end" ||
              key === "kickoff_start" ||
              key === "kickoff_end" ? (
              <div className="date-format">
                {formatDate(value).split("T").join(" ")}
              </div>
            ) : key === "gs_players" ? (
              <div>
                {value.map((player, playerIndex) => (
                  <p key={playerIndex}>{player}</p>
                ))}
              </div>
            )  : key === "role" ? (
              <div className="static-field" key={index}>
                {value == "master" ? (
                  <p className="tag before">마스터</p>
                ) : value == "manager" ? (
                  <p className="tag ready">관리자</p>
                ) : value == "ranking" ? (
                  <p className="tag during">랭킹</p>
                ) : ""}
              </div> 
            ) : (
              <div key={index}>{value}</div>
            )}
          </td>
        ))}

      {showDeleteIcon && (
        <td>
          <img
            className="icon"
            src="/admin/assets/delete.svg"
            onClick={(e) => 
              {
                e.stopPropagation();
                handleDeleteClick(idx)
              }
            }
          />
        </td>
      )}

      {showEditIcon && (
        <td>
          <img
            className="icon"
            src="/admin/assets/edit.svg"
            onClick={() => handleEdit(idx)}
          />
        </td>
      )}

      {showResetIcon && (
        <td>
          <img
            className="icon"
            src="/admin/assets/reset.svg"
            onClick={() => resetMatch()}
          />
        </td>
      )}
    </tr>
  );
}

function Pagination({ currentPage, pageSize, totalElements, onPageChange }) {
  const totalPages = Math.ceil(totalElements / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
