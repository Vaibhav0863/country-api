function getParam() {
    const urlParam = new URLSearchParams(window.location.search);
    let urlData = {};
    for (let param of urlParam) {
        urlData[param[0]] = param[1];
    }

    return urlData
}

function loadData() {
    const { code } = getParam()

    $.get(`https://restcountries.eu/rest/v2/alpha/${code}`, function (country) {

        renderCountry(country);
    })
}


// Rendering data related to that country
async function renderCountry(country) {
    $("#result").html(`
        <div id="flag" class="w-10/12 self-center  rounded-lg overflow-hidden shadow">
					<img
						class="w-full h-full object-cover"
						src="${country['flag']}"
						alt="${country['name']}"
					/>
				</div>
				<div class="">
					<h1 class="text-4xl mt-10 font-extrabold">${country['name']}</h1>
					<div id="country-desc" class="mt-5 flex justify-between">
						<div>
							<p class="font-semibold leading-loose">
								Native Name: <span class="font-light">${country['nativeName']}</span>
							</p>
							<p class="font-semibold leading-loose">
								Population : <span class="font-light">${Intl.NumberFormat().format(country['population'])}</span>
							</p>
							<p class="font-semibold leading-loose">
								Region : <span class="font-light">${country['region']}</span>
							</p>
							<p class="font-semibold leading-loose">
								Sub Region : <span class="font-light">${country['subregion']}</span>
							</p>
							<p class="font-semibold leading-loose">
								Capital : <span class="font-light">${country['capital']}</span>
							</p>
						</div>

						<div>
							<p class="font-semibold leading-loose">
								Top Level Domain : <span class="font-light">${country['topLevelDomain']}</span>
							</p>
							<p class="font-semibold leading-loose">
								Currency : <span class="font-light capitalize">${country['currencies'][0]["code"]}</span>
							</p>
							<p class="font-semibold leading-loose">
								Languages :
								<span class="font-light"
									>${renderLang(country)}</span
								>
							</p>
						</div>
					</div>
					<div id="border" class="mt-12 flex">
                    <p class="font-extrabold w-3/12">Border Countries:</p>
                    <div id="borders" class="ml-3 w-9/12 text-sm flex flex-wrap ">
                    ${renderBorderCountries(country['borders'])}
						</div>
					</div>
				</div>
    `)
}

// rendering list of languages

function renderLang(country) {
    let lang = country['languages']

    lang = lang.map(item => {
        return item['name']
    })

    return `${lang}`;
}

// render border countries 
async function renderBorderCountries(borders) {
    let result = ``
    // borders.length = 5
    for (let code of borders) {
        await $.get(`https://restcountries.eu/rest/v2/alpha/${code}`, function (data) {
            result += `
                    <span class="mx-2 my-1 px-3 py-2 shadow hover:shadow-md rounded-sm">
                    ${data['name']}
                    </span>
                `
        })
    }
    result = await result;
    // return result
    if (result.length == 0) {
        $("#border").html(result)

    }
    else {

        $("#borders").html(result)
    }
}
