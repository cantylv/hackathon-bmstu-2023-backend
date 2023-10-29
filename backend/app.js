import * as model from "./models.js";
import express from "express";
const app = express();

const PORT = 3001;
import  {WebSocketServer} from 'ws';
import http from 'http';
const server = http.createServer(app);
app.use(express.json());

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', ws => {
  console.log("connected");
   ws.on('message', m => {
    console.log("m");
   });

   ws.on("error", e => ws.send(e));

   
  
   
   
   ws.send('Hi there, I am a WebSocket server');
});

app.post('/station_change',(req, res) => {
    //отправить в бд
    model.getStations()
    .then((response)=>{
      webSocketServer.on('connection', ws => {
      ws.send(req.body.toString());})
      console.log("got info ")
    })
    .catch((err)=>{
      ws.send(err)
    }
  )
  /*try {
  webSocketServer.on('connection', ws => {
    ws.send(req.body.toString());
  })
  } catch(e) {
    console.log(e)
  }
  console.log("got info ")*/
}) 
app.get(`/station`, (request, res) => {
  model
  .getStations()
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
  

});

app.post('/station', async (req, res) => {

  console.log(req.body.id);
  // Опции для POST-запроса на веб-сервисе
  const options = {
    method: 'post',
    url: 'http://127.0.0.1:3000/update',
    data: req.body,
  };

  // Отправка POST-запроса на другой сервис
  const response = await axios(options);

});



//почитать про await, переделать в 2 строчки
//добавить одельно обработчик ошибок в express
server.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})
