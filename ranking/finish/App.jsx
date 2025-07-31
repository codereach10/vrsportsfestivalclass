class Finish extends React.Component {
  constructor(props) {
    super(props);
  }

  wstyle = null;
  async componentDidMount() {
    this.wstyle = R5.wStyle(`
          
          .finish-container {
              width:100vw;
              height: 100vh;
              text-align:center;
              color:#1D70F0;
              
              
          }
  
        
              `);
  }

  render() {
    return (
      <div className="finish-container">
        <svg
          stroke="#1D70F0"
          fill="#1D70F0"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="50px"
          width="50px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>
        <h3>정사적으로 완료되었습니다</h3>
        <h5>참여해주셔서 감사합니다</h5>
      </div>
    );
  }
}
