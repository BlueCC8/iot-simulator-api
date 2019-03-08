const Wifi = require('../models/Wifi');
const Ethernet = require('../models/Ethernet');
const NetworkLayer = require('../models/NetworkLayer');
const ApplicationLayer = require('../models/ApplicationLayer');
const Polygon = require('../models/Polygon');
const LinkLayer = require('../models/LinkLayer');
const Device = require('../models/Device');
const ConfigDevice = require('../models/ConfigDevice');
const Room = require('../models/Room');
const User = require('../models/User');
const DbData = require('./db_data');

const { ethernetArr } = DbData;
const { wifiArr } = DbData;
const { networkLayerArr } = DbData;
const { appLayerArr } = DbData;
const { polygonArr } = DbData;
const { linkLayerArr } = DbData;
const { deviceArr } = DbData;
const { configDeviceArr } = DbData;
const { roomArr } = DbData;
const { userArr } = DbData;

/**
 * Creates the instances of the reach object from it's collection.
 * ! All created instances are promises
 */
async function createInstances() {
  // 1
  ethernetArr.forEach((element, index, theArr) => {
    theArr[index] = new Ethernet(element);
  });
  // 2
  wifiArr.forEach((element, index, theArr) => {
    theArr[index] = new Wifi(element);
  });
  // 3
  networkLayerArr.forEach((element, index, theArr) => {
    theArr[index] = new NetworkLayer(element);
  });
  // 4
  appLayerArr.forEach((element, index, theArr) => {
    theArr[index] = new ApplicationLayer(element);
  });
  // 5
  polygonArr.forEach((element, index, theArr) => {
    theArr[index] = new Polygon(element);
  });
  // 6
  linkLayerArr.forEach((element, index, theArr) => {
    theArr[index] = new LinkLayer(element);
  });
  // 7
  deviceArr.forEach((element, index, theArr) => {
    theArr[index] = new Device(element);
  });
  // 8
  configDeviceArr.forEach((element, index, theArr) => {
    theArr[index] = new ConfigDevice(element);
  });
  // 9
  roomArr.forEach((element, index, theArr) => {
    theArr[index] = new Room(element);
  });
  // 10
  userArr.forEach((element, index, theArr) => {
    theArr[index] = new User(element);
  });
}

/**
 * Pushes the references to their collections
 * @see 'models'
 */
async function pushRefs() {
  // ! Push only if it's an arr there
  // * Devices go to Configs device
  configDeviceArr.forEach((element, index, theArr) => {
    theArr[index].devIDs.push(deviceArr[0]);
  });

  // * Configs device go to Rooms
  roomArr.forEach((element, index, theArr) => {
    theArr[index].configDevIDs.push(configDeviceArr[0]);
  });

  // * Rooms go to Users
  userArr.forEach((element, index, theArr) => {
    theArr[index].roomIDs.push(roomArr[0]);
  });

  // * Link Layer
  // send an entire object
  linkLayerArr[0].llWifiID = wifiArr[0];
  linkLayerArr[0].llEthernetID = ethernetArr[0];

  // * Device
  deviceArr[0].appLayerID = appLayerArr[0];
  deviceArr[0].netLayerID = networkLayerArr[0];
  deviceArr[0].linLayerID = linkLayerArr[0];

  // * Room
  roomArr[0].polID = polygonArr[0];
}
/**
 * Saves the instances and actually creates them by saving.
 */
async function saveInstances() {
  // 1
  ethernetArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 2
  wifiArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 3
  networkLayerArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 4
  appLayerArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 5
  linkLayerArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 6
  deviceArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 7
  configDeviceArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 8
  polygonArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 9
  roomArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
  // 10
  userArr.forEach((element, index, theArr) => {
    theArr[index] = element.save();
  });
}
async function executeQuery() {
  // AWAIT THE CREATION
  await createInstances();
  console.log('Before push');
  // PUSH EVERYTHING
  await pushRefs();
  console.log('Before save');
  await saveInstances();
  console.log('After save');
}

module.exports = {
  insertData(req, res, next) {
    let allPromises = [];
    executeQuery();
    // ! THE ORDER MATTERS
    allPromises = [
      ...wifiArr,
      ...ethernetArr,
      ...networkLayerArr,
      ...appLayerArr,
      ...linkLayerArr,
      ...deviceArr,
      ...configDeviceArr,
      ...polygonArr,
      ...roomArr,
      ...userArr
    ];

    console.log('done init save');
    // * COMMIT
    Promise.all(allPromises)
      .then(data => {
        res.status(200).send(data);
      })
      // })
      .catch(next);
  }
};
