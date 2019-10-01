
TreatedWirelessNetwork = function(arrayJson) {

    let seenObjects = {};
    let list = []
    let listAll = [];
    
    let jsonParseArray = [];

    arrayJson.forEach(element => { jsonParseArray.push(JSON.parse(element)) })

    arrayJson = jsonParseArray;

    arrayJson.forEach(value => { listAll.push(value.networkSSID); })

    arrayJson.filter(function (value) {
        if(value.networkSSID in seenObjects)
        {   
            return false
            
        } else {
            seenObjects[value.networkSSID] = true;
            list.push(value.networkSSID)
            return true
        }
    })

    let networks = [];
    list.forEach(value => {
        let indices = [];    
        let element = value;
        let ids = listAll.indexOf(element);
        while (ids != -1) {
            indices.push(ids);
            ids = listAll.indexOf(element, ids + 1);
        }
        if(indices.length > 1) {
            let rssi = []
            //Pegando todos os valores de sinal para verificar qual é o menor.
            indices.forEach(element => {
                let json = arrayJson[element];
                rssi.push(Number(json.networkRSSI));
            });
            rssi = Math.max.apply(Math,rssi);
            let json =  {
                networkSSID: arrayJson[indices[0]].networkSSID,
                networkRSSI: rssi
            }
            networks.push(json);
            return;
        

        } else {
            let json =  {
                networkSSID: arrayJson[indices[0]].networkSSID,
                networkRSSI: Number(arrayJson[indices[0]].networkRSSI)
            }
            networks.push(json);
            return;
        }
    })
    return networks;

}