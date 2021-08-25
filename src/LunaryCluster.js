// const app = require("express")()
// app.get("/", (req, res) => {
//     res.send("Ok")
// })

// app.listen(8080, "0.0.0.0")

const Manager = require("./system/cluster/ClusterManager");
let {token} = require("./config/config");
const Logger = require("./utils/logger");
const manager = new Manager(`${__dirname}/Lunary.js`,{
    totalShards: 2,
    totalClusters: 2, 
    mode: "process",
    token: token
})

manager.on('clusterCreate', cluster => Logger.log(`Cluster criado!`, { key: "System", cluster: cluster, date: true }));
manager.spawn()