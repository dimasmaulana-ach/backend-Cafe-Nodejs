# Backend Cafe Node 

### Get Started
```
yarn install
```

### Run Server
```
yarn start
```
### Database Table
<img src="https://github.com/Dimas-Maulana-A/backend-Cafe-Nodejs/blob/main/image/table_db_cafe.jpeg" alt="database table" />


### Api Spec Login

end point
```http://localhost:8080/api/kasir/login```

Request
```
{
    "username" : string,
    "password" : string
}
```

Response 
```
{
    "datas" : {
        "id": integer,
        "name": string, 
        "username": string,
        "password": string,
        "role": integer
    },
    "token" : string
}
```