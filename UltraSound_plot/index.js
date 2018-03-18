const SerialPort = require('serialport');
//const fs = require("fs");
const express = require("express");

const Point = (X, Y) =>{
  return {x:X, y:Y};
}

const DataContainer = () =>{

  let array = new Array(360);
  array.fill(Point(0,0));

  const parseInput = str => {
    const values = str.split(";");

    const angle1 = parseInt(values[0]);
    const dist1 = parseInt(values[1]);
   // const angle2 = parseInt(values[2]);
  //const dist2 = parseInt(values[3]);

    setValue(angle1, dist1);
   // setValue(angle2, dist2);
  }

  const setValue = (angle, dist) => {
    const radAngle = angle * Math.PI/180;

    const x = dist * Math.cos(radAngle);
    const y = dist * Math.sin(radAngle);
    array[angle] = Point(x, y);

    //save the data in a file, for debug only
    /*if(angle === 180)
    {
      fs.appendFile('./data.json', '');
      fs.writeFile('./data.json', JSON.stringify(array), "utf-8");
    }*/
  }

  return{
    getArray: () => {return array;},
    parseInput: str => {parseInput(str);}
  };
}

const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM6');
//const port = new SerialPort("/dev/tty-usbserial1");
const parser = port.pipe(new Readline());

const dataContainer = DataContainer();

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) =>
{
    response.sendFile("index.html");
});

app.get('/api/data/', (request, response) =>
{
    response.json(dataContainer.getArray());
});

app.listen(3000, function()
{
    console.log("listening on port 3000");

  //item to store and handle data easily
  parser.on('data', res => {
    dataContainer.parseInput(res);
  });
});