class MenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  wstyle = null;
  async componentDidMount() {
    this.wstyle = R5.wStyle(`

    .menu-item {
      display: flex;
      height: 50px;
      align-items: center;
      color: #B1B1B1;
      cursor: pointer;

  }

  .menu-item:hover {
    background: #D7E5FA;
    color: #0B5CD5;
    font-weight: 800;
  }
  .menu-item:hover > .image-icon {
    filter: none;
  }

  .selected {
      color: #0B5CD5;
      font-weight: 800;
    }

    .indicator {
      width: 5px;
      height: 100%;
      border-top-right-radius: 5px; 
      border-bottom-right-radius: 5px; 
      margin-right: 40px;
    }

    .on {
      background-color: #0B5CD5;
    }
    

          .image-icon {
            margin-right: 8px;
            width: 20px;
            height: 20px;
            filter: invert(53%) sepia(93%) saturate(0%) hue-rotate(270deg) brightness(114%) contrast(85%);


          }
          .icon-on {
            filter: none;
          }
          `);
  }

  render() {
    const { menuItem, menuName, active, onClick } = this.props;
    return (
      <div
        className={`menu-item ${active ? "selected" : ""}`}
        onClick={onClick}
      >
        <div className={`indicator ${active ? "on" : ""}`}></div>
        <img
          className={`image-icon ${active ? "icon-on" : ""}`}
          src={`/admin/assets/${menuName}.svg`}
          alt="image"
        />
        {menuItem}
      </div>
    );
  }
}
