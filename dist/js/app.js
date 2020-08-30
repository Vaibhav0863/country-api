// get data from API and load it

let data;

function loadData() {
    $.get("https://restcountries.eu/rest/v2/all", function (response) {
        data = response
        renderResult(response)
    }, "json");
}



// searching results with the help of search field
$("#search-field").keyup((event) => {
    event.preventDefault();
    const result = []
    const searchResult = $("#search-field").val().toLowerCase();
    const searchRegex = new RegExp(`^${searchResult}`, "i")
    for (let country of data) {
        if (searchRegex.test(country["name"])) {
            result.push(country)
        }
    }
    renderResult(result)
});


//rendering output
function renderResult(res) {
    const countryList = $("#country-list-grid");
    let list = '';
    countryList.html(list)
    for (let country of res) {
        list += `
                <div
                    class="rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer"
                    onclick = "location.href='./moreInfo.html?code=${country['alpha3Code']}'"
				>
					<div id="flag" class="w-full h-40 overflow-hidden">
						<img
							class="object-cover h-full w-full"
							src="${country["flag"]}"
							alt="${country["name"]}"
						/>
					</div>
					<div id="description" class="p-6">
						<h1 class="font-extrabold text-lg capitalize mb-2">
							${country["name"]}
						</h1>

						<p class="text-sm font-semibold mb-1">
							Population: <span class="font-light">${Intl.NumberFormat().format(parseInt(country["population"]))}</span>
						</p>

						<p class="text-sm font-semibold mb-1">
							Region: <span class="font-light">${country["region"]}</span>
						</p>

						<p class="text-sm font-semibold mb-1">
							Capital: <span class="font-light">${country["capital"]}</span>
						</p>
					</div>
				</div>
            `
    }

    countryList.html(list)
}

// toggle filter menu
$("#filter-btn").click(function () {
    $("#list-container").toggleClass("hidden");
});

// render result with filter
const radios = $("input[type='radio']");
radios.click(function () {
    for (let inp of radios) {
        if (inp.checked) {
            const region = inp.parentElement.innerText;
            $("#filter-btn-title").text(region)
            filterResult(region)
            $("#list-container").toggleClass("hidden");
        }
    }
});

// filter data according to result
function filterResult(region) {
    const result = []
    if (region == "All") {
        renderResult(data)

    }
    else {
        for (let country of data) {
            if (country['region'] == region) {
                result.push(country)
            }
        }
        renderResult(result)
    }

}


