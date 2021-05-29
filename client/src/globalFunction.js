
export function RANDOM_NUMBER_UP() {
    var x = Math.floor((Math.random() * 10))
    return x;
}

export async function Fetch(path, sec, type, rigion, detailsFind, tvOrMovie) {

    let Language = ''
    if (rigion === "il") {
        Language = '&language=he-IL';
    } else if (rigion === 'us') {
        Language = '&language=en-US';
    }


    let FINAL_DATA = [];

    const arrayData = []

    let page;
    page = RANDOM_NUMBER_UP()
    if (type === "search" || type === "similar") {
        page = 1;
    }
    for (let i = 0; i < 50; i++) {

        if (page === 0) {
            page = 1;
        }
        const Path = path;
        const link = `https://api.themoviedb.org/3${Path}?api_key=9e1bbbd2a1b39009c7e75de9dda6829c${Language}&page=${page}${sec}`

        await (
            fetch(link)
                .then(res => (res.json()))
                .then(data => {
                    data.results.forEach(item => {
                        if (item.poster_path !== null || item.overview !== "") {
                            if (type === 'search' || type === 'similar') {
                                arrayData.push(item)
                            } else {
                                if (FINAL_DATA.length < 20) {
                                    if (type === 'find') {
                                        const movieYear = tvOrMovie === 'tv' ? Number(item.first_air_date.split("-")[0]) : Number(item.release_date.split("-")[0]);
                                        const movieVote = Number(item.vote_count)
                                        const movieLanguagh = item.original_language.toString().trim();
                                        if (detailsFind.inputYear <= movieYear && movieVote >= detailsFind.inputLikes && movieLanguagh === detailsFind.inputLanguagh) {
                                            arrayData.push(item)
                                        }
                                    } else {
                                        arrayData.push(item)
                                    }
                                }
                            }
                        }
                    })
                    return FINAL_DATA = arrayData

                })
                .catch(err => console.log(err))

        )

        if (type === 'search') {

            return FINAL_DATA;
        } else {
            if (FINAL_DATA.length < 20) {
                page++;
                continue;
            } else {
                return FINAL_DATA;

            }
        }
    }
    if (type === 'search' || type === 'similar') {
        return FINAL_DATA;

    } else {

        if (FINAL_DATA.length === 20) {
            return FINAL_DATA;
        } else if (type === 'find') {
            return FINAL_DATA;
        }
    }


}
export async function FetchMovie(Path) {
    // console.log(123456);
    const link = `https://api.themoviedb.org/3${Path}?api_key=9e1bbbd2a1b39009c7e75de9dda6829c`
    let DATA;
    await (
        fetch(link)
            .then(res => (res.json()))
            .then(data => {
                return DATA = data
            })
            .catch(err => console.log(err))

    )
    // console.log(136, DATA);
    if (DATA) {

        return DATA;
    }
}
export function FIND_LANGUAGE(language, rigion) {

    var LANGUGHE_ARRAY =
        [["en", 'English', 'אנגלית'],
        ["fr", 'French', 'צרפתית'],
        ["de", 'German', 'גרמנית'],
        ["es", 'Spanish/Castilian', 'ספרדית/קטלאנית'],
        ["ja", 'Japanese', 'יפנית'],
        ['pt', 'Portuguese', 'פורטוגזית'],
        ["it", 'Italian', 'איטלקית'],
        ["ru", 'Russian', 'רוסית'],
        ["zh", 'Chinese', 'סינית'],
        ["ko", 'Korean', 'קוראנית'],
        ['nl', 'Dutch/Flemish', 'הולנדית'],
        ["sv", 'Swedish', 'שוודית'],
        ["hi", 'Hindi', 'הודית'],
        ["cs", 'Czech', "צ'כיה"],
        ["tr", 'Turkish', 'טורקית'],
        ["cn", 'Cantonese', 'קנטונזית'],
        ["da", 'Danish', 'דנית '],
        ["ar", 'Arabic', 'ערבית'],
        ["ta", 'Tamil', 'טמילית'],
        ["el", 'Greek', 'יוונית'],
        ["pl", 'Polish', 'פולנית'],
        ["ml", 'Malayalam'],
        ["tl", 'Tagalog'],
        ["id", 'Indonesian'],
        ["hu", 'Hungarian'],
        ["fa", 'Persian'],
        ["fi", 'Finnish'],
        ["no", 'Norwegian'],
        ["te", 'Telugu'],
        ["th", 'Thai'],
        ["he", 'Hebrew', 'עברית'],
        ["ro", 'Romanian', 'רומנית'],
        ["hr", 'Croatian'],
        ["bn", 'Bengali'],
        ["vi", 'Vietnamese'],
        ["ms", 'Malay'],
        ["kn", 'Kannada'],
        ["sl", 'Slovenian'],
        ["sk", 'Slovak'],
        ["bg", 'Bulgarian'],
        ["uk", 'Ukrainian'],
        ["et", 'Estonian'],
        ["lv", 'Latvian'],
        ["mr", 'Marathi'],
        ["sq", 'Albanian'],
        ["lt", 'Lithuanian'],
        ["ca", 'Catalan/Valencian'],
        ["ka", 'Georgian'],
        ["pa", 'Panjabi/Punjabi'],
        ["ur", 'const [state, dispatch] = useReducer(reducer, initialState, init)'],
        ["az", 'Azerbaijani'],
        ["bs", 'Bosnian'],
        ["is", 'Icelandic'],
        ["mk", 'Macedonian'],
        ["af", 'Afrikaans'],
        ["eu", 'Basque'],
        ["nb", 'Bokmål, Norwegian; Norwegian Bokmål'],
        ["hy", 'Armenian'],
        ["ab", 'Abkhazian'],
        ["ku", 'Kurdish'],
        ["gl", 'Galician'],
        ["si", 'Sinhala; Sinhalese'],
        ["as", 'Assamese'],
        ["ne", 'Nepali'],
        ["gu", 'Gujarati'],
        ["kk", 'Kazakh'],
        ["my", 'Burmese'],
        ["mn", 'Mongolian'],
        ["km", 'Central Khmer'],
        ["am", 'Amharic'],
        ["sh", 'Serbo-Croatian'],
        ["bo", 'Tibetan'],
        ["zu", 'Zulu'],
        ["be", 'Belarusian'],
        ["jv", 'Javanese'],
        ["ky", 'Kirghiz; Kyrgyz'],
        ["sw", 'Swahili'],
        ["ga", 'Irish'],
        ["uz", 'Uzbek'],
        ["lb", 'Luxembourgish; Letzeburgesch'],
        ["ps", 'Pushto; Pashto'],
        ["la", 'Latin'],
        ["wo", 'Wolof'],
        ["se", 'Northern Sami'],
        ["mt", 'Maltese'],
        ["iu", 'Inuktitut'],
        ["cy", 'Welsh'],
        ["gd", 'Gaelic; Scottish Gaelic'],
        ["lo", 'Lao'],
        ["tg", 'Tajik'],
        ["ht", 'Haitian; Haitian Creole'],
        ["qu", 'Quechua'],
        ["yi", 'Yiddish'],
        ["bm", 'Bambara'],
        ["fo", 'Faroese'],
        ["or", 'Oriya'],
        ["dv", 'Divehi; Dhivehi; Maldivian'],
        ["nn", 'Norwegian Nynorsk; Nynorsk, Norwegian'],
        ["dz", 'Dzongkha'],
        ["mi", 'Maori'],
        ["so", 'Somali'],
        ["eo", 'Esperanto'],
        ["mo", 'Moldavian; Moldovan'],
        ["hz", 'Herero'],
        ["xh", 'Xhosa'],
        ["mg", 'Malagasy'],
        ["cr", 'Cree'],
        ["ak", 'Akan'],
        ["ha", 'Hausa'],
        ["ln", 'Lingala'],
        ["mh", 'Marshallese'],
        ["rw", 'Kinyarwanda'],
        ["gn", 'Guarani'],
        ["tk", 'Turkmen'],
        ["sm", 'Samoan'],
        ["sa", 'Sanskrit'],
        ["ce", 'Chechen'],
        ["ti", 'Tigrinya'],
        ["st", 'Sotho, Southern'],
        ["ba", 'Bashkir'],
        ["yo", 'Yoruba'],
        ["ie", 'Interlingue; Occidental'],
        ["kl", 'Kalaallisut; Greenlandic'],
        ["sn", 'Shona'],
        ["ks", 'Kashmiri'],
        ["fy", 'Western Frisian'],
        ["bi", 'Bislama'],
        ["su", 'Sundanese'],
        ["ny", 'Chichewa; Chewa; Nyanja'],
        ["ay", 'Aymara'],
        ["ig", 'Igbo'],
        ["oc", 'Occitan (post 1500)'],
        ["za", 'Zhuang; Chuang'],
        ["an", 'Aragonese'],
        ["rm", 'Romansh'],
        ["sg", 'Sango'],
        ["av", 'Avaric'],
        ["ff", 'Fulah'],
        ["to", 'Tonga (Tonga Islands)'],
        ["co", 'Corsican'],
        ["ug", 'Uighur; Uyghur'],
        ["aa", 'Afar'],
        ["os", 'Ossetian; Ossetic'],
        ["ii", 'Sichuan Yi; Nuosu'],
        ["tn", 'Tswana'],
        ["lg", 'Ganda'],
        ["pi", 'Pali'],
        ["sd", 'Sindhi'],
        ["ss", 'Swati'],
        ["ho", 'Hiri Motu'],
        ["fj", 'Fijian'],
        ["ty", 'Tahitian'],
        ["kg", 'Kongo'],
        ["tt", 'Tatar'],
        ["ik", 'Inupiaq'],
        ["gv", 'Manx'],
        ["ch", 'Chamorro'],
        ["oj", 'Ojibwa'],
        ["ts", 'Tsonga'],
        ["kw", 'Cornish']];

    var data = ""
    LANGUGHE_ARRAY.forEach(lan => {
        if (rigion === "il") {
            if (lan[0] === language) {
                if (lan[2]) {
                    data = lan[2];
                } else if (!lan[2]) {
                    data = lan[1];
                }
            }
        } else if (rigion === "us") {
            if (lan[0] === language) {
                data = lan[1];
            }
        }

    });
    return data;
}

