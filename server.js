const express = require("express")
const dbhandler = require("./dbhandler")  

const server = express()
server.use(express.json())

const port = 3000




server.get("/getcar", async (req, res) => {
 
   res.json(await dbhandler.cars.findAll({
      include: [{
         name: dbhandler.manufacturers,
         attributes: ['name']
      }]
   })).end()
})
server.post("/createcar",async(req,res) =>{
    await dbhandler.cars.create({
     manufacturersid: req.body.manufacturersid,
     model : req.body.model,
     power : req.body.power,
     makeyear: req.body.makeyear,
     tyresize : req.body.tyresize
    })
        res.status(201).json({ "message":"auto sikeresen letreheozva."}).end()
})

server.delete("/deletecar:id", async (req,res)=>{
    const id = req.params.id

    const onecar = await dbhandler.cars.findone({
        where:{
            id:id
        }
    })
    if(onecar){
        await dbhandler.cars.destroy({
            where:{
                   id:id
            }
             
        })
        res.json("message:sikeresen torles").end()
    }
     res.json("message:nincs ilyen tabla").end()
})

server.get("/getowner", async (req, res) => {
 
   res.json(await dbhandler.owner.findAll({
      include: [{
         model: dbhandler.manufacturers,
         attributes: ['model']
      }]
   })).end()
})
server.post("/createowner",async(req,res) =>{
    await dbhandler.cars.create({
     carid: req.body.carid,
      name : req.body.name,
     address : req.body.address,
     birthyear: req.body.birthyear
    })
        res.status(201).json({ "message":"tulajdonos sikeresen letreheozva."}).end()
})

server.delete("/deleteowner:id", async (req,res)=>{
    const id = req.params.id

    const oneowner = await dbhandler.owner.findone({
        where:{
            id:id
        }
    })
    if(oneowner){
        await dbhandler.owner.destroy({
            where:{
                   id:id
            }
             
        })
        res.json("message:sikeresen torles").end()
    }
     res.json("message:nincs ilyen tabla").end()
})

server.get("/getmanufacturer", async (req, res) => {
 
   res.json(await dbhandler.manufacturers.findAll()).end()
})
server.post("/createmanufacturer",async(req,res) =>{
    await dbhandler.manufacturers.create({
      name : req.body.name,
     launchyear : req.body.launchyear,
     country: req.body.country,
       makeyear: req.body.makeyear
    })
        res.status(201).json({ "message":"márka sikeresen letreheozva."}).end()
})

server.delete("/deletemanufacturer:id", async (req,res)=>{
    const id = req.params.id

    const onemanufactuer = await dbhandler.manufacturers.findone({
        where:{
            id:id
        }
    })
    if(onemanufactuer){
        await dbhandler.manufacturers.destroy({
            where:{
                   id:id
            }
             
        })
        res.json("message:sikeresen torles").end()
    }
     res.json("message:nincs ilyen tabla").end()
})

server.listen(port, () => console.log(`szerver fut a ${port} porton`))