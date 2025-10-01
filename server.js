const express = require("express")
const dbhandler = require("./dbhandler")  
const { FORCE } = require("sequelize/lib/index-hints")


const server = express()
server.use(express.json())

const port = 3000


dbhandler.cars.sync({alter:true})
dbhandler.manufacturers.sync({alter:true})
dbhandler.owner.sync({alter:true})



server.get("/getcar", async (req, res) => {
 
   res.json(await dbhandler.cars.findAll({
      include: [{
         name: dbhandler.manufacturers,
         attributes: ['name']
      }]
   })).end()
})
server.post("/createcar",async(req,res) =>{
    const onecar = await dbhandler.cars.findone({
        where:{
     manufacturersid: req.body.manufacturersid,
     model : req.body.model,
     power : req.body.power,
     makeyear: req.body.makeyear,
     tyresize : req.body.tyresize
        }
    })
    if(onecar){
        return res.status(400).json("message : van mar ilyen auto")
    }
    await dbhandler.cars.create({
     manufacturersid: req.body.manufacturersid,
     model : req.body.model,
     power : req.body.power,
     makeyear: req.body.makeyear,
     tyresize : req.body.tyresize
    })
        res.status(201).json({ "message":"auto sikeresen letreheozva."}).end()
})

server.put("/createcars",async (req,res)=>{
    if(!req.body.id){
        return res.status(400).json({"message": "hianyzo auto id"}).end()
    }
    if(req.body.power){
        await dbhandler.cars.update({
            power : req.body.power
        }, {
            where:{
                id:req.body.id
            }
        })
       
    }
    if(req.body.tyresize){
        await dbhandler.cars.update({
            tyresize : req.body.tyresize
        }, {
            where:{
                id:req.body.id
            }
        })
       
    }
    res.json({"message": "sikeres modositas"}).end()
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
         model: dbhandler.cars,
         attributes: ['model']
      }]
   })).end()
})
server.put("owner",async (req,res)=>{
    if(!req.body.id){
        return res.status(400).json({"message": "hianyzo auto id"}).end()
    }
    if(req.body.name){
        await dbhandler.owner.update({
            name : req.body.name
        }, {
            where:{
                id:req.body.id
            }
        })
       
    }
    if(req.body.address){
        await dbhandler.owner.update({
            address : req.body.address
        }, {
            where:{
                id:req.body.id
            }
        })
       
    }
    res.json({"message": "sikeres modositas"}).end()
})

server.post("/createowner",async(req,res) =>{
         const oneowner = await dbhandler.owner.findone({
        where:{
     carsid: req.body.carsid,
     name : req.body.name,
     address : req.body.address,
     birthyear: req.body.birthyear
        }
    })
    if(oneowner){
         return res.status(400).json("message : van mar ilyen tulajdonos").end() 
    await dbhandler.owner.create({
     carsid: req.body.carsid,
     name : req.body.name,
     address : req.body.address,
     birthyear: req.body.birthyear
    })
    res.status(201).json({ "message":"tulajdonos sikeresen letrehozva."}).end()
}})
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
server.put("manufacturer",async (req,res)=>{
    if(!req.body.id){
        return res.status(400).json({"message": "hianyzo auto id"}).end()
    }
    if(req.body.name){
        await dbhandler.manufacturers.update({
            name : req.body.name
        }, {
            where:{
                id:req.body.id
            }
        })
       
    }
    if(req.body.country){
        await dbhandler.manufacturers.update({
            country : req.body.country
        }, {
            where:{
                id:req.body.id
            }
        })
       
    }
    res.json({"message": "sikeres modositas"}).end()
})

server.post("/createmanufacturer",async(req,res) =>{
     const onemanufactuer = await dbhandler.manufacturers.findone({
        where:{
     name : req.body.name,
     launchyear : req.body.launchyear,
     country: req.body.country,
       makeyear: req.body.makeyear
        }
    })
    if(onemanufactuer){
         return res.status(400).json("message : van mar ilyen márka").end() 
    }
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