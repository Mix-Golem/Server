#노드 버젼 설정
FROM node:20.17.0
#도커가 배포될때 경로
WORKDIR /app
#package.json , package-lock.json 복사
COPY package*.json /app/
#node 모듈 설치
RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "npm","start" ]