const { remote } = require("electron");
const { shell } = require("electron");
const { dialog, app } = require("electron").remote;
const savePath = "./downloaded_images";