const ethernetArr = [{
        "etherName": "Ethernet",
        "etherStandard": "802.3",
        "etherDataRate": "10Mbps"
    },
    {
        "etherName": "Fast Ethernet",
        "etherStandard": "802.3u",
        "etherDataRate": "100Mbps"
    },
    {
        "etherName": "Gigabit Ethernet",
        "etherStandard": "802.3z",
        "etherDataRate": "1Gbps"
    },
    {
        "etherName": "10 Gigabit Ethernet",
        "etherStandard": "802.3ae",
        "etherDataRate": "10Gbps"
    }
];
const wifiArr = [{
        "wifiName": "802.11b",
        "wifiFrequancy": "2.4Ghz",
        "wifiRange": "30m",
        "wifiDataRate": "11Mbps"
    },
    {
        "wifiName": "802.11g",
        "wifiFrequancy": "2.4Ghz",
        "wifiRange": "30m",
        "wifiDataRate": "54Mbps"
    },
    {
        "wifiName": "802.11n",
        "wifiFrequancy": "2.4Ghz & 5Ghz",
        "wifiRange": "70m",
        "wifiDataRate": "450Mbps"
    },
    {
        "wifiName": "802.11ac",
        "wifiFrequancy": "5Ghz",
        "wifiRange": "35m",
        "wifiDataRate": "1300Mbps"
    }
];

const networkLayerArr = [{
        "nlName": "Zigbee stack",
        "nlIPv4": false,
        "nlIPv6": true,
        "nlZig_LoWpan": "Zigbee"
    },
    {
        "nlName": "Zigbee stack",
        "nlIPv4": true,
        "nlIPv6": false,
        "nlZig_LoWpan": "Zigbee"
    },
    {
        "nlName": "TCP stack",
        "nlIPv4": true,
        "nlIPv6": true,
        "nlZig_LoWpan": "6LoWpan"
    },
    {
        "nlName": "Zigbee stack",
        "nlIPv4": true,
        "nlIPv6": true,
        "nlZig_LoWpan": "Zigbee"
    }
];

const appLayerArr = [{
        "alName": "App nr 1",
        "alHTTP": false,
        "alCoAp": true,
        "alWebSocket": false,
        "alMQTTE": true,
        "alDDS": false,
        "alAMQP": true
    },
    {
        "alName": "App nr 2",
        "alHTTP": true,
        "alCoAp": true,
        "alWebSocket": false,
        "alMQTTE": false,
        "alDDS": false,
        "alAMQP": true
    }

]

const polygonArr = [{
        "polName": "Polygon 1",
        "polDots": [{
                "dotX": 0,
                "dotY": 0
            },
            {
                "dotX": 45,
                "dotY": 20
            },
            {
                "dotX": 10,
                "dotY": 20
            },
            {
                "dotX": 22,
                "dotY": 13
            }
        ]
    },
    {
        "polName": "Polygon 2",
        "polDots": [{
                "dotX": 0,
                "dotY": 0
            },
            {
                "dotX": 5,
                "dotY": 20
            },
            {
                "dotX": 10,
                "dotY": 2
            },
            {
                "dotX": 2,
                "dotY": 11
            }
        ]
    }

];
// ! IDs should be provided dynamicly
const linkLayerArr = [{
        "llName": "Link 1",
        "llPriorityType": "A",
        "llRole": "sensor",
        "llBluetooth": "v5",
        "llLrWpan": "Zigbee",
        "llCelullar": "5G",
        "llLrWpanType": "RFD",
        "llNFC": true,
        "llProducer": "Cisco"
    },
    {
        "llName": "Link 33",
        "llPriorityType": "B",
        "llRole": "actuator",
        "llBluetooth": "v5",
        "llLrWpan": "Zigbee",
        "llCelullar": "5G",
        "llLrWpanType": "RFD",
        "llNFC": false,
        "llProducer": "D-Link"
    }
];
// ! IDs should be provided dynamicly
const deviceArr = [{
        "devName": "Thermostat",
        "tranLayer": "TCP",
        "devPrice": "4000.00",
        "devImgUrl": "https://images.unsplash.com/photo-1550659899-2a24a8098e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    },
    {
        "devName": "Lightbulb",
        "tranLayer": "TCP",
        "devPrice": "300.00",
        "devImgUrl": "https://images.unsplash.com/photo-1550597194-b3e981caa1c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    }
];
// ! IDs should be provided dynamicly
const configDeviceArr = [{
        "configName": "Configuration 1"
    },
    {
        "configName": "Configuration 22"
    }
];
// ! IDs should be provided dynamicly
const roomArr = [{
        "roomName": "Kitchen 1",
        "roomType": "Kitchen",
        "roomHeight": 200
    },
    {
        "roomName": "Living 22",
        "roomType": "Living",
        "roomHeight": 182
    }
];
// ! IDs should be provided dynamicly
const userArr = [{
        "username": "BlueCC",
        "email": "cc@gmail.com",
        "password": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

    },
    {
        "username": "Desolation",
        "email": "cc@mail.ru",
        "password": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    }
];

module.exports = {
    ethernetArr: ethernetArr,
    wifiArr: wifiArr,
    networkLayerArr: networkLayerArr,
    polygonArr: polygonArr,
    appLayerArr: appLayerArr,
    linkLayerArr: linkLayerArr,
    deviceArr: deviceArr,
    configDeviceArr: configDeviceArr,
    roomArr: roomArr,
    userArr: userArr
}