const container = document.getElementById("issuesContainer")
const loader = document.getElementById("loader")

let issuesData = []

async function loadIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

issuesData = data.data

displayIssues(issuesData)

}

loadIssues()

function displayIssues(issues){

container.innerHTML = ""

issues.forEach(issue => {

const card = `
<div class="card bg-white shadow">
<div class="card-body">

<h2 class="font-bold">
${issue.title}
</h2>

<p>${issue.description}</p>

<p>#${issue.id} by ${issue.author}</p>

</div>
</div>
`

container.innerHTML += card

})

}