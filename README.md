# xxshop

[Online Demo](https://xxshop.onrender.com)

## Quitckstart

```sh
# start postgresql, adminer
docker compose up -d

yarn install

# edit .env change line vars:
# LINE_LOGIN_CHANNEL_ID, LINE_LOGIN_CHANNEL_SECRET, LINE_LOGIN_CALLBACK_URL

# open http://localhost:3001
yarn start:dev
```

## Spec

功能項目：
1. 使用者可以使用Line Login註冊以及登入
2. 使用者登入後可以新增多筆店家資訊並且看到店家相關資訊
3. 可以新增店家
4. 修改店家資訊
5. 刪除店家
6. 取得單一店家資訊
7. 取得所有店家列表
8. 使用者可以看到店家名稱、地址、電話、負責人的資訊

開發規範：
1. 請用Restful風格開發API
2. 指定NodeJs語言開發，您可以使用express、koajs或其他Nodejs支援的框架開發
3. 需有前端畫面，可以使用目前三大框架：Vuejs、React.Js以及Angular
4. DB需使用PostgreSql