const url = "https://api.spacexdata.com/v4/launches/upcoming/";
const next_launch_container = document.querySelector(".next_launch");

async function next_launches() {
    try {
        const response = await fetch(url);
        const results = await response.json();
  
        for(let i = 0; i < results.length; i++) {
            if (results[i].links.patch.small === null){
              continue;
            }

            next_launch_container.innerHTML += `<a href="details.html?id=${results[i].id}">
                                                <div class="launches_index_little_box">    
                                                  <h4>${results[i].name}</h4>
                                                  <img src="${results[i].links.patch.small}" class="launch_img_index" alt="SpaceX image">
                                                  <p>Launch date <br>${convert_launch_date(results[i].date_unix)}</p>
                                                  </a>
                                                  <hr>
                                                </div>`;
        }
  
    } catch (error) {
        console.log(error);
        next_launch_container.innerHTML = message("error", error);
    }
  }
  
  next_launches();
  

function convert_launch_date(launchDate) {
  let date = new Date(launchDate*1000);  
  return date.toLocaleDateString();
}