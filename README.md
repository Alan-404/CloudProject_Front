# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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