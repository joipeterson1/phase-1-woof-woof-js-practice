/* 
Click on the dogs in dog bar to see more info
"dog pic, dog name, dog button(good or bad dog)"

click event listener to dogs in dog bar
create elements for img, name under picture and button for good or bad
*/

//load dogs to dog bar with fetch
document.addEventListener('DOMContentLoaded',loadPups)
function loadPups(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then (data => {
        const dogBar = document.getElementById('dog-bar')
        data.forEach(pup => {

            const pups = document.createElement('h6')
           const pupsSpan = document.createElement('span')

            pups.innerHTML = pup.name

            pupsSpan.appendChild(pups)
            dogBar.appendChild(pupsSpan)
            pups.addEventListener('click',() => {pupSummary(pup, data)})

        })
    })
    /*
    When a user clicks on a pup's span in the div#dog-bar, 
    that pup's info (image, name, and isGoodDog status) 
    should show up in the div with the id of "dog-info". 
    Display the pup's info in the div with the following elements:

    an img tag with the pup's image url
    an h2 with the pup's name
    a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false.*/
    function pupSummary(pup){
        const pupImg = document.createElement('img')
        const pupName = document.createElement('h2')
        const pupStatusButton = document.createElement('button')
        const pupSummaryContainer = document.getElementById('dog-info')
        const goodDog = true
        const bagDog = false
        pupStatusButton.setAttribute("id", pup.id)
       pupStatusButton.addEventListener('click', updateStatus)
        pupSummaryContainer.innerHTML = ''
        pupSummaryContainer.appendChild(pupImg)
        pupSummaryContainer.appendChild(pupName)
        pupSummaryContainer.appendChild(pupStatusButton)

        pupImg.src = pup.image
        pupName.innerText = pup.name
        pupStatusButton.innerText = pup.isGoodDog

        if (pup.isGoodDog === goodDog ){
            return pupStatusButton.innerHTML = 'Good Dog'
        } 
        if (pup.isGoodDog === bagDog ){
            return pupStatusButton.innerHTML = 'Bad Dog'
        }
    }
    /*
Click on good/bad button to change goodness of pup

click event listener to button that was created
add text to the button
event to change isGoodDog to true or false (if it is good change to bad, etc)
*/
function updateStatus(button){
    //You can update a dog by making a PATCH request to /pups/:id 
    //and including the updated isGoodDog status in the body of the request.
    const goodDog = true
    const badDog = false
    const buttonId = parseInt(button.target.id)
    const pupStatusButton = document.createElement('button')
    if (buttonId.isGoodDog === goodDog){
        return pupStatusButton.innerHTML = 'Bad Dog'
    } 
    if (buttonId.isGoodDog === badDog){
        return pupStatusButton.innerHTML = 'Good Dog'
    }
    const updatedStatus = {
        isGoodDog: "Good Dog"? false : true
      }

    fetch(`http://localhost:3000/pups/${buttonId}`,{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(updatedStatus)
          })
            .then(response => response.json())
            .then(data => data)
}
    }

/*
Click on filter to see good dogs only, click again to see all dogs

click event listener to button that was created when page loaded
add text to the button "Filter good dogs: ON"
filter good dogs(true or false) when clicked and change text to "Filter good dogs: OFF"
event to change text back to original when clicked again
*/
