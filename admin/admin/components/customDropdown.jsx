class CustomDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      searchTerm: "",
      filteredOptions: this.props.options,
    };
  }

  componentDidMount() {
    this.wstyle = R5.wStyle(`
    

    .dropdown-header {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        border: none;
        border-bottom: 1px solid #C0BEBE;
        width: 100%; 
        margin-bottom: 32px;
    }
    label {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 2px;
    }
    
    .input-search {
        padding: 8px;
        
        border: 1px solid #C0BEBE;
        border-radius: 8px;
        width: 80%; 
        margin-bottom:32px;
        margin: 8px;
    }
    
    .input-search:focus {
      
        border: 1px solid #0B5CD5;
        outline: none;
        background: rgb(11, 92, 213, 0.1);
        color:#0B5CD5;
    }
    
    ul {
        padding: 0px;
    }

    li {
        padding: 4px;
    }

    li:hover {
        background-color: #0B5CD5;
        color: #FFFFFF;

    }


    .arrow-icon {
        width: 10px;
        height: 10px;
    }

    .dropdown-content {
        border: 1px solid #000000;
    }
    `);
  }
  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    const filteredOptions = this.props.options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({
      searchTerm,
      filteredOptions,
    });
  };

  handleOptionClick = (option) => {
    this.setState({
      isOpen: false,
    });
    this.props.onSelect(option);
  };

  render() {
    const { isOpen, searchTerm, filteredOptions } = this.state;

    return (
      <div className="custom-dropdown">
        <label className="required">{this.props.label}</label>
        <div className="dropdown-header" onClick={this.toggleDropdown}>
          {this.props.value}
          {isOpen ? (
            <img src="/admin/assets/up.svg" className="arrow-icon" />
          ) : (
            <img src="/admin/assets/down.svg" className="arrow-icon" />
          )}
        </div>
        {isOpen && (
          <div className="dropdown-content">
            <input
              type="text"
              className="input-search"
              value={searchTerm}
              onChange={this.handleSearchChange}
              placeholder="검색..."
            />
            <ul>
              {filteredOptions.map((option) => (
                <li key={option} onClick={() => this.handleOptionClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
