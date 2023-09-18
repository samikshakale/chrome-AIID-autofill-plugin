async function getResponse(url) {
	const big_url = "http://127.0.0.1:5000/getInfo/" + url 
	const response = await fetch(big_url);
	console.log("finished fetch function")

	const data = await response.json();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			url: data.url,
			text: data.text,
			summary: data.summary,
			deployer: data.deployer,
			developer: data.developer,
			harmed: data.harmed
		}, function(response) {
			console.log(response.status);
		});
	});

	return data
}

document.getElementById("fillForm").addEventListener("click", () => {
	/* Auto fill form */
	console.log("Filled form button pressed")
	const url = document.getElementById("input_url").value

	const returned_data = getResponse(url)
	console.log(returned_data)
	console.log(returned_data.url)
	console.log(returned_data.text)
	console.log(returned_data.summary)
	console.log(returned_data.deployer)
	console.log(returned_data.developer)
	console.log(returned_data.harmed)
});