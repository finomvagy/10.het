const manufacturerList = document.getElementById("manufacturerList");
const carList = document.getElementById("carList");
const ownerList = document.getElementById("ownerList");

async function createManufacturer(){
    const request = await fetch("/createmanufacturer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: manufacturerNameInput.value,
            launchyear: manufacturerLaunchYearInput.value,
            country: manufacturerCountryInput.value,
            makeyear: manufacturerMakeYearInput.value
        })
    })
    console.log(request);

    const response = await request.json()
    console.log(response);
    alert(response.message);
}

async function createCar(){
    const request = await fetch("/createcar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            manufacturersid: carManufacturerIdInput.value,
            model: carModelInput.value,
            power: carPowerInput.value,
            makeyear: carMakeYearInput.value,
            tyresize: carTyreSizeInput.value
        })
    })
    console.log(request);

    const response = await request.json()
    console.log(response);
    alert(response.message);
}

async function createOwner(){
    const request = await fetch("/createowner", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            carsid: ownerCarIdInput.value,
            name: ownerNameInput.value,
            address: ownerAddressInput.value,
            birthyear: ownerBirthYearInput.value
        })
    })
    console.log(request);
    
    const response = await request.json()
    console.log(response);
    alert(response.message);
}

async function getManufacturers(){
    const response = await fetch("/getmanufacturer")
    const result = await response.json()
    manufacturerList.style.lineHeight = "1.8"
    for (let item of result) {
        console.log(item)
        const li = document.createElement("li")
        const deletButton = document.createElement("button")

        li.textContent = `id: ${item.id}, név: ${item.name}, alapítási év: ${item.launchyear}, ország: ${item.country}, gyártási év: ${item.makeyear}`

        li.appendChild(deletButton)
        manufacturerList.appendChild(li)

        deletButton.innerText = "Törlés"
        deletButton.style.marginLeft = "15px"

        deletButton.addEventListener("click", () => {
            li.remove()
            fetch("/deletemanufacturer/"+item.id, {
                method: "DELETE"
            })
        })
    }
}

async function getCars() {
    const response = await fetch("/getcar")
    const result = await response.json()
    carList.style.lineHeight = "1.8"
    for (let item of result) {
        console.log(item)
        const li = document.createElement("li")
        const deletButton = document.createElement("button")

        li.textContent = `id: ${item.id}, gyártó: ${item.manufacturer.name}, modell: ${item.model}, teljesítmény: ${item.power} LE, gyártási év: ${item.makeyear}, kerékméret: ${item.tyresize}"`

        li.appendChild(deletButton)
        carList.appendChild(li)

        deletButton.innerText = "Törlés"
        deletButton.style.marginLeft = "15px"

        deletButton.addEventListener("click", () => {
            li.remove()
            fetch("/deletecar/"+item.id, {
                method: "DELETE"
            })
        })
    }
}

async function getOwners() {
    const response = await fetch("/getowner")
    const result = await response.json()
    ownerList.style.lineHeight = "1.8"
    for (let item of result) {
        console.log(item)
        const li = document.createElement("li")
        const deletButton = document.createElement("button")

        li.textContent = `id: ${item.id}, név: ${item.name}, cím: ${item.address}, születési év: ${item.birthyear}, autó modell: ${item.car.model}`

        li.appendChild(deletButton)
        ownerList.appendChild(li)

        deletButton.innerText = "Törlés"
        deletButton.style.marginLeft = "15px"

        deletButton.addEventListener("click", () => {
            li.remove()
            fetch("/deleteowner/"+item.id, {
                method: "DELETE"
            })
        })
    }
}

getManufacturers()
getCars()
getOwners()