// *** auth
export const authSelector = (state) => state?.auth || {}
export const userSelector = (state) => state?.auth?.user || {}

export const baseSelector = (state) => state?.bases || [];