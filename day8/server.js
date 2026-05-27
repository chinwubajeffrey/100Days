const { log } = require("console");
const http = require("http");
const { type } = require("os");
const app = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("welcome to the home page homie");
    console.log("welcome my gee");
    res.end();
  } else if (req.url === "/about") {
    console.log("about");
    res.writeHead(200, "text/plain");
    res.write(" about page my nigga");
    res.end();
  } else if (req.url === "/contact") {
    res.writeHead(200, "text/plain");
    console.log("contact");
    res.write("Contact what my gee");
    res.end();
  } else if (req.url === "/echo") {
    const body = [];
    req.on("data", (chunks) => body.push(chunks));
    req.on("end", () => {
      let text = Buffer.concat(body).toString();
      res.writeHead(200, "OK", { "content-type": "text/plain" });
      res.write(text);
      res.end();
    });
  } else {
    res.writeHead(404, "text/plain");
    res.write("Where you going my nigga?, 404");
    res.end();
  }
});

app.listen(3000, () => console.log("The server is running on port 3000"));
