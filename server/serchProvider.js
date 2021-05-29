
var request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs')


async function GET_PROVIDER(name) {
    var Name = name;
    var final = [];
    var english = /^[A-Za-z0-9]*$/;
    const checkName = name.split("-").join("")

    if (english.test(checkName.replace(/[^a-zA-Z ]/g, ""))) {
        // console.log(true);

        const option = {
            url: `${process.env.PATH_PROVIDR}${Name}${process.env.PATH_PROVIDER_B}`,
            json: true
        }

        await request(option)
            .then(async data => {
                let movieData = [];
                var id = data.items[0].id;
                movieData.push(id);
                const option2 = {
                    url: `https://apis.justwatch.com/content/titles/movie/${id}/locale/en_US?language=en`,
                    json: true
                }

                await request(option2)
                    .then(Data => {
                        for (let movie of Data.offers) {
                            var type = movie.monetization_type;
                            if (type == "flatrate") {
                                var url = movie.urls.standard_web;
                                var split = url.split('.')[1];
                                const index = movieData.findIndex(x => x === split);
                                if (index === -1) {
                                    movieData.push(split);
                                }
                            }
                        }
                        final = movieData;
                    }).catch(err => {
                        final = [false]
                    })
            })
            .catch(err => {
                final = [false]
            });

        return final;
    } else {
        return final = [false]
    }

}

async function GET_PROVIDER_TV(name, year) {
    var Name = name;
    var final = [];
    var english = /^[A-Za-z0-9]*$/;
    const checkName = name.split("-").join("")

    if (english.test(checkName.replace(/[^a-zA-Z ]/g, ""))) {
        const option = {
            url: `https://apis.justwatch.com/content/titles/en_US/popular?body=%7B%22fields%22:[%22cinema_release_date%22,%22full_path%22,%22full_paths%22,%22id%22,%22localized_release_date%22,%22object_type%22,%22poster%22,%22scoring%22,%22title%22,%22tmdb_popularity%22,%22offers%22],%22enable_provider_filter%22:false,%22query%22:%22${Name}%22,%22monetization_types%22:[],%22page%22:1,%22page_size%22:10,%22matching_offers_only%22:false%7D&language=en`,
            json: true
        }
        var final_tv = [];
        var movieYear;
        await request(option)
            .then(async data => {
                let movieData = [];
                var id = data.items[0].id;
                movieData.push(id);
                const option2 = {
                    url: `https://apis.justwatch.com/content/titles/show/${id}/locale/en_US?language=en`,
                    json: true
                }
                await request(option2)
                    .then(Data => {
                        var Year = Data.original_release_year;
                        for (let movie of Data.offers) {
                            var type = movie.monetization_type;
                            if (type == "flatrate") {
                                var url = movie.urls.standard_web;
                                var split = url.split('.')[1];
                                const index = movieData.findIndex(x => x === split);
                                if (index === -1) {
                                    movieData.push(split);
                                }
                            }
                        }
                        final_tv = movieData;
                        movieYear = Year;
                    }).catch(err => {
                        return final_tv = [false]
                    })

                if (movieYear == year) {
                    return;
                }

            })
            .catch(err => {
                return final_tv = [false]
            });

        return final_tv;
    } else {
        return final_tv = [false]
    }


}

function FET_WIKI_NETFLIX_FILM() {

    const net = `https://en.wikipedia.org/wiki/List_of_Netflix_original_films_(2012%E2%80%932019)`

    request(net, function (err, response, html) {
        var $ = cheerio.load(html)
        var allMovies = $('#Feature_films').parent().next().children().children();
        var array = [];
        $(allMovies).each((i, element) => {
            var data = $(element).text();
            if (data !== "") {
                var newData;
                Data = data.split("\n");
                for (var i = 0; i < Data.length; i++) {
                    if (Data[i] == "") {
                        Data.splice(i, 1);
                        i--;
                    }
                }

                if (Data !== "") {
                    array.push(Data)
                }


            }
        });

        fs.writeFile("new.txt", JSON.stringify(array, null, 1), function (err) {
            if (err) {
            } else {
                // console.log("data has been new file");
            }
        })
    });

}

module.exports = { GET_PROVIDER, FET_WIKI_NETFLIX_FILM, GET_PROVIDER_TV }