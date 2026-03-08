const container = document.getElementById("issuesContainer")
const loader = document.getElementById("loader")

let issuesData = []

async function loadIssues(){

try{

loader.classList.remove("hidden")

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

issuesData = data.data

displayIssues(issuesData)

}
catch(error){

console.log(error)
alert("Failed to load issues")

}

finally{

loader.classList.add("hidden")

}

}

loadIssues()


function formatDate(dateString){


const date = new Date(dateString)


return date.toLocaleDateString()


}

function priorityBadge(priority){


if(priority === "high"){
return `<span class="badge bg-red-100 text-red-600 border-0">HIGH</span>`
}


if(priority === "medium"){
return `<span class="badge bg-yellow-100 text-yellow-700 border-0">MEDIUM</span>`
}


return `<span class="badge bg-gray-200 text-gray-600 border-0">LOW</span>`


}

function statusIcon(status){


if(status === "open"){
return `<div class="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600"><img src="./assets/Open-Status.png" alt=""></div>`
}


return `<div class="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600"><img src="./assets/Closed- Status .png" alt=""></div>`


}



function displayIssues(issues){


container.innerHTML = ""


document.getElementById("issueCount").innerText =
issues.length + " Issues"




issues.forEach(issue => {


const border =
issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500"




const card = `


<div class="card bg-white shadow ${border}">


<div class="card-body p-4">


<div class="flex justify-between items-center">


${statusIcon(issue.status)}


${priorityBadge(issue.priority)}


</div>


<h2
onclick="openModal(${issue.id})"
class="font-semibold text-sm cursor-pointer hover:underline mt-2"
>
${issue.title}
</h2>


<p class="text-xs text-gray-500">
${issue.description}
</p>


<div class="flex gap-2 mt-2">


<span class="badge badge-outline text-red-500 border-red-400">
${issue.category || "Bug"}
</span>


<span class="badge badge-outline text-yellow-600 border-yellow-400">
${issue.label || "Help Wanted"}
</span>


</div>


<hr class="my-2">


<p class="text-xs text-gray-400">
#${issue.id} by ${issue.author}
</p>


<p class="text-xs text-gray-400">
${formatDate(issue.createdAt)}
</p>


</div>


</div>


`


container.innerHTML += card


})


}


function filterIssues(type){

document.querySelectorAll(".tab").forEach(tab =>
tab.classList.remove("tab-active")
)

event.target.classList.add("tab-active")

if(type === "all"){

displayIssues(issuesData)

}

else{

const filtered = issuesData.filter(issue =>
issue.status === type
)

displayIssues(filtered)

}

}

// Search

async function searchIssue(){


const text = document
.getElementById("searchInput")
.value


loader.classList.remove("hidden")


const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)


const data = await res.json()


displayIssues(data.data)


loader.classList.add("hidden")


}


// MOdal

async function openModal(id){


const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)


const data = await res.json()


const issue = data.data




document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description


document.getElementById("modalStatus").innerHTML =
`<span class="badge ${issue.status === "open" ? "badge-success" : "badge-secondary"}">${issue.status}</span>`

// document.getElementById("modalCategory").innerText =
// "Category: " + issue.category

document.getElementById("modalAuthor").innerText =
"Assignee: " + issue.author

document.getElementById("modalPriotity").innerHTML =
`<span class="bg-red-500 text-white px-2 py-1 rounded uppercase text-xs">${issue.priority}</span>`

document.getElementById("modalDate").innerText =
"Date: " + formatDate(issue.createdAt)

document.getElementById("issueModal").showModal()


}