export const FIND_GENERE = (generes, rigion) => {

    let GENER_ARRAY = []
    if (rigion === "il") {

        GENER_ARRAY = [
            [28, 'אקשן'],
            [35, 'קומדיה'],
            [27, 'אימה'],
            [80, 'פשע'],
            [18, 'דרמה'],
            [878, 'מדע בדיוני'],
            [12, 'הרפתקאות'],
            [16, 'אנימציה'],
            [99, 'דוקומנטרי'],
            [10751, 'Family'],
            [36, 'היסטוריה'],
            [14, 'פנטזיה'],
            [9648, 'תעלומה'],
            [10749, 'רונטיקה'],
            [53, 'מותחן'],
            [10752, 'מלחמה']
        ]
    } else if (rigion === "us") {
        GENER_ARRAY = [
            [28, 'Action'],
            [35, 'Comedy'],
            [27, 'Horror'],
            [80, 'Crime'],
            [18, 'Drama'],
            [878, 'Science Fiction'],
            [12, 'Adventure'],
            [16, 'Animation'],
            [99, 'Documentary'],
            [10751, 'Family'],
            [36, 'History'],
            [14, 'Fantasy'],
            [9648, 'Mystery'],
            [10749, 'Romance'],
            [53, 'Thriller'],
            [10752, 'War']
        ];


    }


    var newaraay = [];
    GENER_ARRAY.forEach(gen => {
        generes.forEach(ge => {
            if (ge === Number(gen[0])) {
                newaraay.push(gen[1]);
            }
        });
    });
    return newaraay;
}