const EthernetRouter = require('./ethernet/ethernet');
const WifiRouter = require('./wifi/wifi');
const NetworkLayerRouter = require('./networkLayer/networkLayer');
const ApplicationLayerRouter = require('./applicationLayer/applicationLayer');
const PolygonRouter = require('./polygon/polygon');
const LinkLayerRouter = require('./linkLayer/linkLayer');
const DeviceRouter = require('./device/device');
const ConfigDeviceRouter = require('./configDevice/configDevice');
const RoomRouter = require('./room/room');
const UserRouter = require('./user/user');

// const PopulateAll = require('../populate/insert_all');
const PopulateRouter = require('./populate/populate');

module.exports = app => {
  //* Populate
  app.use('/api/populate', PopulateRouter);

  //* Ethernet router
  app.use('/api/ethernet', EthernetRouter);
  //* Wifi router
  app.use('/api/wifi', WifiRouter);
  //* NetLayer router
  app.use('/api/net_layer', NetworkLayerRouter);
  //* AppLayer router
  app.use('/api/app_layer', ApplicationLayerRouter);
  //* Polygon router
  app.use('/api/polygon', PolygonRouter);
  //* LinkLayer router
  app.use('/api/link_layer', LinkLayerRouter);
  //* Device router
  app.use('/api/device', DeviceRouter);
  //* ConfigDevice router
  app.use('/api/conf_device', ConfigDeviceRouter);
  //* Room router
  app.use('/api/room', RoomRouter);
  //* User router
  app.use('/api/user', UserRouter);
};
