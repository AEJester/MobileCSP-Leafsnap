const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const DB = require("data-chest");

app.set("view engine", "ejs");
app.set("views", require("path").join(__dirname, "views/"))

app.get("/", (req, res) => {
    res.render("index", {likes: DB.get("likes", "likes")});
});

io.on("connection", (socket) => {
    socket.on("like", () => {
        let likes = parseInt(DB.get("likes", "likes", 0));
        likes = likes + 1;
        DB.store("likes", likes, "likes");
        io.emit("like", likes)
    });
    socket.on("unlike", () => {
        let likes = parseInt(DB.get("likes", "likes", 0));
        likes = likes - 1;
        DB.store("likes", likes, "likes");
        io.emit("unlike", likes)
    });
});

app.get("/browser", (req, res) => {
    res.render("browser");
});

app.get("/features", (req, res) => {
    res.render("features");
});

app.get("/uses", (req, res) => {
   res.render("uses"); 
});

http.listen(8000, () => {
    console.log("Leafsnap-Project is running on port 8000");
});