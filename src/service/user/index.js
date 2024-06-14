export const getMyCarrierRequest = (callApi, queries) => {
    return callApi({ url: "RequestForCarrier/GetMyRequest", params: queries })
        .then((response) => response)
        .catch((_e) => []);
};

export const getMyAnnonceRequest = (callApi, queries) => {
    return callApi({ url: "CarrierAnnonce/GetMyCarrrierAnnonce", params: queries })
        .then((response) => response)
        .catch((_e) => []);
};