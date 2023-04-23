// yarn init => tạo file package.json
// yarn add express
// setup server bằng express
const express = require('express');
const app = express();
app.use(express.json()); // cho phép BE req.body đọc được mã json
app.use(express.static('./public/img')); // định vi source load tai nguyen
// yarn add cors
const cors = require('cors');
app.use(cors()); // cho phép tất cả FE truy cập vào API của BE
// tạo server localhost với port 8080 => localhost:8080
app.listen(8080);

// yarn install = npm i
// yarn start

// localhost:8080/api/user/get-user

const rootRouter = require('./routes/rootRoute');
app.use("/api", rootRouter)

//yarn sequelize-clit yarn sequelize-cli init
// yarn sequelize-cli model:generate --name Food --attributes food_id:string,food_name:string
// yarn  sequelize-cli db:migrate


// yarn add swagger-ui-express && yarn add swagger-jsdoc
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        info: {
            title: "api node29",
            version: "1.0.0",
            description:"description"
        }
    },
    apis: ["src/swagger/index.js"]
}

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));



// yarn sequelize-auto  -h localhost -d db_test -u root -x 1234 -p 3307 --dialect mysql -o ./src/models -l es6

