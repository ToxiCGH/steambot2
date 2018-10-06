/*

    BOT został stworzony przez Michała Kornela, pracującego pod pseudonimem "AnotheR"
    Nikt, bez zgody autora, nie może z niego korzystać!

*/
//Potrzebne moduly
const Steam = require('steam');
const SteamGroups = require('steam-groups');
const SteamUser = require('steam-user');
const TradeOfferManager = require('steam-tradeoffer-manager');
const SteamCommunity = require('steamcommunity');
const SteamTotp = require('steam-totp');

const steamclient = new Steam.SteamClient();
const steamGroups = new SteamGroups(steamclient);
const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: 'en'
});

//Dane logowania
const logOnOptions = {
  accountName: 'nipmysza9100',
  password: 'Majkelek20033002123321',
  twoFactorCode: SteamTotp.generateAuthCode('Ur7cut0Avd2gDm5Mc1LJaFt9Pak=')
};

//Logowanie
client.logOn(logOnOptions);
client.on('loggedOn', () => {
  console.log('Poprawnie zalogowano sie na Steam');

  client.setPersona(SteamUser.Steam.EPersonaState.Online/*, '[BOT] F2PReviews #1'*/);

  client.gamesPlayed('[F2PReviews] Reviewing Games...', 730, 440); //CS:GO TF2 and Custom Game

});

//Akceptowanie zaproszeń
client.on('friendRelationship', (steamid, relationship) => {
  if (relationship === 2) {
      client.addFiend(steamid);
      client.chatMessage(steamid, 'Cześć! Dzięki za dodanie mnie do znajomych!');
      console.log('[Znajomi] Dodano nowa osobe do znajomych! SteamID: '+steamid);
  }
});

//Cookies
client.on('webSession', (sessionid, cookies) => {
  manager.setCookies(cookies);

  community.setCookies(cookies);

  community.startConfirmationChecker(10000, 'A1TxyLw+jOozQTE3z6NXWfQmo4E=');
});

//Akceptowanie ofert od "zaufanego" konta
manager.on('newOffer', offer => {
  if (offer.partner.getSteamID64() === '76561198800741279') {
    offer.accept((err, status) => {
      if (err) {
        console.log(err);
      } else {
        console.log('[Oferta] Zaakceptowano oferte od Zaufanego Konta. Status: ${status}');
      }
    });
  } else {
    offer.decline(err => {
      if (err) {
        console.log(err);
      } else {
        console.log('[Oferta] Odrzucono oferte od Scamera. Status: ${status}');
      }
    });
  }
});

//Wyślij randomowy item z gry do Zaufanego konta
function sendRandomItem() {
  manager.loadInventory(730, 2, true, (err, inventory) => {
    if (err) {
      console.log(err);
    } else {
      const offer = manager.createOffer('76561198800741279');

      const item = inventory[Math.floor(Math.random() * inventory.length - 1)];

      offer.addMyItem(item);
      offer.setMessage('Dostales ${item.name} od bota, poniewaz o to poprosiles');
      offer.send((err, status) => {
        if (err) {
          console.log(err);
        } else {
          console.log('[Random Item] Wyslano oferte. Status: ${status}');
        }
      });
    }
  });
}

//Wyślij randomowego trade 1 za 1 z gry TF2 do Zaufanego Konta
function sendRandomTrade() {
 const partner = '76561198800741279';
 const appid = 440;
 const contextid = 2;

     const offer = manager.createOffer(partner);
      manager.loadInventory(appid, contextid, true, (err, myInv) => {
      if (err) {
        console.log(err);
      } else {
        const myItem = myInv[Math.floor(Math.random() * myInv.length - 1)];
        offer.addMyItem(myItem);
        manager.loadUserInventory( partner, appid, contextid, true, (err, theirInv) => {
        if (err) {
          console.log(err);
        } else {
          const theirItem = theirInv[Math.floor(Math.random() * theirInv.length - 1)];
          offer.addTheirItem(theirItem);
          offer.setMessage(`Czy chcialbys wymienic sie twoim ${theirItem.name} za moj ${myItem.name}?`);
          offer.send((err, status) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`[Random Trade] Wyslano oferte. Status: ${status}`);
            }
          });
        }
      }
    );
  }
 });
}

/* //Akceptowanie dotacji
manager.on('newOffer', offer => {
  if (offer.itemsToGive.length === 0)
  {
    offer.accept((err, status) => {
      if (err) {
        console.log(err);
      } else {
        cosnole.log('[Dotacja] Dotacja zostala zaakceptowana. Status: ${status}')
      }
    });
  } else {
    offer.decline(err => {
      if (err) {
        console.log(err);
      } else {
        console.log{'[Dotacja] Dotacja zostala odrzucona. Powod: Proponujacy oferte uzytkownik chcial nasze przedmioty. Status: ${status}'}
      }
    });
  }
}); */

//Komendy
client.on("friendMessage", function(steamID, message) {
  if (message == "!help") {
    client.chatMessage(steamID, "Komendy:");
    client.chatMessage(steamID, "!check - Sprawdź, czy bot jest online");
    client.chatMessage(steamID, "!owner - Sprawdź mojego właściciela!");
    console.log('[Komenda Gracza] Gracz uzyl komendy !help');
  }
  if (message == "!check") {
    client.chatMessage(steamID, "[F2PReviews] BOT jest aktualnie ONLINE");
    console.log('[Komenda Gracza] Gracz uzyl komendy !check');
  }
  if (message == "!adminrandomitem") {
    client.chatMessage(steamID, "[ADMIN PANEL] Wysylam oferte z losowym przedmiotem do Zaufanego Konta!");
    console.log('[KOMENDA ADMINA] Gracz uzyl komendy !adminrandomitem');
    sendRandomItem();
  }
  if (message == "!adminrandomtrade") {
    client.chatMessage(steamID, "[ADMIN PANEL] Wysylam losowa oferte (1 za 1) do Zaufanego Konta!");
    console.log('[KOMENDA ADMINA] Gracz uzyl komendy !adminrandomtrade');
    sendRandomTrade();
  }
  if (message == "!owner") {
    client.chatMessage(steamID, "[F2PReviews] Moim wlascicielem jest ToxiC!");
    client.chatMessage(steamID, "https://www.steamcommunity.com/id/SteamToxiC1337");
    console.log('[Komenda Gracza] Gracz uzyl komendy !owner');
  }
});
/*
To do:

Zapraszanie do grupy kazdego nowego znajomego

*/
