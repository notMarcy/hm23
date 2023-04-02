let fs = require('fs')
let express = require('express')
let path = require('path')

let server = express();
server.use(express.static("./pages"));

server.set('views', './');
server.set('view engine', 'ejs')
let data;

let usersArray = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]

let nameArray = ['Den', 'Ben', 'Carl', 'Zak','Anna', 'Masha', 'Joseph', 'Igor', 'Roma', 'John', 'Kate', 'Ram', 'Angela', 'J.', 'Frank', 'Cookie', 'Bruh', 'chel', 'Antoha', 'Kartophan', 'Princess', 'Hhaha', 'gray', 'man', 'human', 'tired']
let surnameArray = ['Smith', 'Klark', 'Watson', 'Rich', 'Richmond', 'Jackson', 'Smirnoff', 'Ivanoff','Snake', 'Potter', 'Array', 'Object', 'Red', 'Hanks', 'Frankenstine']

//создание 30 пользователей
for(let i = 0; i<30; i++){
    usersArray[i].name = nameArray[Math.floor(Math.random()*nameArray.length)];
    usersArray[i].surname = surnameArray[Math.floor(Math.random()*surnameArray.length)]
    usersArray[i].age = Math.floor(Math.random()*101)
}


//добавление пользователей в базу данных
fs.writeFileSync("./database.json", JSON.stringify(usersArray))

fs.readFile("./database.json", 'utf8', (err, text) => {
    if(err) console.log(err)
    else data = text;
})

server.get('*', (req,res) => {

    if(req.url == '/' || req.url == '/home' || req.url == '/main'){
       res.status(200).render(path.resolve(__dirname, `./pages/home.ejs`)) 
    }
    else if (req.url == '/list'){
        res.status(200).render(path.resolve(__dirname, `./pages/list.ejs`), { data })
    }

})

server.listen(3000, (error) => {
    error ? console.log(error) : console.log('server listening on the 3000 port')
})




