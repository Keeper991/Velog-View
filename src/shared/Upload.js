import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_S3_BUCKET_REGION, // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_S3_IDENTIFY_POOL_ID, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
  }),
});

const uploadFile = async (file, author, type) => {
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      Key: `${type}s/${author}_${file.name}`,
      Body: file,
    },
  });

  try {
    const result = await upload.promise();
    return result.Location;
  } catch (e) {
    console.log(e);
    alert("업로드에 실패했습니다.");
  }
};

export default uploadFile;
