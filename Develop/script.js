timeArray=[`12:00 am` , `1:00 am`, `2:00am`, `3:00 am`, `4:00 am`, `5:00 am`, `6:00 am`, `7:00 am`, `8:00 am`, `9:00 am`, `10:00 am`, `11:00 am`,
`12:00 pm`,`1:00 pm`,`2:00 pm`,`3:00 pm`,`4:00 pm`,`5:00 pm`,`6:00 pm`,`7:00 pm`,`8:00 pm`,`9:00 pm`,`10:00 pm`,`11:00 pm`,]
x = undefined


//writes current day right away
document.querySelector(`#currentDay`).innerHTML = moment().format('dddd, MMMM Do')


//checks every minute what current day it is
//deletes localstorage if date changes
function checkCurrentDay () {
    if(x != moment().format('dddd, MMMM Do')){
        localStorage.clear()
    }
    document.querySelector(`#currentDay`).innerHTML = moment().format('dddd, MMMM Do')
    x = moment().format('dddd, MMMM Do')
}
setInterval(checkCurrentDay , 1000)

//writes all timeblocks based on normal business hours
for (i = 0; i < timeArray.length; i++) {
    document.querySelector(`.container`).innerHTML += 
    `<div class = "row hour">
    <div class = "time">${timeArray[i]} </div>
    <textarea id = "text${i}" class = "future text" placeholder = "Schedule an event here!"></textarea>
    <button id = "save${i}" onclick = "saveFunction(this)" class="saveBtn"><img src = "./Assets/save.png" width = "50" height = "50"/></button>
    </div>`
}

//sets the colors based on past present or future
for (i = 0; i < timeArray.length; i++) {
    if (moment().format('h:00 a') != timeArray[i]){
            document.querySelector(`#text${i}`).classList.add("past")
            document.querySelector(`#text${i}`).classList.remove("future")
            document.querySelector(`#text${i}`).classList.remove("present")
    } else if (moment().format('h:00 a') == timeArray[i]){
        document.querySelector(`#text${i}`).classList.add("present")
        document.querySelector(`#text${i}`).classList.remove("future")
        document.querySelector(`#text${i}`).classList.remove("past")
        break
    }
}

//checks consistently if it is past present or future every minute then changes colors accordingly
//removes 2 things just to cover bases just in case of bugs
setInterval( () => {
    for (i = 0; i < timeArray.length; i++) {
        if (moment().format('h:00 a') != timeArray[i]){
                document.querySelector(`#text${i}`).classList.add("past")
                document.querySelector(`#text${i}`).classList.remove("future")
                document.querySelector(`#text${i}`).classList.remove("present")
        } else if (moment().format('h:00 a') == timeArray[i]){
            document.querySelector(`#text${i}`).classList.add("present")
            document.querySelector(`#text${i}`).classList.remove("future")
            document.querySelector(`#text${i}`).classList.remove("past")
            break
        }
    }
},60000)

//button saves to localstorage
function saveFunction (button) {
    localStorage.setItem(button.parentNode.childNodes[3].id , button.parentNode.childNodes[3].value)
}

//displays it in the text area
for (i = 0; i < timeArray.length; i++) {
    document.querySelector(`#text${i}`).innerHTML = localStorage.getItem(`text${i}`)
}