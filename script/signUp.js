let users = [];


const BASE_URL = "https://joinproject-88615-default-rtdb.europe-west1.firebasedatabase.app/"

function signUp() {


    postData("/user", 33 , {"userName": "Harald"});

    
}

async function postData(path="", id, data={}){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id, data)
    });
    return responseToJson = await response.json();
}