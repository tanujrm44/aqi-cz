const intro = document.getElementById("intro")
const causes = document.getElementById("causes")
const effects = document.getElementById("effects")
const solutions = document.getElementById("solutions")
const stats = document.getElementById("stats")
const form = document.querySelector("form")

const API_URL =
  "https://api.waqi.info/feed/here/?token=85d23c22f8ba011318bc6491c95a6b73804633a3"

// Fetch JSON data
async function loadJson() {
  try {
    const response = await fetch("./data.json")
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${response.statusText}`)
    }
    const data = await response.json()
    console.log(data)
    displayData(data)
  } catch (error) {
    console.error(error)
  }
}

loadJson()

// Display data on the page
function displayData(data) {
  data.forEach((section, index) => {
    const divElement = document.createElement("div")
    const titleElement = document.createElement("h2")
    const descriptionElement = document.createElement("p")
    const listElement = document.createElement("ul")

    titleElement.textContent = section.title
    descriptionElement.textContent = section.description

    if (section.list) {
      section.list.forEach((item) => {
        const listItem = document.createElement("li")
        listItem.textContent = item
        listElement.appendChild(listItem)
      })
    }

    divElement.appendChild(titleElement)
    divElement.appendChild(descriptionElement)
    divElement.appendChild(listElement)

    switch (index) {
      case 0:
        intro.appendChild(divElement)
        break
      case 1:
        causes.appendChild(divElement)
        break
      case 2:
        effects.appendChild(divElement)
        break
      case 3:
        solutions.appendChild(divElement)
        break
      case 4:
        stats.appendChild(divElement)
        break
    }
  })
}

// Fetch AQI data
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(form)
  const city = formData.get("city")

  let aqiElement = document.getElementById("aqi-display")
  if (!aqiElement) {
    aqiElement = document.createElement("div")
    aqiElement.id = "aqi-display"
    form.appendChild(aqiElement)
  }
  aqiElement.textContent = "Loading..."

  try {
    const response = await fetch(`${API_URL}&city=${city}`)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    const data = await response.json()
    const aqi = data.data.aqi
    aqiElement.textContent = `Air Quality Index (AQI) in ${city} is ${aqi}`
  } catch (error) {
    aqiElement.textContent = "Error fetching data. Please try again."
    console.error(error)
  }
})
