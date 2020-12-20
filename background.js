function generateTabList(callback) {
var tabsString = '';
chrome.windows.getAll({populate:true}, function(windows) {
for (var i = 0; i < windows.length; i++) {
for (var j = 0; j < windows[i].tabs.length; j++) {
tabsString += windows[i].tabs[j].title + ":  ";
						tabsString += windows[i].tabs[j].url + "\n";
}
}
callback(tabsString);
});
}

function createDownloadLink(text) {
var fileName = generateFilename();
var downloadLink = document.createElement('a');
var blob = new Blob([text], {type: 'text/plain'});
downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
downloadLink.setAttribute('download', fileName);
downloadLink.innerHTML = 'Download file';
return downloadLink;
}

function generateFilename() {
var d = new Date();
var date_string = 
d.getFullYear() 
		+ '' 
		+ ('0' + (d.getMonth() + 1)).slice(-2) 
		+ '' 
		+ ('0' + d.getDate()).slice(-2) 
		+ '-' 
		+ ('0' + d.getHours()).slice(-2) 
		+ 'h' 
		+ ('0' + d.getMinutes()).slice(-2);
		return 'chrome-tabs-' + date_string + '.txt';
};

function downloadTabList() {
generateTabList(function(text) {
var downloadLink = createDownloadLink(text);
downloadLink.click()
});
}

chrome.commands.onCommand.addListener(function(command) {
	if (command === 'download') {
		downloadTabList();
	}
});