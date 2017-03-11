export class DadataProvider {
    url: string;

    api_key: string = "addd20a4239b372f487a40e872a0e1f334cec66c";

    constructor() {
        this.url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    }

    request( input ) {
        return fetch( this.url,
            {
                method:  "POST",
                //mode:'no-cors',
                headers: {
                    'Accept':        "application/json",
                    'Content-Type':  'application/json',
                    'Authorization': 'Token ' + this.api_key
                },
                body:    JSON.stringify( { query: input, count: 10 } )
            } )
        .then( response => {
            //console.log("Input response", response);
            if ( response.ok === true ) {
                return response.json();
            } else {
                throw "error not ok"
            }

        } ).then( json => {
            //console.log("Input json", json);
            return json
        } ).catch( e => {
            console.log( "Input error", e );
        } )
    }
}