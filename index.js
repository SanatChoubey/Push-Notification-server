const app = require('express')();
const PushNotifications = require('node-pushnotifications');

const teamId = 'BH8F58S677';
// const bundleId = 'io.sapienhealth.sapien'
const bundleId = 'io.sapienhealth.sapien.dev'
const keyId = '4JBXFGP9VG'

const config = {
    apn: {
      token: {
         key: './sapienpush.p8',
         keyId: keyId,
         teamId: teamId,
       },
       production: process.env.stage||true,
       
    },
    gcm: {
      id: 'sdfk',
    },
    isAlwaysUseFCM: false,
  };
  const NotificationService = new PushNotifications(config);
  const payload = {
    topic: bundleId,
    retries: 1,
    // topic: 'io.sapienhealth.sapien',
    // topic: 'io.sapienhealth.sapien.dev',
    pushType: "alert",
    expiry: Math.floor(Date.now() / 1000) + 28 * 86400,
    sound: "bingbong.aiff",
    title: 'Testing notification',
    body: 'Is it workings ?',
    contentAvailable:1,
    pushNotifications: true,
    // body: 'Powered by AppFeel',
    //    alert: { // apn, will take precedence over title and body
    //     title: 'title',
    //     body: 'body'
    //     // details: https://github.com/node-apn/node-apn/blob/master/doc/notification.markdown#convenience-setters
    // },
  };

app.get('/', async(req, res) => {
  if(req.query.token) {
    await NotificationService.send(req.query.token, {...payload, badge:2})
    .then(results => res.json(results))
    .catch(error => console.log({ error }))
  }
  else {
    return res.send({
      error: 'Please send device token in query'
    })
  }
    
})
const PORT = 9000
app.listen(process.env.PORT||PORT)