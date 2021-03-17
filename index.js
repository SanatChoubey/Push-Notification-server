const app = require('express')();
const PushNotifications = require('node-pushnotifications');

const teamId = 'BH8F58S677';
const bundleId = 'io.sapienhealth.sapien'
const keyId = '4JBXFGP9VG'

const config = {
    apn: {
      token: {
         key: './sapienpush.p8',
         keyId: keyId,
         teamId: teamId,
       },
       production: process.env.stage||false,
    },
    gcm: {
      id: 'sdfk',
    },
    isAlwaysUseFCM: false,
  };
  const NotificationService = new PushNotifications(config);
  const payload = {
    topic: bundleId,
    priority: "high",
    retries: 1,
    pushType: "alert",
    expiry: Math.floor(Date.now() / 1000) + 28 * 86400,
    sound: "bingbong.aiff",
    title: 'Testing notification',
    body: 'Is it working ?',
  };

app.get('/', async(req, res) => {
  if(req.query.token) {
    await NotificationService.send(req.query.token, payload)
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