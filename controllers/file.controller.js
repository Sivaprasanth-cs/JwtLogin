const fs = require("fs");
const winston = require("winston");
const logger = require("../controllers/logger");
const path = require("path");
const readLine = require("readline");


const readFile = async (req, res) => {
  logger.userLogger.log("info", "Success");
  console.log("readFile");
  // let jsonArray = [];

  // fs.readFile('./Aligntech_Amalgam_Set2__B (1).json',(err, buf)=>{
  //     console.log(buf.toString());
  //     jsonArray.push(buf.toString());
  // });
  console.log(
    path.resolve(process.cwd(), "D:\\Pronotate Tasks\\JWT Token verification")
  );
  
  // const data = await fs.readFileSync(path.resolve(process.cwd(), './Aligntech_Amalgam_Set2__B (2).json'),'utf-8');
  // data.toJSON();

   let jsonArray = [];
  var lineReader = readLine.createInterface({
    input: fs.createReadStream(path.resolve(process.cwd(), './Aligntech_Amalgam_Set2__B (2).json')),
  });

  lineReader.on("line",  (line) => {
    
    jsonArray.push(JSON.parse(line));
  });

  lineReader.on("close",() =>{
    res.send(jsonArray);
  })

  lineReader.on("error",(error) => {
    console.log(error);
  })

  logger.userLogger.log("info", "Success");
  
};

module.exports = {
  readFile,
};
