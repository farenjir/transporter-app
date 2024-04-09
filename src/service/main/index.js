
export const allArtist = (callApi) => {
    return callApi({ url: "artist/all" }).then(data => data)
}

export const artist = (callApi, id) => {
    return callApi({ url: `artist/${id}`, }).then(data => data)
}