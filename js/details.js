const detailContainer = document.querySelector(".launches_details_box");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.spacexdata.com/v4/launches/" + id;

async function launchDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();
    
    createHTML(details);

  }     
    catch (error) {
    console.log(error);
    detailContainer.innerHTML = "Oops, something went wrong";
  }
}

launchDetails();

function createHTML(launch_Details) {
  
  let noDetails = "There is no information about this launch yet, we hope it will be updated soon!";

  if (launch_Details.details) {
      noDetails = launch_Details.details;
  };

  detailContainer.innerHTML = `<title>${launch_Details.name}</title>
                                <div class="launches_more_details_box">  
                                  <img src="${launch_Details.links.patch.small}" class="details_img" alt="SpaceX image">   
                                    <h1 class=""details_h1>${launch_Details.name}</h1>
                                    <h2>Flight Number ${launch_Details.flight_number}</h2>
                                    <p>${noDetails}</p>
                                    <p>Launch date ${convert_launch_date(launch_Details.date_unix)}</p>
                                    <a href="${launch_Details.links.article}" class="button_2">
                                    <div class="button_div">
                                    <p>Click this button <br>for more information</p>
                                    </div>
                                    </a>
                                    <br>
                                </div>
                                `;                               
}


function convert_launch_date(launchDate) {
  let date = new Date(launchDate*1000);  
  return date.toLocaleDateString();
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString