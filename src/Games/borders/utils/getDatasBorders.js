import { getCountries } from "../../../services/countries/getCountries"
import { getRandom } from "../../common/utils/getRandom"

export default async function getDatasBorders() {
  let datas = []
 
  // получить все страны
  let countries = await getCountries()

  
  // получить страны, которые имеют более 2 границ
  let countriesInGame = [...countries.filter((c) => c.borders?.length > 2)]
  
  // взять 50 стран
  countriesInGame = getRandom(countriesInGame, 50)
  
  countriesInGame.forEach((co) => {
    datas.push(getPath(co, countries))
  })
  
  datas = datas.filter((d) => !d.oneTravel)
  
  // взять 10
  datas = getRandom(datas, 10)
  
  return datas
}

function getPath(country, countries) {
  let duplicateCountries = [...countries]
  let path = {
    start: country,
    path: []
  }

  // добавить borderNames в массив
  let bNames = []

  country.borders.forEach((b) => {
    bNames.push(countries.find((c) => b == c.cca3)?.name.common)
  })

  country.borderNames = bNames

  for (let i = 0; i < 4; i++) {
    // удалить фактическую страну из повторяющегося массива, чтобы избежать цикла
    duplicateCountries = duplicateCountries.filter(
      (d) => d.cca3 != country.cca3
    )

    // выбрать границы, которые имеют более 2 границ
    let borders = [];
    country.borders.forEach((b) => {
      let border = duplicateCountries.find((d) => d.cca3 === b)

      if (border?.borders.length >= 2) {
        borders.push(border)
      }
    })

    let newCountry = borders[Math.floor(Math.random() * borders.length)]

    if (!newCountry) {
      break
    }

    country = newCountry
    path.path.push(country)
  }

  path.end = country

  if (path.start.borders.includes(path.end.cca3)) {
    path.oneTravel = true
  }

  return path
}