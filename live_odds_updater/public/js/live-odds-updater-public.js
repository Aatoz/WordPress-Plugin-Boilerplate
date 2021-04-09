(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 const sAPIKey_c = "03ccbc42b711d05aefa988be04ddd2a7"
	 const sOddsType_c = "spreads" // "h2h"
	 const vMapBookieToJSONKey_c = {
	  "DraftKings" : "DraftKings",
	  "FanDuel" : "FanDuel",
	  "BetMGM" : "BetMGM",
	  "Bovada" : "BetMGM",
	  "MyBookie" : "MyBookie.ag",
	  "WilliamHill" : "William Hill (US)",
	  "PointsBet": "PointsBet (US)"
  }
	 const vMapBookiesToURLs_c = {
		 "DraftKings": "https://sportsbook.draftkings.com/featured",
		 "FanDuel": "https://sportsbook.fanduel.com/sports",
		 "BetMGM": "https://sports.nj.betmgm.com/en/sports",
		 "Bovada": "https://bovada.lv/sports",
		 "MyBookie": "https://mybookie.ag/sportsbook/",
		 "WilliamHill": "https://williamhill.com/us/nj/bet/",
		 "PointsBet": "https://nj.pointsbet.com"
	 }
	 const asMonthNames = ["January", "February", "March", "April", "May", "June",
								 "July", "August", "September", "October", "November", "December"
								 ];
	 const asDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	 const asIgnoreBookies = ["SugarHouse", "Unibet", "BetRivers", "FOXBet", "GTbets", "Caesars", "Intertops", "LowVigag", "BetOnlineag"]
	 const asLeagueWhitelist = ["football_nfl", "baseball_mlb", "basketball_nba", "icehockey_nhl", "baseball_ncaa", "baseball_ncaaw", "baseball_ncaam"]
 
 //vTable = tableFromJson(vJSON.data);
 //console.log(vTable);
 
 //document.body.getElementsByTagName("main")[0].appendChild(vTable);
 if (document.getElementById("liveOdds") == null)
	 document.body.appendChild(vTable)
 else document.getElementById("liveOdds").appendChild(vTable);
 
 // Begin event loop.
  function fetchData() {
	  $.ajax({
		  url: "https://api.the-odds-api.com/v3/odds",
			 crossDomain: true,
		  type: "get",
		  headers: {
			  "api_key": sAPIKey_c,
			  // To get odds for a specific sport, use the sport key from the last request
			  // https://api.the-odds-api.com/v3/sports
			  "sport": "upcoming", // upcoming OR a specific sport.
			  "region": "us",
			  "mkt": "h2h", // h2h | spreads | totals
			  "oddsFormat": "american",
			  "Content-Type": "application/json"
		  },
		  success: function(vData) {
			  // Perform operation on return value
				 console.log("FETCHED DATA")
				 console.log(vData);
  
			  // TOOD!!!
			  // Update table
			  //tableFromJson(vJSON)
		  },
			 complete:function(vData) {
			  setTimeout(fetchData, 30000); // 30sec = 30 * 1000ms = 30000ms
		  }
	  });
  }
  
  // Start event loop
  $(document).ready(function(){
	  setTimeout(fetchData,5000);
  });
  
  function tableFromJson(vJSON) {
  
	  //	create a table.
	  var vTable = document.createElement("table");
  
	  // Populate table. Format is 4 rows per game
	  // Long date      Thursday, April 4
	  // Time           8:20 PM
	  // Away Team      Dodgers
	  // Home Team     	cardinals
	  sLastDate = ""
	  sLastTime = ""
	  bAddBorderToGame = false
	  for (var iData = 0; iData < vJSON.length; iData++) {
		  vData = vJSON[iData]
		  if (!asLeagueWhitelist.includes(vData["sport_key"]))
				 continue
  
		  // Header for Date
		  vDate = new Date(vData.commence_time * 1000) // UNIX time stamp, multiply by 1,000
		  sDate = asDays[vDate.getDay()] + ", " + asMonthNames[vDate.getMonth()] + " " + vDate.getDate()
  
		  if (sDate != sLastDate) {
			  // TODO: See what happens when we have two different days.
			  if (iData == 0) {
				  vDateHeader = document.getElementById("dateHeader")
				  vDateHeader.innerHTML = sDate;
				  vDateHeader.classList.add("longDate")
				  vDateHeader.classList.add("dateRow")
			  }
			  else {
				  vRow = vTable.insertRow();
				  vRow.classList.add("dateRow")
  
				  var vHeader = document.createElement("th");
				  vHeader.innerHTML = sDate;
				  vHeader.classList.add("longDate")
				  vRow.appendChild(vHeader);
  
				  // Add blank TDs to fill in row so we have	consistent	coloring.
				  for (var i = 0; i < Object.keys(vMapBookieToJSONKey_c).length; i++)
					  vRow.insertCell();
			  }
		  }
		  sLastDate = sDate
  
		  // Header for Time
		  sTime = vDate.toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
		  if (sTime != sLastTime) {
			  bAddBorderToGame = false
			  vTimeBookiesRow = vTable.insertRow();
			  vTimeBookiesRow.classList.add("timeRow")
			  var vHeader = document.createElement("th");
			  vHeader.innerHTML = sTime;
			  vHeader.classList.add("time")
			  vTimeBookiesRow.appendChild(vHeader);
  
			  // Populate Bookies row, but only each time we add a new time.
			  for (var sBookie in vMapBookieToJSONKey_c) {
				  //vHeaderCell.innerHTML = sBookie
				  vTH = document.createElement("th");
				  vHeaderCell = document.createElement("div");
				  vHeaderCell.classList.add("bookie")
				  vHeaderCell.classList.add(sBookie)
				  //vHeaderCell.setAttribute("style", "background-image: url('res/" + sBookie + ".png')")
				  vHeaderCell.setAttribute("style", "background-image: url('https://www.4deepbets.com/wp-content/uploads/2021/04/" + sBookie + ".png')")
				  // src: https://www.davidmacd.com/blog/alternate-text-for-css-background-images.html
				  vHeaderCell.setAttribute("alt", sBookie)
				  vHeaderCell.setAttribute("aria-label", sBookie)
				  vHeaderCell.setAttribute("role", "img")
  
				  // Now wrap <image> in <a> so we	can make it	clickable.
				  vHeaderCellLink = document.createElement("a");
				  vHeaderCellLink.setAttribute("target", "_")
				  vHeaderCellLink.setAttribute("href", vMapBookiesToURLs_c[sBookie])
				  vHeaderCellLink.appendChild(vHeaderCell)
  
				  // Now wrap <a> in <th>
				  vTH.appendChild(vHeaderCellLink)
  
				  vTimeBookiesRow.appendChild(vTH);
			  }
		  }
		  else bAddBorderToGame = true
		  sLastTime = sTime
  
		  // Now fill in home and away team data
		  vAwayRow = vTable.insertRow();
		  vHomeRow = vTable.insertRow();
		  // Set a border when this is not the 1st game for this time frame
		  if (bAddBorderToGame)
			  vAwayRow.classList.add("g2")
		  vAwayRow.classList.add("linesRow")
		  vHomeRow.classList.add("linesRow")
		  vAwayCell = vAwayRow.insertCell()
		  vHomeCell = vHomeRow.insertCell()
		  vAwayCell.classList.add("team")
		  vHomeCell.classList.add("team")
		  vAwayCell.innerHTML = vData.teams[1]
		  vHomeCell.innerHTML = vData.teams[0]
  
		  // For each bookie, populate the odds.
		  // but do NOT loop with vData.sites as the source
		  // beacuse we need to add ***everything in order*** of	column headers
		  // which is determined by vMapBookieToJSONKey_c
		  for (var sKey in vMapBookieToJSONKey_c) {
			  sBookieKey = vMapBookieToJSONKey_c[sKey]
  
			  // Format bookie accordingly, adding blank rows when there are no lines.
			  bAddedData = false;
			  for (var iSite = 0; iSite < vData.sites.length; iSite++) {
				  sBookie = vData.sites[iSite].site_nice
  
				  // We have to add data in order, so only add when we match on sBookieKey
				  if (sBookie != sBookieKey)
						 continue
  
				  vSiteData = vData.sites[iSite]
				  if (sOddsType_c == "spreads")
					  populateSpreads(vSiteData, vAwayRow, vHomeRow)
				  else populateMoneylines(vSiteData, vAwayRow, vHomeRow)
  
				  bAddedData = true
				  break // This is a sub-loop.	continue to next bookie.
			  }
  
			  // If we had no data, fill in blanks.
			  if (!bAddedData){
				  var vAwayCell = vAwayRow.insertCell();
				  var vHomeCell = vHomeRow.insertCell();
			  }
		  }
	  }
  
	  return vTable
  }
  
  function populateSpreads(vSiteData, vAwayRow, vHomeRow) {
	  var vAwayCell = vAwayRow.insertCell();
	  var vHomeCell = vHomeRow.insertCell();
  
	  sSpread = vSiteData.odds[sOddsType_c].points[1]
	  sOdds = vSiteData.odds[sOddsType_c].odds[1]
	  if (parseFloat(sSpread) > 0)
		  sSpread = "+" + sSpread
	  //vAwayCell.innerHTML = sSpread
	  vSpreadElem = document.createElement("span")
	  vSpreadElem.innerHTML = sSpread
	  vOddsEM = document.createElement("em")
	  vOddsEM.innerHTML = formatOdds(sOdds)
	  vAwayCell.setAttribute("data-odds", formatOdds(sOdds))
	  vAwayCell.appendChild(vSpreadElem)
	  vAwayCell.appendChild(vOddsEM)
  
	  sSpread = vSiteData.odds[sOddsType_c].points[0]
	  sOdds = vSiteData.odds[sOddsType_c].odds[0]
	  if (parseFloat(sSpread) > 0)
		  sSpread = "+" + sSpread
	  vHomeCell.innerHTML = sSpread
	  vOddsEM = document.createElement("em")
	  vOddsEM.innerHTML = formatOdds(sOdds)
	  vHomeCell.setAttribute("data-odds", formatOdds(sOdds))
	  vHomeCell.appendChild(vOddsEM)
  }
  
  function populateMoneylines(vSiteData, vAwayRow, vHomeRow) {
	  var vAwayCell = vAwayRow.insertCell();
	  sAwayOdds = vSiteData.odds[sOddsType_c][1];
	  vAwayCell.innerHTML = formatOdds(sAwayOdds)
  
	  var vHomeCell = vHomeRow.insertCell();
	  sHomeOdds = vSiteData.odds[sOddsType_c][0];
	  vHomeCell.innerHTML = formatOdds(sHomeOdds)
  }
  
  function formatOdds(sOdds) {
	  // There are two methods, one for >= 2.00 and one for < 2.00
	  // The moneyline equals the decimal odds minus 1 times 100 -- src https://www.betacademy.com/convert-betting-odds-decimal-fractional-american/
	  // (3.35 – 1) x 100 = +235
	  sPrefix = ""
  
	  fOdds = (parseFloat(sOdds));
	  if (fOdds >= 2.00) {
		  iOdds = (fOdds - 1) * 100
		  sPrefix = "+"
	  }
	  else iOdds = (-100) / (fOdds - 1.0)
	  iOdds = iOdds.toFixed(0);
  
	  if (isNaN(iOdds) || iOdds == Number.NEGATIVE_INFINITY)
		  iOdds = ""
  
	  return sPrefix + iOdds
  }
  
  function rawTableFromJson(vJSON) {
	  // the json data. (you	can	change the values for output.)
  
	  // Extract value from table header.
	  var	col = [];
	  for (var i = 0; i < vJSON.length; i++) {
		  for (var key in vJSON[i]) {
			  if (col.indexOf(key) === -1) {
					 col.push(key);
			  }
		  }
	  }
  
	  //	create a table.
	  var table = document.createElement("table");
  
	  //	create table header row using the extracted headers above.
	  var tr = table.insertRow();                   // table row.
  
	  for (var i = 0; i <	col.length; i++) {
		  var th = document.createElement("th");      // table header.
		  th.innerHTML =	col[i];
		  tr.appendChild(th);
	  }
  
	  // add json data to the table as rows.
	  for (var i = 0; i < 1; i++) {
		  tr = table.insertRow();
  
		  for (var j = 0; j <	col.length; j++) {
			  var tabCell = tr.insertCell();
			  tabCell.innerHTML = JSON.stringify(vJSON[i][col[j]]);
		  }
	  }
  
	  return table
  }
  
  function loadJSON(callback) {
	  var xobj = new XMLHttpRequest();
	  xobj.overrideMimeType("application/json");
	  xobj.open('GET', 'theOddsAPI.json', true);
	  xobj.onreadystatechange = function () {
		  if (xobj.readyState == 4 && xobj.status == "200") {
			  // Required use of an anonymous	callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				 callback(xobj.responseText);
		  }
	  };
	  xobj.send(null);
	}

})( jQuery );
