class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      schoolName: "",
      content: "",
      contentName: "",
      score: "",
      videoName: "",
      error: "",
      isLoading: false,
      rankingCount: 0,
    };
  }

  async componentDidMount() {
    const urlObj = new URL(window.location.href);
    const queryString = urlObj.search.substring(1);

    const params = this.decrypt(queryString, this.props.secretKey);

    const school = new URLSearchParams(params).get("school");
    const content = new URLSearchParams(params).get("content");
    const score = new URLSearchParams(params).get("score");

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
          height: 100vh;
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
      `);
  }

  componentWillUnmount() {
    if (this.wstyle != null) {
      this.wstyle.destroy();
      this.wstyle = null;
    }
  }

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

  handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        videoFile: file,
      });
    } else {
      alert("No file selected.");
    }
  };

  saveRecord = async () => {
    if (this.state.videoFile == null) {
      this.setState({ error: "동영상 업로드해주세요!" });
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.uploadVideo(this.state.videoFile);

      const response = await $.post("../../api/ranking/update/", {
        ranking_school_sc: this.state.school,
        ranking_ap_sn: this.state.content,
        ranking_score: this.state.score,
        ranking_video_name: this.state.videoName,
      });
      const responseData = JSON.parse(response);

      if (responseData.code == 200) {
        window.location.href =
          "http://vrsportsfestival.codereach.co.kr/ranking/finish";
      } else {
        alert("오류 발생");
      }
    } catch (error) {
      alert("오류 발생:" + error);
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

        <h3 className="alert-ranking"> 랭킹전 진행 기간이 아닙니다. </h3>
        {/* <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={this.handleFileInputChange}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="upload-button">
          영상 업로드
        </label>

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
        <button
          className="save-button"
          onClick={this.saveRecord}
          disabled={isLoading}
        >
          {isLoading ? "업로드 중..." : "저장"}
        </button> */}
      </div>
    );
  }
}
