const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer');
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({extended:true}))

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

// Cria um diskStora
// Destiation, cb (callback) é o caminho que o arquivo vai 
// Filename, nome que o arquivo terá
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        dataAtual = 
        cb(null, file.fieldname+'-'+today.toISOString()+path.extname(file.originalname))
    }
})

const upload = multer({storage})

//Pagina inicial que chama(lê) o arquivo index.html
app.get('/', (req, res)=>{ 
    // res.json({Message: 'Hello, world!'});
    res.sendFile(__dirname+'/index.html');
})

//Caminho post, quando for /arquivo
//Verifica se o arquivo da requisição é nullo
//Caso não ele mostra a mensagem de sucesso e faz o upload
app.post('/upload', upload.single('arquivo'), (req, res, next) => {

const file = req.file
if(!file){
    const err = new Error('Por favor, selecione um arquivo!')
    err.httpStatusCode = 400
    return next(err)
} else {
    res.send(file)
    res.end('Upload realizado com sucesso!')
}
})

app.listen(3000, '127.0.0.1', ()=>{
    console.log('Server running on 127.0.0.1:3000')
})
