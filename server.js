const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req,res){
    const about = {
        avatar_url:"https://avatars1.githubusercontent.com/u/67061640?s=460&u=110ab3479efaaf9c08820095913730613508eeb8&v=4",
        name:"Renato Pereira",
        role:"programador Jr- Java Script",
        description: 'Programador JR em java script front-end, back-and, focado em trazer o melhor para a empresa, aluno da <a href="https://rocketseat.com.br" target="blank">rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/reenturia" },
            { name: "linkedin", url: "https://www.linkedin.com/in/renatoenturia" }

        ]
    }

    return res.render("about", {about})
})

server.get("/portfolio", function(req,res){
    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req,res){
    const id = req.query.id
    const video = videos.find(function(video){
        if (video.id == id){
            return true
        }
    })
    if (!video) {
        return res.send("video not found!")
    }

    return res.render("video", {item: video})

})

server.listen(5000, function(){
    console.log("server is running")
})