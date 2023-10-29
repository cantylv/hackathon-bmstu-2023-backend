import * as model from "./models.js";
import express from "express";
const app = express();

const port = 3001;
import  {WebSocketServer} from 'ws';
import http from 'http';
const server = http.createServer(app);

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', ws => {
  console.log("connected");
   ws.on('message', m => {
    console.log("m");
   });

   ws.on("error", e => ws.send(e));

   app.post('/station_charge',(req, res) => {
    //отправить в бд
    model.getStations()
    .then((response)=>{

      ws.send(response);
      console.log("got info ")
    })
    .catch((err)=>
      ws.send(501)
    )
  
   })
   
   ws.send('Hi there, I am a WebSocket server');
});




//почитать про await, переделать в 2 строчки
//добавить одельно обработчик ошибок в express
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json());


app.get(`/station/:id`, (request, res) => {
 /* model
  .getStations()
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.status(500).send(error);
  });*/
  res.status(200).send("ok")

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

app.post('/station_change', async (req, res) => {
  console.log(req.body);
  res.status(200).send();
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})