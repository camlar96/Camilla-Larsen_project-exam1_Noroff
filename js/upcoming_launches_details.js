const detailContainer = document.querySelector(".launches_details_box");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.spacexdata.com/v4/launches/" + id;

async function launchDetails_upcoming() {
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

launchDetails_upcoming();

function createHTML(launch_Details) {
  
  let noDetails = "There is no information about this launch yet, we hope it will be updated soon!";

  if (launch_Details.details) {
      noDetails = launch_Details.details;
  };

  detailContainer.innerHTML = `<title>${launch_Details.name}</title>
                                <div class="launches_more_details_box">  
                                  <img src="${launch_Details.links.patch.small}" class="details_img" alt="SpaceX image">   
                                    <h2>${launch_Details.name}</h4>
                                    <h3>Flight Number ${launch_Details.flight_number}</h4>
                                    <p>${noDetails}</p>
                                    <p>Launch date ${convert_launch_date(launch_Details.date_unix)}</p>
                                    <br>
                                </div>
                                `;                               
}


function convert_launch_date(launchDate) {
  let date = new Date(launchDate*1000);  
  return date.toLocaleDateString();
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString