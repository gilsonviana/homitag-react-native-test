import axios from 'axios'

export default (token) => {

    /**
     * Get a single playlist information.
     * 
     * @param {string} url API href for the playlist
     */
    const getPlaylist = async (url) => {
        try {
            const { data } = await axios({
                url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return data
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * Get a single track information.
     * 
     * @param {string} url API href for the track
     */
    const getTrack = async (url) => {
        try {
            const { data } = await axios({
                url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return data
        } catch (e) {
            throw new Error(e)
        }
    }

    return {
        getPlaylist,
        getTrack
    }
}