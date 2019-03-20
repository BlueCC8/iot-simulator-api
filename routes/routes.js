const EthernetController = require('../controllers/Ethernet_controller');
const WifiController = require('../controllers/Wifi_controller');
const NetworkLayerController = require('../controllers/NetworkLayer_controller');
const ApplicationLayerController = require('../controllers/ApplicationLayer_controller');
const PolygonController = require('../controllers/Polygon_controller');
const LinkLayerController = require('../controllers/LinkLayer_controller');
const DeviceController = require('../controllers/Device_controller');
const ConfigDeviceController = require('../controllers/ConfigDevice_controller');
const RoomController = require('../controllers/Room_controller');
const UserController = require('../controllers/User_controller');

const PopulateAll = require('../populate/insert_all');
const PopulateSubdocuments = require('../populate/populate_subdocuments');

const PassportController = require('../config/passport/passport_controller');
// * Passport middleware
// const { loggedOutOnly } = PassportController;
// const { loggedInOnly } = PassportController;
// const { verifyToken } = PassportController;
const multer = require('../config/multer/multer');

module.exports = app => {
  // ! Login

  // * Main Page
  // app.get('/', loggedInOnly, PassportController.renderIndex);

  // // Login View
  // app.get('/login', loggedOutOnly, PassportController.renderLogin);

  // // * Register View
  // app.get('/signup', loggedOutOnly, PassportController.renderRegister);

  // * Register Handler
  app.post('/api/user/signup', PassportController.register);

  // * Logout Handler
  app.all('/api/user/logout', PassportController.logout);
  app.post('/api/user/login', PassportController.authenticatePassport);
  // ! Populate all database
  app.get('/api/populate/insert_all', PopulateAll.insertData);

  app.get('/api/populate/populateLinkLayer', PopulateSubdocuments.populateLinkLayer);
  app.get('/api/populate/populateDevice', PopulateSubdocuments.populateDevice);
  app.get('/api/populate/populateConfigDevice', PopulateSubdocuments.populateConfigDevice);
  app.get('/api/populate/populateRoom', PopulateSubdocuments.populateRoom);
  app.get('/api/populate/populateUser', PopulateSubdocuments.populateUser);

  // * Ethernet
  app.get('/api/ethernet/greet', EthernetController.greeting);
  app.post(
    '/api/ethernet',
    PassportController.authMiddleWare,
    multer.single('image'),
    EthernetController.create
  );
  app.get('/api/ethernet', EthernetController.readAll);
  app.get('/api/ethernet/:id', EthernetController.readOne);
  app.put(
    '/api/ethernet/:id',
    PassportController.authMiddleWare,
    multer.single('image'),
    EthernetController.update
  );
  app.delete('/api/ethernet/:id', PassportController.authMiddleWare, EthernetController.delete);

  // * Wifi
  app.get('/api/wifi/greet', WifiController.greeting);
  app.post('/api/wifi', WifiController.create);
  app.get('/api/wifi', WifiController.readAll);
  app.get('/api/wifi/:id', WifiController.readOne);
  app.put('/api/wifi/:id', WifiController.update);
  app.delete('/api/wifi/:id', WifiController.delete);

  // * NetworkLayer
  app.get('/api/net_layer/greet', NetworkLayerController.greeting);
  app.post('/api/net_layer', NetworkLayerController.create);
  app.get('/api/net_layer', NetworkLayerController.readAll);
  app.get('/api/net_layer/:id', NetworkLayerController.readOne);
  app.put('/api/net_layer/:id', NetworkLayerController.update);
  app.delete('/api/net_layer/:id', NetworkLayerController.delete);

  // * ApplicationLayer
  app.get('/api/app_layer/greet', ApplicationLayerController.greeting);
  app.post('/api/app_layer', ApplicationLayerController.create);
  app.get('/api/app_layer', ApplicationLayerController.readAll);
  app.get('/api/app_layer/:id', ApplicationLayerController.readOne);
  app.put('/api/app_layer/:id', ApplicationLayerController.update);
  app.delete('/api/app_layer/:id', ApplicationLayerController.delete);

  // * Polygon
  app.get('/api/polygon/greet', PolygonController.greeting);
  app.post('/api/polygon', PolygonController.create);
  app.get('/api/polygon', PolygonController.readAll);
  app.get('/api/polygon/:id', PolygonController.readOne);
  app.put('/api/polygon/:id', PolygonController.update);
  app.delete('/api/polygon/:id', PolygonController.delete);

  // * LinkLayer
  app.get('/api/link_layer/greet', LinkLayerController.greeting);
  app.post('/api/link_layer', LinkLayerController.create);
  app.get('/api/link_layer', LinkLayerController.readAll);
  app.get('/api/link_layer/:id', LinkLayerController.readOne);
  app.put('/api/link_layer/:id', LinkLayerController.update);
  app.delete('/api/link_layer/:id', LinkLayerController.delete);

  // * Device
  app.get('/api/device/greet', DeviceController.greeting);
  app.post('/api/device', DeviceController.create);
  app.get('/api/device', DeviceController.readAll);
  app.get('/api/device/:id', DeviceController.readOne);
  app.put('/api/device/:id', DeviceController.update);
  app.delete('/api/device/:id', DeviceController.delete);

  // * ConfigDevice
  app.get('/api/conf_device/greet', ConfigDeviceController.greeting);
  app.post('/api/conf_device', ConfigDeviceController.create);
  app.get('/api/conf_device', ConfigDeviceController.readAll);
  app.get('/api/conf_device/:id', ConfigDeviceController.readOne);
  app.put('/api/conf_device/:id', ConfigDeviceController.update);
  app.delete('/api/conf_device/:id', ConfigDeviceController.delete);

  // * Room
  app.get('/api/room/greet', RoomController.greeting);
  app.post('/api/room', RoomController.create);
  app.get('/api/room', RoomController.readAll);
  app.get('/api/room/:id', RoomController.readOne);
  app.put('/api/room/:id', RoomController.update);
  app.delete('/api/room/:id', RoomController.delete);

  // * User
  app.get('/api/user/greet', UserController.greeting);
  // app.post('/api/user', UserController.create);
  app.get('/api/user/', UserController.readAll);
  app.get('/api/user/:username', PassportController.authMiddleWare, UserController.readOne);
  app.put('/api/user/:username', UserController.update);
  app.delete('/api/user/:id', UserController.delete);
};
