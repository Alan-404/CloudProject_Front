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
       <h4>Cần download để chạy project</h4>
       <a href = "https://nodejs.org/en/download/">Nodejs</a><br/>
       <a href = "https://www.npmjs.com/package/@aws-sdk/client-s3">@aws-sdk/client-s3</a><br/>
       <a href = "https://www.npmjs.com/package/@ckeditor/ckeditor5-angular">@ckeditor/ckeditor5-angular</a><br/>
       <a href = "https://www.npmjs.com/package/@angular/material">@angular/material</a><br/>
</div>

# Angular Project For Cloud Computing

Dự án này được tạo với Angular CLI [Angular CLI](https://github.com/angular/angular-cli) phiên bản 12.2.8.

## Development server

Run `ng serve` ho một máy chủ nhà phát triển. Điều hướng đến `http://localhost/`. Ứng dụng sẽ tự động tải lại nếu bạn thay đổi bất kỳ tệp nguồn nào.

## Code scaffolding

Run `ng generate component component-name` để tạo component mới. Bạn có thể sử dụng `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` để build project. Các tạo tác xây dựng sẽ được lưu trữ trong thư mục `dist/`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Configure Angular Project to connect Amazon S3

Install `aws-s3-upload-ash`: \
&nbsp;&nbsp;&nbsp;&nbsp;`npm install aws-s3-upload-ash`\
Tạo thuộc tính trong một object để kết nối với S3:\
config =  {\
&nbsp;bucketName: `YOUR_BUCKET_NAME`,\
&nbsp;region: `REGION OF BUCKET`,\
&nbsp;accessKeyId: `YOUR ACCESS KEY ID`,\
&nbsp;secretAccessKey: `YOUR SECRET ACCESS KEY`,\
&nbsp;s3Url: `https://{YOUR_BUCKET_NAME}.s3.amazonaws.com`\
}

Khai báo đối tượng từ `AWSS3UploadAshClient` class\
Example: S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(config);

Để tải ảnh từ Angular đến Amazon S3, bạn cần sử dụng promise `uploadFile`
Example: `this.S3CustomClient.uploadFile({YOUR FILE}, {TYPE OF FILE}, {OPTIONAL: presignedURL}, {KEY}, {order})`


## Configure Amazon EC2 to host Angular Project
<strong>Cấu hình Dockerfile</strong>

FROM node:16.13.0 as node\
WORKDIR /appcd\
COPY . .\
RUN npm install\
RUN npm run build --prod

FROM nginx:1.17.1-alpine\
COPY --from=node /app/dist/angular-app /usr/share/nginx/html

<strong>Xây dựng dự án Angular</strong>

`ng build --prod`

<strong>Tạo Docker image</strong>

(Bạn phải chạy docker desktop trên máy)\
docker build -t `PROJECT_NAME` `PATH`\
docker run -d -it -p 80:80/tcp --name {SET_NAME}  `PROJECT_NAME`:latest

<strong>Đưa docker image lên docker hub</strong>

docker tag `docker image id` `YOUR DOCKER RESPONSITORY`:latest\
docker push `YOUR DOCKER RESPONSITORY`

<strong>Tạo launce trong EC2</strong>

Configuration in EC2:\
&nbsp;Chọn Community sau đó tìm kiếm Clound9Ubuntu và chọn lựa chọn đầu tiên của AWS\
&nbsp;Chọn gói bạn cần ví dụ như t3.large\
&nbsp;Chọn dung lượng phần cứng. Recommend 32GB\
&nbsp;Mở port 80\
&nbsp;Download key\
&nbsp;Quay lại máy tính của bạn và mở terminal trong thư mục có khóa này\
&nbsp;Việc kết nối EC2 hoàn tất

<strong>Chạy dự án trong EC2</strong>

&nbsp;docker pull `YOUR IMAGE ID IN DOCKER HUB`\
&nbsp;docker run -d -it -p 80:80/tcp --name {SET_NAME}  `PROJECT_NAME`:latest\
&nbsp;Sau khi chạy 2 lệnh trên, dự án của bạn đã chạy trên port 80 của EC2

# Call API from Front-end to Back-end

<h3>Tạo tầng Service</h3>
ng g s `PATH`

<h3>Gọi API trong tầng Service</h3>
Trong file app.module.ts:<br/>
&nbsp; import {HttpClientModule} from '@angular/common/http';<br/>
&nbsp; Khai báo module HttpClientModule trong mảng imports<br/>

<h3>(Optional) Tạo Interface</h3>
Interface là một đối tượng giúp trao đổi dữ liệu giữa file với file hoặc là Front-end với Back-end và ngược lại

<h3>Gọi API</h3>
Trong file Service:<br/>
&nbsp; import {HttpClient, HttpHeaders} from '@angular/common/http'<br/>
&nbsp; Khai báo đối tượng từ lớp HttpClient<br/>
&nbsp; Chỉ cần gọi API như POST, PUT, DELETE, GET trong các hàm bên trong file service đó