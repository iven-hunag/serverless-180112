export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: "notes-app-uploads"
  },
  apiGateway: {
    REGION: "ap-northeast-1",
    URL: "https://qats3wz7o3.execute-api.ap-northeast-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-northeast-1",
    USER_POOL_ID: "ap-northeast-1_WC9KGEmxo",
    APP_CLIENT_ID: "255kb99mcr612h7hc72s75sblj",
    IDENTITY_POOL_ID: "ap-northeast-1:8fd390f4-5ee9-4c48-8c96-19074b0bb183"
  }
};
