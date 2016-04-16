var moment = require('moment-timezone');

module.exports = {
  aperoBot : function(req, res, next) {
    var userName = req.body.user_name;
    var hours = moment.tz('Europe/Paris').format('HH');

    var botPayload = {
      h17and23 : {
        text : '@channel, ' + userName + ' a raison, il est l\' heure de l\'apéro !'
      },
      h23and6 : {
        text : 'Oula ' + userName + ', t\'es cramé, c\'est plus l\' heure de l\'apéro !'
      },
      h6and10 : {
        text : 'Sérieux ' + userName + ', va me chercher un croissant et un café.'
      },
      h10and16 : {
        text : 'Un peu tôt pour l\'apéro coco !'
      },
      h16 : {
        text : 'Patience ' + userName + ', c\'est bientôt l\' heure de l\'apéro !'
      }
    };
    

    // avoid infinite loop
    if (userName !== 'slackbot') {
      if (hours >= 17 && hours < 23) {
        return res.status(200).json(botPayload.h17and23);
      } else if (hours >= 23 && hours < 6) {
        return res.status(200).json(botPayload.h23and6);
      } else if (hours >= 6 && hours < 10) {
        return res.status(200).json(botPayload.h6and10);
      } else if (hours >= 10 && hours < 16) {
        return res.status(200).json(botPayload.h10and16);
      } else if (hours === 16) {
        return res.status(200).json(botPayload.h16);
      }
    } else {
      return res.status(200).end();
    }
  }
};