const express = require("express");
const os = require("os");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({
        message: "Hello Kubernetes 1.0.4",
        hostname: os.hostname(),
        podIP: getPodIP(),
        nodeName: process.env.NODE_NAME || "unknown",
        appEnv: process.env.APP_ENV || "unknown",
        appName: process.env.APP_NAME || "unknown",
        dbPass: process.env.DB_PASSWORD || "unknown",
        dbUser: process.env.DB_USERNAME || "unknown",
        nodeIP: process.env.NODE_IP || "unknown"
    });
});

app.get("/healthz", (req, res) => {
    res.json({
        status: "ok"
    });
});

function getPodIP() {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        for (const network of interfaces[name]) {
            if (network.family === "IPv4" && !network.internal) {
                return network.address;
            }
        }
    }

    return "unknown";
}

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
});