class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "contest",
      option: null,
    };
  }

  async componentDidMount() {
    const storedMenu = JSON.parse(localStorage.getItem("selectedMenu"));
    if (storedMenu) {
      this.setState({ page: storedMenu });
    }

    this.wstyle = R5.wStyle(`
    #Main {
      display:flex;
      background: #f7f7f7;
      height: 100vh;
      overflow-x: hidden;
    }
    .mainContent {
      height: 100vh;
      width: 100%;
    }
    `);
  }

  wstyle = null;

  componentWillUnmount() {
    if (this.wstyle != null) {
      this.wstyle.destroy();
      this.wstyle = null;
    }
  }

  selMenu(menu, option = null) {
    this.setState({ page: menu, option });
    localStorage.setItem("selectedMenu", JSON.stringify(menu));
    localStorage.setItem("currentContest", JSON.stringify(option));
  }
  render() {
    return (
      <div id="Main">
        <SideMenu selMenu={this.selMenu.bind(this)} />
        <div className="mainContent">
          {this.state.page == "contest" && (
            <div>
              <Header tab={"대회 정보"} />
              <ContestAdmin funct={this.selMenu.bind(this)} />
            </div>
          )}

          {this.state.page == "school" && (
            <div>
              <Header tab={"학교 정보"} />
              <SchoolAdmin />
            </div>
          )}

          {this.state.page == "match" && (
            <div>
              <Header tab={"경기 정보"} />
              <MatchAdmin />
            </div>
          )}

          {this.state.page == "content" && (
            <div>
              <Header tab={"콘텐츠 정보"} />
              <ContentAdmin />
            </div>
          )}

          {this.state.page == "contestDetail" && (
            <div>
              <Header tab={"대회 정보"} />
              <ContestDetails option={this.state.option} />
            </div>
          )}

          {this.state.page == "admin" && (
            <div>
              <Header tab={"관리자"} />
              <Admin />
            </div>
          )}
        </div>
      </div>
    );
  }
}
