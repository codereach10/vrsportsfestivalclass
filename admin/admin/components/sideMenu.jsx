class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: null,
    };
  }

  wstyle = null;
  async componentDidMount() {
    const storedMenu = JSON.parse(localStorage.getItem("selectedMenu"));
    if (storedMenu) {
      this.setState({ activeMenu: storedMenu });
    }

    this.wstyle = R5.wStyle(`
          
      #side-menu-wrap{
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 269px;
          background-color: #FFFFFF;
          justify-content: space-between;
          font-family: "Nanum Gothic", sans-serif;
          border-right: 1px solid rgba(177, 177, 177, 0.10);
          box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);

      
      }
      .side-menu-logo{
          color: #0B5CD5;
          font-size: 24px;
          font-weight: bold;
          margin-top: 20px;
          margin-left: 26px;
          margin-bottom: 50px;
          font-family: "Inter", sans-serif;

      }
  
      .side-menu-footer {
     
          height: 30px;
          padding: 24px;
          border-top: 1px solid rgba(177, 177, 177, 0.10);
      }
  
      .logout-button {
        display: flex;
        align-items: center;
          color: #0B5FFF;
          font-weight: bold;
          border: none;
          background-color: transparent;
          padding: 0;
          margin: 0;
          cursor: pointer;
     

      }

      .logout-icon {
        margin-right: 16px;
        width: 20px;
        height: 20px;
      }
          `);
  }

  logout() {
    $.ajax({
      type: "GET",
      url: "/login/_logout.php",

      success: (data, status, xhr) => {
        if (JSON.parse(data).code === 0) {
          window.location.href = "/admin";
        }
      },
    });

    return ret;
  }

  handleMenuClick(menuName) {
    this.setState({ activeMenu: menuName });

    this.props.selMenu(menuName);
  }

  render() {
    const role = JSON.parse(localStorage.getItem("role"));
    const isAdmin = role == "master";

    return (
      <div id="side-menu-wrap">
        <div className="sideMenuContent">
          <div className="side-menu-logo">VRSports Admin</div>
          <MenuItem
            menuItem="대회 정보"
            menuName="contest"
            active={this.state.activeMenu === "contest"}
            onClick={() => this.handleMenuClick("contest")}
          />
          <MenuItem
            menuItem="학교 정보"
            menuName="school"
            active={this.state.activeMenu === "school"}
            onClick={() => this.handleMenuClick("school")}
          />
          <MenuItem
            menuItem="콘텐츠 정보"
            menuName="content"
            active={this.state.activeMenu === "content"}
            onClick={() => this.handleMenuClick("content")}
          />
          {isAdmin && (
            <MenuItem
              menuItem="관리자"
              menuName="admin"
              active={this.state.activeMenu === "admin"}
              onClick={() => this.handleMenuClick("admin")}
            />
          )}
        </div>
        <div className="side-menu-footer">
          <div className="logout-button" onClick={this.logout}>
            Logout
          </div>
        </div>
      </div>
    );
  }
}
