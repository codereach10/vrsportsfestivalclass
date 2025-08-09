class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "", //"4000037",
      schoolName: "",
      content: "", //"1883",
      contentName: "",
      score: "", //"10",
      videoName: "",
      error: "",
      showSaveButton: false,
      isLoading: false,
      rankingCount: 0,
    };
  }
  
  async componentDidMount() {
    const urlObj = new URL(window.location.href);
    const queryString = urlObj.search.substring(1);

    const params = this.decrypt(queryString, this.props.secretKey);

    const school = new URLSearchParams(params).get("school"); //"4000037" ;
    const content =  new URLSearchParams(params).get("content"); //"1883";
    const score =  new URLSearchParams(params).get("score"); //"10";

    await this.getNamesByCodes(school, content);
    await this.getCount(school, content);

    this.setState({
      school: school || "",
      content: content || "",
      score: score || "",
    });

    this.wstyle = R5.wStyle(`
        #new-ranking {
          display: flex;
          flex-direction: column;
          height: 140vh
        }
  
        .record-info {
          background-color: #1D70F0;
          color: white;
          text-align: center;
          border-radius: 0 0 15px 15px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), 0 15px 40px rgba(0, 0, 0, 0.05);
          padding-bottom: 20px;
        }
        
        .record-info > *{
          margin: 5px;
        }
        
        .record-info > h3 {
         padding: 10px 0px;
         width: max-content;
         text-align: center;
         margin: auto;
        }

        .record-info > p {
         margin-top: 20px;
         }


        .upload-button {
          font-weight: bold;
          color: #1D70F0 ;
          border-radius: 2rem;
          cursor: pointer;
          width: 120px;
          height: 42.66px;
          min-width: 120px;
          max-width: 120px;
          min-height: 42.66px;
          max-height: 42.66px;
          border: 1px solid #1D70F0;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          margin-top: 20px;
          margin-bottom:
        }
  
        .video-container {
        display: flex;
        justify-content:center;
          margin: 10px;
          width: '100%';
          height: 'auto';
          max-height: 50vh;
          text-align: 'center';
        }
  
        .error-message {
          background-color: #fce4e4;
          border: 1px solid #fcc2c3;
          padding: 10px 15px;
          color: #cc0033;
          margin: auto;
          margin-bottom: 10px;
          width: 90%;
        }
  
        .save-button {
          font-weight: bold;
          color: white;
          border-radius: 2rem;
          cursor: pointer;
          width: 120px;
          height: 42.66px;
          min-width: 120px;
          max-width: 120px;
          min-height: 42.66px;
          max-height: 42.66px;
          border: none;
          background-color: #1D70F0;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
      
          margin-bottom: 20px;
        }

     
        .save-button[disabled] {
            cursor: not-allowed;
            background-color: #999;
            animation: blink 1s infinite;
        }

        .alert-ranking {
        text-align:center;
        color: #1D70F0;
        }
        .alert-info {
        text-align:center;
        color: #060606ff;
        }
        .alert-weight {
        text-align:center;
        color: #d50808ff;
        }
      `);
  }

  componentWillUnmount() {
    if (this.wstyle != null) {
      this.wstyle.destroy();
      this.wstyle = null;
    }
  }
  /*
  uploadVideo = async (file) => {
    AWS.config.update({
      accessKeyId: this.props.awsAccessKeyId,
      secretAccessKey: this.props.awsSecretKey,
      region: this.props.awsRegion,
    });
    const s3 = new AWS.S3();
    const currentDate = new Date().toISOString().replace(/[:.]/g, "-");
    const videoFile = `${this.state.school}_${this.state.content}_${this.state.score}_${currentDate}`;
    this.setState({ videoName: videoFile });
    const params = {
      Bucket: "school-festival",
      Key: videoFile,
      Body: file,
      ContentType: file.type,
    };

    try {
      const data = await s3.upload(params).promise();
      console.log("Upload successful:", data.Location);

      // Handle any additional logic after successful upload
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check the console for more details.");
    }
  };
  */
  uploadVideo = async (file) => {
    const currentDate = new Date().toISOString().replace(/[:.]/g, "-");
    const ext = file.name.split('.').pop();
    if(ext == '') {
      ext='mov';
    }
    const videoFile = `${this.state.school}_${this.state.content}_${this.state.score}_${currentDate}`+ '.' + ext;
    this.setState({ videoName: videoFile });
    const formData = new FormData();
    
    formData.append("video", file, videoFile); // 또는 file.name 확장자 유지
    
    try {
      const response = await fetch("../../api/ranking/upload/", {
        method: "POST",
        body: formData,
      });

      //if (!response.ok) throw new Error(response.status);

      const result = await response.json();
      console.log("Upload successful:", result.filePath);
      if(result.error) {
        return result.error;
      }
      return "";

    } catch (err) {
      console.error("Upload error:", err);
      this.setState({error:err});
      const message = "알수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.\n" + err;
      return message;
    }
  };

  handleFileInputChange = (event) =>  {
    
    const file = event.target.files[0];
    
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024;
      const maxSizeMB = 500;

      if(fileSizeInMB > maxSizeMB) {
        alert("용량이 500MB를 초과하였습니다.\n업로드 가능 용량은 500MB입니다.");
      } else {
        this.setState({
          videoFile: file,
          showSaveButton: true,
        });
      }
    } else {
      alert("동영상을 선택하지 않았습니다.");
    }
    
    
  };
  handleFileClear = (event) => {
    this.setState({
      videoFile: null,
      showSaveButton: true,
    });

    // 파일 input 초기화 후 선택창 다시 열기
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = ""; // 수동 초기화
      setTimeout(() => {
        this.fileInputRef.current.click(); // 선택창 다시 띄움
      }, 0); // 바로 띄우면 초기화보다 빨리 실행될 수 있어 0ms delay
    }
  };
  saveRecord = async () => {
    if (this.state.videoFile == null) {
      this.setState({ error: "동영상 업로드해주세요!" });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const rst = await this.uploadVideo(this.state.videoFile);
      if(rst) {
        alert(rst);
      } else {
        const response = await $.post("../../api/ranking/update/", {
          ranking_school_sc: this.state.school,
          ranking_ap_sn: this.state.content,
          ranking_score: this.state.score,
          ranking_video_name: this.state.videoName,
        });
        const responseData = JSON.parse(response);

        if (responseData.code == 200 && !responseData.error) {
          window.location.href =
            "http://vrsportsfestival.vrsportsclass.com/ranking/finish";
        } 
      }
    } catch (error) {
      alert(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  decrypt(encryptedText, password) {
    // Use the same key derivation as in C#
    var key = CryptoJS.enc.Utf8.parse(password.substring(0, 16));

    // Decode the Base64 encoded encrypted text
    var ciphertext = CryptoJS.enc.Base64.parse(encryptedText);

    // Decrypt the encrypted data
    var decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: key, // Use the key as IV, same as in C#
    });

    // Convert decrypted data from bytes to UTF-8 string
    var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    return decryptedText;
  }

  async getNamesByCodes(school, content) {
    try {
      const response = await $.post("../../api/school_info/read_single/", {
        school_sc_code: school,
      });
      const responseContent = await $.post(
        "../../api/content_info/read_single/",
        { ap_sn: content }
      );

      const responseData = JSON.parse(response);
      const responseContentData = JSON.parse(responseContent);

      this.setState({
        schoolName: responseData.school[0].school_name,
      });

      this.setState({
        contentName: responseContentData.content[0].ap_name,
      });
    } catch (error) {
      console.error("Error fetching school information:", error);
    }
  }

  async getCount(school, content) {
    try {
      const response = await $.post("../../api/ranking_admin/get_count/", {
        ranking_school_sc: school,
        ranking_ap_sn: content,
      });
      const responseData = JSON.parse(response);
      this.setState({ rankingCount: responseData.count });
    } catch (error) {
      console.error("Error fetching school information:", error);
    }
  }
  render() {
    const {
      schoolName,
      contentName,
      score,
      videoFile,
      error,
      isLoading,
      rankingCount,
    } = this.state;

    return (
      <div id="new-ranking">
        <div className="record-info">
          <h3>랭킹 업로드</h3>
          <hr></hr>
          <p>콘텐츠</p>
          <h3>{contentName}</h3>
          <p>학교 이름</p>
          <h3>{schoolName}</h3>
          <p>점수</p>
          <h3>{score}</h3>
          <p>등록 횟수</p>
          <h3>{rankingCount}</h3>
        </div>

        <h3 className="alert-ranking"> 행사기간:8.25(월)~9.12(금)</h3>
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          ref="fileInputRef"
          onChange={this.handleFileInputChange}
          id="fileInput"
        />
        {!this.state.showSaveButton && ( 
        <label htmlFor="fileInput" className="upload-button">
          영상 업로드 
        </label>
        )}
        {this.state.showSaveButton && ( 

        <label htmlFor="fileInput" onClick={this.handleFileClear} className="upload-button">
          다시 올리기
        </label>
        )}
        {!this.state.showSaveButton && 
          <div>
            <p className="alert-info">랭킹전 경기참여 영상을 업로드해주세요.</p>
            <p className="alert-weight"> *영상의 용량은 최대500MB까지 가능합니다.</p>
          </div>
        }
        {videoFile && (
          <div className="video-container">
            <video controls style={{ maxWidth: "100%", height: "auto" }}>
              <source
                src={URL.createObjectURL(videoFile)}
                type={videoFile.type}
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
        {!error && this.state.showSaveButton && (
            <button
              className="save-button"
              onClick={this.saveRecord}
              disabled={isLoading}
            >
              {isLoading ? "업로드 중..." : "저장"}
            </button> 
          )
        }
      </div>
    );
  }
}
