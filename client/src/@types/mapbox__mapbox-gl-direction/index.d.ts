declare module '@mapbox/mapbox-gl-directions' {
    interface IOptions {
        accessToken: string,
        unit: string,
        profile: string
    }

    export default class MapBoxDirections {

        constructor(options: IOptions);
        
    }    
}