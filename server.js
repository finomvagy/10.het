const express = require("express")
const dbhandler = require("./dbhandler")  



const server = express()
server.use(express.json())
server.use(express.static('public'))
const port = 3000



server.get("/getcar", async (req, res) => {
   res.json(await dbhandler.cars.findAll({
      include: [{
         model: dbhandler.manufacturers,
         attributes: ['name']
      }]
   })).end()
})

server.post("/createcar",async(req,res) =>{
    const onecar = await dbhandler.cars.findOne({
        where:{
            manufacturersid: req.body.manufacturersid,
            model : req.body.model
        }
    })
    if(onecar){
        return res.status(400).json({message : "van mar ilyen auto"}).end()
    }
    await dbhandler.cars.create({
        manufacturersid: req.body.manufacturersid,
        model : req.body.model,
        power : req.body.power,
        makeyear: req.body.makeyear,
        tyresize : req.body.tyresize
    })
    res.status(201).json({ "message":"auto sikeresen letrehozva."}).end()
})

server.put("/createcars",async (req,res)=>{
    if(!req.body.id){
        return res.status(400).json({"message": "hianyzo auto id"}).end()
    }
    const carToUpdate = await dbhandler.cars.findByPk(req.body.id);
    if (!carToUpdate) {
        return res.status(404).json({"message": "nincs ilyen auto"}).end();
    }

    const updateData = {};
    if(req.body.power) updateData.power = req.body.power;
    if(req.body.tyresize) updateData.tyresize = req.body.tyresize;

    await dbhandler.cars.update(updateData, {
        where: { id: req.body.id }
    });
   
    res.json({"message": "sikeres modositas"}).end()
})

server.delete("/deletecar/:id", async (req,res)=>{
    const id = req.params.id

    const onecar = await dbhandler.cars.findOne({
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
        res.json({message:"sikeres torles"}).end()
    } else {
        res.status(404).json({message:"nincs ilyen auto"}).end()
    }
})

server.get("/getowner", async (req, res) => {
   res.json(await dbhandler.owner.findAll({
      include: [{
         model: dbhandler.cars,
         attributes: ['model']
      }]
   })).end()
})
server.put("/owner",async (req,res)=>{
    if(!req.body.id){
        return res.status(400).json({"message": "hianyzo tulajdonos id"}).end()
    }
    const ownerToUpdate = await dbhandler.owner.findByPk(req.body.id);
    if (!ownerToUpdate) {
        return res.status(404).json({"message": "nincs ilyen tulajdonos"}).end();
    }
    
    const updateData = {};
    if(req.body.name) updateData.name = req.body.name;
    if(req.body.address) updateData.address = req.body.address;
    
    await dbhandler.owner.update(updateData, {
        where:{ id:req.body.id }
    });
       
    res.json({"message": "sikeres modositas"}).end()
})

server.post("/createowner",async(req,res) =>{
    const oneowner = await dbhandler.owner.findOne({
        where:{
            name : req.body.name,
            carsid: req.body.carsid
        }
    })
    if(oneowner){
        return res.status(400).json({message : "van mar ilyen tulajdonos"}).end() 
    }
    await dbhandler.owner.create({
        carsid: req.body.carsid,
        name : req.body.name,
        address : req.body.address,
        birthyear: req.body.birthyear
    })
    res.status(201).json({ "message":"tulajdonos sikeresen letrehozva."}).end()
})

server.delete("/deleteowner/:id", async (req,res)=>{
    const id = req.params.id

    const oneowner = await dbhandler.owner.findOne({
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
        res.json({message:"sikeres torles"}).end()
    } else {
        res.status(404).json({message:"nincs ilyen tulajdonos"}).end()
    }
})

server.get("/getmanufacturer", async (req, res) => {
   res.json(await dbhandler.manufacturers.findAll()).end()
})

server.put("/manufacturer",async (req,res)=>{
    if(!req.body.id){
        return res.status(400).json({"message": "hianyzo gyarto id"}).end()
    }
    const manuToUpdate = await dbhandler.manufacturers.findByPk(req.body.id);
    if (!manuToUpdate) {
        return res.status(404).json({"message": "nincs ilyen gyarto"}).end();
    }

    const updateData = {};
    if(req.body.name) updateData.name = req.body.name;
    if(req.body.country) updateData.country = req.body.country;

    await dbhandler.manufacturers.update(updateData, {
        where: { id: req.body.id }
    });
       
    res.json({"message": "sikeres modositas"}).end()
})

server.post("/createmanufacturer",async(req,res) =>{
    const onemanufactuer = await dbhandler.manufacturers.findOne({
        where:{
            name : req.body.name,
        }
    })
    if(onemanufactuer){
         return res.status(400).json({message : "van mar ilyen márka"}).end() 
    }
    await dbhandler.manufacturers.create({
      name : req.body.name,
      launchyear : req.body.launchyear,
      country: req.body.country,
      makeyear: req.body.makeyear
    })
    res.status(201).json({ "message":"márka sikeresen letrehozva."}).end()
})

server.delete("/deletemanufacturer/:id", async (req,res)=>{
    const id = req.params.id

    const onemanufactuer = await dbhandler.manufacturers.findOne({
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
        res.json({message:"sikeres torles"}).end()
    } else {
        res.status(404).json({message:"nincs ilyen marka"}).end()
    }
})

server.listen(port, () => console.log(`szerver fut a ${port} porton`))