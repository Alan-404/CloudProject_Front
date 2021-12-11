<div id="top"></div>

<div align="center">
       <img src="https://thoibaonganhang.vn/stores/news_dataimages/canhnq/032021/03/14/4430_0_2ui893KAwAT_F9wz.gif">
</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://firebasestorage.googleapis.com/v0/b/hoaiphong-4cfd9.appspot.com/o/logo.jpg?alt=media&token=848e1981-5300-4bfc-807a-53b0b1ecc706" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Trường đại học sư phạm kĩ thuật TPHCM</h3>

  <p align="center">
     Cloud Computing
    <br />
    <a href="https://github.com/Alan-404/CloudProject_Front/blob/master/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

<div>
       <h4>Packet which needed to install to run project</h4>
       <a href = "https://nodejs.org/en/download/">Nodejs</a><br/>
       <a href = "https://www.npmjs.com/package/@aws-sdk/client-s3">@aws-sdk/client-s3</a><br/>
       <a href = "https://www.npmjs.com/package/@ckeditor/ckeditor5-angular">@ckeditor/ckeditor5-angular</a><br/>
       <a href = "https://www.npmjs.com/package/@angular/material">@angular/material</a><br/>
</div>

# Angular Project For Cloud Computing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Configure Angular Project to connect Amazon S3

Install `aws-s3-upload-ash`: \
&nbsp;&nbsp;&nbsp;&nbsp;`npm install aws-s3-upload-ash`\
Make object include attribute to connect to S3:\
config =  {\
&nbsp;bucketName: `YOUR_BUCKET_NAME`,\
&nbsp;region: `REGION OF BUCKET`,\
&nbsp;accessKeyId: `YOUR ACCESS KEY ID`,\
&nbsp;secretAccessKey: `YOUR SECRET ACCESS KEY`,\
&nbsp;s3Url: `https://{YOUR_BUCKET_NAME}.s3.amazonaws.com`\
}

DECLARE Object from `AWSS3UploadAshClient` class\
Example: S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(config);

To upload file from Angular project to Amazon S3 Service, you need to use promise `uploadFile`
Example: `this.S3CustomClient.uploadFile({YOUR FILE}, {TYPE OF FILE}, {OPTIONAL: presignedURL}, {KEY}, {order})`

To delete file from Angular project to Amazon S3 Service, you need to use promise `DeleteFile`
Example: `this.S3CustomClient.deleteFile({KEY})`

## Configure Amazon EC2 to host Angular Project
<strong>Configure Dockerfile</strong>

FROM node:16.13.0 as node\
WORKDIR /appcd\
COPY . .\
RUN npm install\
RUN npm run build --prod

FROM nginx:1.17.1-alpine\
COPY --from=node /app/dist/angular-app /usr/share/nginx/html

<strong>Build project Angular</strong>

`ng build --prod`

<strong>Make image docker</strong>

(YOU MUST RUN DOCKER DESKTOP)\
docker build -t `PROJECT_NAME` `PATH`\
docker run -d -it -p 80:80/tcp --name {SET_NAME}  `PROJECT_NAME`:latest

<strong>Push your docker image to docker hub</strong>

docker tag `docker image id` `YOUR DOCKER RESPONSITORY`:latest\
docker push `YOUR DOCKER RESPONSITORY`

<strong>Create launce in AWS EC2</strong>

Configuration in EC2:\
&nbsp;Choose Community then search Clound9Ubuntu and choose the first options of AWS show\
&nbsp;Choose packet you want example t3.large\
&nbsp;Choose hard disk you want. Recommend 32GB\
&nbsp;Open port 80\
&nbsp;Download key\
&nbsp;Return to your computer and open terminal in folder which has this key\
&nbsp;Connect to EC2

<strong>Run your project in EC2</strong>

&nbsp;docker pull `YOUR IMAGE ID IN DOCKER HUB`\
&nbsp;docker run -d -it -p 80:80/tcp --name {SET_NAME}  `PROJECT_NAME`:latest\
&nbsp;Your project front-end is running in port 80 of your EC2

# Call API from Front-end to Back-end

<h3>Generate Service layer</h3>
ng g s `PATH`

<h3>Call API in Service layer</h3>
In file app.module.ts:<br/>
&nbsp; import {HttpClientModule} from '@angular/common/http';<br/>
&nbsp; Declare this module in imports array<br/>

<h3>(Optional) Create Interface</h3>
Interface is the object which transfer data from file to file or front-end to back-end and vice versa

<h3>Call API</h3>
In file service:<br/>
&nbsp; import {HttpClient, HttpHeaders} from '@angular/common/http'<br/>
&nbsp; Declare object from class HttpClient<br/>
&nbsp; Just call API in function of the service file