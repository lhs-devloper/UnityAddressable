import express from 'express';

const app = express();

const PORT = 4000;

const handleListening = () => {
    console.log(`http://localhost:${PORT}`)
}

app.use(express.static("public"))
// Server디렉터리 안에 public디렉터리를 생성해주세여 이후
// Unity에서 생성한 Addressable파일들(bundle, json, hash)을 
// 상위 디렉터리(StandaloneWindows64) 째로 public디렉터리로 옮겨주세여
app.listen(PORT, handleListening)