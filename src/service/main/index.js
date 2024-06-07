export const userAuthentication = (callApi, cpid, pNumber) => {
    return callApi({ url: "UserProflie/login", method: "POST", params: { cpid, pNumber } })
        .then((response = {}) => response)
        .catch((_e) => { });
};

export const userRegister = (callApi, userData = {}) => {
    const data = {
        id: 0,
        firstName: userData.firstName,
        lastName: userData.lastName,
        uPassword: userData.uPassword,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        originCountryId: userData.originCountryId,
        genderTypeId: userData.genderTypeId,
        phoneCoutryPrefixId: userData.phoneCoutryPrefixId ?? 98,
        isVerified: true,
        registerDate: null,
        roleTypeId: 0,
    };
    return callApi({ url: "UserProflie/login", method: "POST", data })
        .then((response = {}) => response)
        .catch((_e) => { });
};
