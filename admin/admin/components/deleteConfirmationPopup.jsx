class DeleteConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.wstyle = R5.wStyle(`
        .delete-confirmation-popup {
          
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999; 
          background-color: rgba(0,0,0, 0.4);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  

        .delete-wrap {
            display: flex;
            flex-direction: column;
            align-items:center;
            background-color: #FFFFFF;
         border-radius: 8px;
          margin-top: 16px;
          color: #343C6A;
          border: 1px solid rgba(177, 177, 177, 0.10);
          font-family: "Nanum Gothic", sans-serif;
          font-size: 15px;
          padding: 40px;
          box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
          width: 250px;
        }
        .delete-confirmation-popup p {
            font-size: 20px;
            font-weight: 800;
         color: #54595E;
        }
  
       .delete-button { 
        background-color: #0B5CD5;
        border: none;
       border-radius: 8px;
        color: white;
        padding: 8px 24px;
        font-family: "Nanum Gothic", sans-serif;
        font-weight: 600;
        cursor: pointer;

       }
      `);
  }
  render() {
    const { onCancel, onDelete } = this.props;

    const handleDelete = () => {
      onDelete();
      onCancel();
    };
    return (
      <div className="delete-confirmation-popup">
        <div className="delete-wrap">
          <p>삭제하시겠습니까?</p>
          <div className="button-wrap">
            <button className="cancel-button" onClick={onCancel}>
              취소
            </button>
            <button onClick={() => handleDelete()} className="delete-button">
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  }
}
