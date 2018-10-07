// Co jest potrzebne do dzialania (moduly)
const SteamUser = require( 'steam-user' ); 
const SteamTotp = require( 'steam-totp' ); //"Mobilny" Guard (polecam skorzystac z SDA - Steam Desktop Autchenticator)
const SteamCommunity = require( 'steamcommunity' ); //SteamCommunity
const SteamTradeOfferManager = require( 'steam-tradeoffer-manager' ); //TradeOff'y

const client = new SteamUser();
const community = new SteamCommunity();

const logOnOptions = {
	
	accountName: 'nipmysza9100',
	password: 'Majkelek20033002123321',
	twoFactorCode: SteamTotp.generateAuthCode('Ur7cut0Avd2gDm5Mc1LJaFt9Pak=')
	
};

client.logOn(logOnOptions);

client.setOption("promptSteamGuardCode", false)

client.on( 'loggedOn', () => {
	console.log('Zalogowano na Steam!');
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
	client.gamesPlayed(["Looking for Games Cards", 440, 570, 773240, 247120, 397720, 850990, 272060, 99900, 861560, 890930, 417860, 795100, 227300, 209120, 45760, 507010, 262930, 339190, 823130, 801160, 871720, 508550, 582160]); //440 - TF2; 730 - CS:GO; 570 - Dota 2; 10 - CS1.6 albo CS:S Nie pamietam XD
});

client.on('friendRelationship', (steamid, relationship) => {
	if (relationship === 2) {
		client.addFriend(steamid);
		client.chatMessage(steamid, 'Cześć! Aktualnie idluję godziny w grach! Wszystkie dostępne komendy: !pomoc');
	}
	if (relationship === 7) {
		client.addFriend(steamid);
		client.chatMessage(steamid, 'Cześć! Aktualnie idluję godziny w grach! Wszystkie dostępne komendy: !pomoc');
	}
});

client.on("friendMessage", function(steamid, message) {
	if (message == "!pomoc") {
		client.chatMessage(steamID, "<< POMOC >>");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "Wszystkie dostępne komendy:");
		client.chatMessage(steamID, "!hourboost - Sprawdź na czym to polega!");
		client.chatMessage(steamID, "!cennik - Sprawdź cenę za boost godzin u Ciebie!");
		client.chatMessage(steamID, "!kontakt - Sprawdź inny kontakt ze mną!");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "<< POMOC >>");
	}
	if (message == "!hourboost") {
		client.chatMessage(steamID, "<< HOUR BOOST >>");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "Hour Boost - Popoularna usługa polegająca na symulowaniu przez wirtualny komputer (tzw. VPS) uruchomionych gier, co powoduje dodawanie w nich godzin! Maksymalnie można mieć uruchomionych 31 gier :)");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "<< HOUR BOOST >>");
	}
	if (message == "!cennik") {
		client.chatMessage(steamID, "<< CENNIK >>");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "Cennik moich usług możesz zobaczyć tutaj: txcboost.wix.com/home (Jeszcze nie aktywna)");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "<< CENNIK >>");
	}
	if (message == "!kontakt") {
		client.chatMessage(steamID, "<< KONTAKT >>");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "Kontakt do mnie:");
		client.chatMessage(steamID, "Facebook: facebook.com/Kornela.Michal");
		client.chatMessage(steamID, "Mail: txcboost@gmail.com");
		client.chatMessage(steamID, "Strona WWW: txcboost.wix.com/kontakt");
		client.chatMessage(steamID, " ");
		client.chatMessage(steamID, "<< KONTAKT >>");
	}
});

