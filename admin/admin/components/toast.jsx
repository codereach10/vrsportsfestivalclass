class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.closeToast = this.closeToast.bind(this);
  }

  state = {
    isActive: false,
    progress: 0,
  };

  wstyle = null;

  componentDidMount() {
    this.setState({ isActive: true });

    const mainColor = this.props.type === "Success" ? "#59AF4E" : "#DA4E3E";

    setTimeout(() => {
      this.closeToast();
    }, 5000);

    this.wstyle = R5.wStyle(`
      .toast {
          position: absolute;
          top: 25px;
          right: 30px;
          border-radius: 12px;
          background: #fff;
          padding: 20px 35px 20px 25px;
          box-shadow: 0 5px 10px rgba(0,0,0,0.1);
          border-left: 6px solid ${mainColor};
          overflow: hidden;
          visibility: hidden;
      }

      .toast.active {
          visibility: visible;
      }

      .toast .toast-content {
          display: flex;
          align-items: center;
      }

      .toast-content .check {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 35px;
          width: 35px;
          background-color: ${mainColor};
          color: #fff;
          font-size: 20px;
          border-radius: 50%;
      }

      .toast-content .message {
          display: flex;
          flex-direction: column;
          margin: 0 20px;
      }

      .message .text {
          font-size: 20px;
          font-weight: 400;
          color: #666666;
      }
      .message .text.text-one {
          font-weight: 600;
          color: ${mainColor};
      }


    `);
  }

  componentWillUnmount() {
    clearInterval(this.progressInterval);

    if (this.wstyle != null) {
      this.wstyle.destroy();
      this.wstyle = null;
    }
  }

  closeToast() {
    this.setState({ isActive: false });
  }

  render() {
    const { isActive, progress } = this.state;
    const toastClass = isActive ? "toast active" : "toast";

    return (
      <div className={toastClass}>
        <div className="toast-content">
          {this.props.type === "Success" ? (
            <div className="message">
              <span className="text text-one">Success</span>
              <span className="text text-two">
                Your changes have been saved
              </span>
            </div>
          ) : (
            <div className="message">
              <span className="text text-one">안내</span>
              <span className="text text-two">{this.props.message}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
