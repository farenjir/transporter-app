import * as transformer from "./transformer";

export const getAllCountry = (callApi, lngTypeId = 10) => {
    return callApi({ url: "Country/GetAllCountry", params: { lngTypeId } })
        .then((response) => transformer.countriesTransformData(response))
        .catch((_e) => []);
};

export const getAllLocationByCountry = (callApi, lngTypeId = 10, countryId = 1) => {
    return callApi({ url: "GeoLocation/GetAllLocationByCountry", params: { lngTypeId, countryId } })
        .then((response) => transformer.locationsTransformData(response, countryId))
        .catch((_e) => []);
};

export const getBasicEnums = (callApi, TypeId = 0, lngTypeId = 10,) => {
    return callApi({ url: "BasicEnums/GetBaseEnumsByType", params: { lngTypeId, TypeId } })
        .then((response) => transformer.enumsTransformData(response))
        .catch((_e) => []);
};

export const userAuthentication = (callApi, cpid, pNumber) => {
    return callApi({ url: "UserProflie/login", method: "POST", params: { cpid, pNumber } })
        .then((response = {}) => response)
        .catch((_e) => { });
};

export const userRegister = (callApi, userData = {}) => {
    const data = {
        id: 0,
        isVerified: true,
        registerDate: null,
        roleTypeId: 0,
        firstName: userData.firstName,
        lastName: userData.lastName,
        uPassword: userData.uPassword,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        originCountryId: userData.originCountryId,
        genderTypeId: userData.genderTypeId,
        phoneCoutryPrefixId: userData.phoneCoutryPrefixId ?? 98,
    };
    return callApi({ url: "UserProflie/login", method: "POST", data })
        .then((response = {}) => response)
        .catch((_e) => { });
};

//
