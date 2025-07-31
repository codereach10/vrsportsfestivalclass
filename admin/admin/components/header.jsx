class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  wstyle = null;
  async componentDidMount() {
    this.wstyle = R5.wStyle(`
    
    #header-wrap {
        display:flex;
        justify-content: space-between;
        align-items:center;
        background: #FFFFFF;
        height:100px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 800;
        border-bottom: 1px solid rgba(177, 177, 177, 0.10);

    }

       .header-title{
        color: #0B5CD5;
        font-size: 26px;
        font-weight: 900;
        margin-left: 40px;

        
  
       }`);
  }

  render() {
    return (
      <div id="header-wrap">
        <div className="header-title">{this.props.tab}</div>
      </div>
    );
  }
}
