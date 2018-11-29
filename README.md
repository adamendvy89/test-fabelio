# Project Title

Price Monitor app 

# Feature

Monitoring certain product prices

# List API

| API  | HTTP | Purpose |
| ------------- | ------------ | ------------- |
| /product  | GET | get all products list  |
| /product/new | POST | add new product with product url  |
| /product/:id | GET | get product by product id  |
| /comment/new | POST | add new comment on specific product  |
| /comment/:productid | GET | get comments by product Id  |
| /comment/delete/:id | DELETE | delete comment |


### Environment
NodeJs <br>
ExpressJs_ <br>
Mongodb with ODM mongoose <br>
VueJs 


### Setup

**Backend** <br>
```
$ npm install <br>
$ npm start <br>
```
Run on localhost:8000<br>


**Frontend**  <br>
```
$ npm run serve
```
Run on localhost:8080 



### Dependencies 
Puppeteer  <br>
Cheerio  <br>
Node-cron <br>
Mongoose <br>

##Deployment

Deployed with Google app engine and google cloud storage<br>
Link : https://testfabelio.gladysefirina.website


## Author

* **Glady Sefirina** - (https://github.com/violerine)
