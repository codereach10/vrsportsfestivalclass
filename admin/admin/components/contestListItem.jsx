class ContestListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.wstyle = R5.wStyle(``);
  }

  render() {
    return (
      <div>
        <div>Title</div>
        <div>SubTitle</div>
        <div>reg_start/reg-end ...</div>
        <div>kickoff/ kickoff</div>
      </div>
    );
  }
}
