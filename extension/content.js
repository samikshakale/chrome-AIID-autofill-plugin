chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        try {
            // var url = document.getElementsByName("url")[0];
            // url.setAttribute("value", request.url);
            // url.dispatchEvent(new Event('input', { bubbles: true }));

            // var title = document.getElementsByName("title")[0];
            // title.setAttribute("value", request.title);
            // title.dispatchEvent(new Event('input', { bubbles: true }));
            
            // var text = document.getElementsByClassName("CodeMirror-line")[0]
            // console.log(text)

            var summary = document.getElementsByName("description")[0];
            summary.innerHTML = request.summary
            summary.dispatchEvent(new Event('input', { bubbles: true }));

            var deployer = document.getElementById("deployers")
            deployer.setAttribute("value", request.deployer);
            deployer.dispatchEvent(new Event('input', { bubbles: true }));

            var developer = document.getElementById("developers")
            developer.setAttribute("value", request.developer);
            developer.dispatchEvent(new Event('input', { bubbles: true }));

            var harmed = document.getElementById("harmed_parties")
            harmed.setAttribute("value", request.harmed);
            harmed.dispatchEvent(new Event('input', { bubbles: true }));
            
            // var button_element = findButtonbyAttrContent("to-step-2");
            // button_element.click();
            console.log("received!")
            sendResponse({status: "Success!"});
        } catch (error) {
            console.log(error)
            sendResponse({status: "Exception occurred!"});
        }
    }
);

// function printAllButtonTextContent() {
//     var buttons = document.querySelectorAll('button');
//     for (var i=0, l=buttons.length; i<l; i++) {
//       console.log(buttons[i].firstChild.nodeValue)
//       console.log(buttons[i].getAttribute("data-cy"))
//     }  
//   }

function findButtonbyAttrContent(text) {
    var buttons = document.querySelectorAll('button');
    for (var i=0, l=buttons.length; i<l; i++) {
      if (buttons[i].getAttribute("data-cy") == text)
        return buttons[i];
    }  
  }

//   function fillReactInput(target, val) {
    
//     target.value = val;
    
//   }