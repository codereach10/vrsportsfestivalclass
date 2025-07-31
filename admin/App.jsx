class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: null,
    isShowPassword: false,
  };

  toggleShowPassword = () => {
    this.setState((prevState) => ({
      isShowPassword: !prevState.isShowPassword,
    }));
  };

  async componentDidMount() {
    this.wstyle = R5.wStyle(`
            #main-wrap {
                display:flex;
                flex-direction: column;
                height: 100vh;
                align-items: center;
                background-color: #F5F7FA;
                font-family: "Nanum Gothic", sans-serif;
            }
  
            .title{
              margin-top: 200px;
              font-style: normal;
              font-weight: bold;
              font-size: 72px;
              color: #0B5CD5;
              font-family: "Inter", sans-serif;
             
            }
  
            .input-wrap{
              display: flex;
              flex-direction: column;
              height: 370px; 
              width:310px;
              padding: 0px 32px 0px 32px;
              border-radius: 12px;
              background-color: #FFFFFF;      
              box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);

            }
  
            .input-title{
              font-size: 32px;
              font-weight: bold;
              color: #0B5CD5;
              margin-top: 48px;
              margin-bottom: 32px;
              text-align: center;
            }
  
            .input-field {
              padding: 8px;
              border: none;
              border-bottom: 1px solid #C0BEBE;
              width: calc(100% - 8px); 
              margin-bottom: 24px;
              box-sizing: border-box; 
             
          }

  
          .input-field:focus {
            border: none;
            border-bottom: 1px solid #0B5CD5;
            outline: none;
            background: rgb(11, 92, 213, 0.1);
            color:#0B5CD5;
          }
  
          .input-button{
              width: 100%;
              height: 40px;
              background-color: #0B5CD5;
              color: #FFFFFF;
              font-weight: bold;
              border: none;
              border-radius: 6px;
              cursor: pointer;   
          }

          ::placeholder {
              color: #0B5Cd5;
              opacity: 1;
            }
            
          .error-message {
            height: 20px;
            margin: 10px 0;
            padding: 5px;
            border-radius: 3px 3px 3px 3px;
            font-size: 14px;
         
          }
          .error-message.active {
            color: #D8000C;
            background-color: #FFBABA;
          }

          .password-wrap {
            position: relative;
            display: inline-block;
          }
          .password-wrap > .input-field {
            margin-bottom: 0px;
          }
        
          .show-password {
            position: absolute;
            right: 15px; 
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          }

          .password-icon {
            margin-right: 8px;
            width: 20px;
            height: 20px;
          }

      
          ::placeholder {
            opacity: 0.5;
        }
      
         `);

    document.addEventListener("keypress", this.handleKeyPress);
  }
  wstyle = null;

  componentWillUnmount() {
    if (this.wstyle != null) {
      this.wstyle.destroy();
      this.wstyle = null;
    }

    document.removeEventListener("keypress", this.handleKeyPress);
  }

  handleSubmit = async () => {
    let credentials = {
      id: document.getElementById("id").value,
      password: document.getElementById("password").value,
    };

    try {
      $.ajax({
        type: "POST",
        url: "/login/_login.php",
        data: credentials,
        success: (data, status, xhr) => {
          try {
            if (
              JSON.parse(data).code === 0 &&
              JSON.parse(data).role == "master"
            ) {
              const adminData = JSON.parse(data);

              localStorage.setItem("selectedMenu", JSON.stringify("contest"));
              localStorage.setItem("role", JSON.stringify(adminData.role));
              window.location.href = "./";
            } else if (JSON.parse(data).code === 2) {
              this.setState({ error: "잘못된 비밀번호 또는 사용자 ID" });
            } else if (JSON.parse(data).role != "master") {
              this.setState({ error: "승인되지 않음 사용자 " });
            }
          } catch (error) {
            console.error("Error parsing response data!", error);
            this.setState({
              error: "응답 데이터 구문 분석 중 오류가 발생했습니다.",
            });
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

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div id="main-wrap">
        <h1 className="title">VRSports Admin</h1>
        <div className="input-wrap">
          <p className="input-title">로그인</p>

          <input
            className="input-field"
            type="text"
            name="id"
            id="id"
            value={this.state.id}
            onChange={this.handleChange}
            placeholder="유저네임"
          />
          <div className="password-wrap">
            <input
              className="input-field"
              type={this.state.isShowPassword ? "text" : "password"}
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="비밀번호"
            />
            <span className="show-password" onClick={this.toggleShowPassword}>
              {this.state.isShowPassword ? (
                <img
                  src="assets/eyeclose.svg"
                  className="password-icon"
                  alt="hidepassword"
                />
              ) : (
                <img
                  src="assets/eyeopen.svg"
                  className="password-icon"
                  alt="showpassword"
                />
              )}
            </span>
          </div>
          <div
            className={`error-message ${
              this.state.error != null ? "active" : ""
            }`}
          >
            {this.state.error}
          </div>
          <button className="input-button" onClick={this.handleSubmit}>
            로그인
          </button>
        </div>
      </div>
    );
  }
}
