import express from 'express';

const app = express();

const PORT = 4000;

const handleListening = () => {
    console.log(`http://localhost:${PORT}`)
}

app.use(express.static("public"))
// Unity에서 생성한 Addressable파일들(bundle, json, hash)을 
// 상위 폴더(StandaloneWindows64) 째로 public폴더로 옮겨주세여
app.listen(PORT, handleListening)