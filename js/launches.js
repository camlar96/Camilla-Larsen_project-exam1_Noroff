const url = "https://api.spacexdata.com/v4/launches/";
const resultsContainer_success = document.querySelector(".launches_big_box_successfull");
const resultContainer_failed = document.querySelector(".launches_big_box_failed");
const resultContainer_next = document.querySelector(".launches_big_box_next");

async function successfull_launches() {
    try {
        const response = await fetch(url);
        const results = await response.json();

        for(let i = 0; i < results.length; i++) {
            if(results[i].success !== true) {
                continue;
            } else if (results[i].success === null) {
                continue;
            }; 

            resultsContainer_success.innerHTML += `<div class="launches_little_box"> 
                                                        <h4>${results[i].name}</h4>
                                                        <img src="${results[i].links.patch.small}" class="launch_img" alt="SpaceX image">
                                                        <a href="details.html?id=${results[i].id}" class="button">Read More</a>
                                                        <hr>
                                                    </div>`;
                    }

    } catch (error) {
        console.log(error);
        resultsContainer_success.innerHTML = message("error", error);
    }
}

successfull_launches();

async function failed_launches() {
  try {
      const response = await fetch(url);
      const results = await response.json();

      for(let i = 0; i < results.length; i++) {
          if(results[i].success !== false) {
            continue;
          } else if (results[i].success === null) {
            continue;
          }

          resultContainer_failed.innerHTML += `<div class="launches_little_box">        
                                                <h4>${results[i].name}</h4>
                                                <img src="${results[i].links.patch.small}" class="launch_img" alt="SpaceX image">
                                                <a href="details.html?id=${results[i].id}" class="button">Read More</a>
                                                <hr>  
                                              </div>`;
      }

  } catch (error) {
      console.log(error);
      resultContainer_failed.innerHTML = message("error", error);
  }
}

failed_launches();


async function next_launches() {
  try {
      const response = await fetch(url);
      const results = await response.json();

      for(let i = 0; i < results.length; i++) {
          if(results[i].upcoming !== true ) {
              continue;
            } else if (results[i].links.patch.small === null){
            continue;
            }
         
          resultContainer_next.innerHTML += `<div class="launches_little_box">      
                                                <h4>${results[i].name}</h4>
                                                <img src="${results[i].links.patch.small}" class="launch_img" alt="SpaceX image">
                                                <a href="upcoming_launches_details.html?id=${results[i].id}" class="button">Read More</a>
                                                <hr>
                                            </div>`;
      }

  } catch (error) {
      console.log(error);
      resultContainer_next.innerHTML = message("error", error);
  }
}

next_launches();

window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});