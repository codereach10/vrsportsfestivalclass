class RankingAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentRanking: null,
  };

  wstyle = null;

  async componentDidMount() {
    this.getCurrentRanking();
    this.wstyle = R5.wStyle(`
    #ranking-wrap {
        display: flex;
        flex-direction: column;
        padding: 40px;
        font-family: "Nanum Gothic", sans-serif;
    }
    
    .ranking-content {
        display: flex;
        flex-direction: column;
    }
  
    
    .ranking-subtitle {
        color: #0B5CD5;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: bold;
        font-size: 18px;
        margin-top: 20px;
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
      url: "/api/ranking/read/index.php",
    });
  }

  async getCurrentRanking() {
    try {
      const res = await this.getData();
      let ranking = JSON.parse(res); //.ranking;
      console.log(ranking);
      this.setState({ currentRanking: { ...ranking } });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const tableHeaders = [
      "match_id",
      "school_sc_code",
      "team_id",
      "ranking_score",
    ];

    const filteredContests = {};

    if (this.state.currentContent) {
      Object.keys(this.state.currentContent).forEach((contestKey) => {
        const contest = this.state.currentContent[contestKey];
        const filteredContest = {};
        Object.keys(contest).forEach((header) => {
          if (tableHeaders.includes(header)) {
            filteredContest[header] = contest[header];
          }
        });
        filteredContests[contestKey] = filteredContest;
      });
    }

    return (
      <div id="ranking-wrap">
        <div className="ranking-content">
          <div>
            <div className="ranking-subtitle"> 랭킹 정보 </div>
            <DataTable current={filteredContests} headers={tableHeaders} />
          </div>
        </div>
      </div>
    );
  }
}
