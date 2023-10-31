class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=02c61294c392eb793aafe8110c1d7a67';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformChar);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformChar(res.data.results[0]);
    }

    _transformChar = (char) => {
        return {
            name: char.name,
                    description: char.description ? `${char.description.slice(0, 210)}...` : 'Описания данного персонажа нет!',
                    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                    homepage: char.urls[0].url,
                    wiki: char.urls[1].url
        }
    }
}

export default MarvelServices;