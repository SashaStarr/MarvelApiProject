


class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=17ebacbf929151bb9bc18af67b038b27';
    _bassedOffset = 210

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could  not fetch ${url},status : ${res.status} `)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._bassedOffset) => {
        const res = await this.getResource(`${this._apiBase}?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    fixDescription = (description) => {
        const errorDesc = 'sorry we miss discription'
        if (description.length < 1) { return errorDesc }
        if (description.length > 150) {
            return description.slice(0, 150) + '...'
        }
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            discription: this.fixDescription(char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService