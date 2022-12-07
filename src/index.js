// write your code here
const baseURL = "http://localhost:3000/ramens"

let ramen =[]
let getRamenId ;


//function for all ramens and adding them to menu

function fetchRamen(){
    fetch(baseURL)
    .then(r=>r.json())
    .then(data =>{
        ramen=data
        getRamenId=String(ramen[0].id)
        resetMenu()
        setRamenDetailsById(selectedRamenId)

    })
}

//to reset the values of the menu

const ramenMenu =document.getElementById("ramen-menu")

function resetMenu(){
    ramenMenu.innerHTML=''
    ramen.forEach(r =>{
        addRamenMenuItem(r)
    })
    
}
//adding one ramen to the menu

function addRamenMenuItem(r){
const ramenImg =document.createElement('img')

ramenImg.src=r.image
ramenImg.alt =r.name
ramenImg.dataset.id=r.id
ramenMenu.appendChild(ramenImg)
}

//having click events on the menu

function eventRamen(){
    ramenMenu.addEventListener('click',(e)=>{
        if(e.target.tagName ==="IMG"){
            selectedRamenId=e.target.dataset.id
            setRamenDetailsById(selectedRamenId)
        }
    })

}

//have the details of a selected ramen by id
const ramenDetail = document.getElementById('ramen-detail')
const commentDisplay = document.getElementById('comment-display')
const ratingDisplay = document.getElementById('rating-display')
const [ramenDetailImage, ramenDetailName, ramenDetailRestaurant] = ramenDetail.children

const editRamenRating = document.getElementById('edit-rating')
const editRamenComment = document.getElementById('edit-comment')


function setRamenDetailsById(id){
    const selected = ramen.find(r => r.id == id)
    ramenDetailImage.src = selected.image
    ramenDetailName.innerText = selected.name
    ramenDetailRestaurant.innerText = selected.restaurant
    commentDisplay.innerText = selected.comment
    ratingDisplay.innerText = selected.rating
    editRamenRating.value = selected.rating
    editRamenComment.value = selected.comment
}
//editting the form
function listenEditRamenForm(){
    editRamenForm.addEventListener('submit', e => {
        e.preventDefault()
        fetch(`${ramenUrl}/${selectedRamenId}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: editRamenComment.value,
                rating: Number(editRamenRating.value)
            })
        })
        .then(r => r.json())
        .then(data => {
            const idx = ramen.findIndex(r => r.id === Number(selectedRamenId))
            ramen = [
                ...ramen.slice(0, idx),
                data,
                ...ramen.slice(idx + 1)
            ]
            commentDisplay.innerText = data.comment
            ratingDisplay.innerText = data.rating
        })
    })
}



