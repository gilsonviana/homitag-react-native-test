import axios from 'axios'

export default (token) => {

    /**
     * Get a single playlist information.
     * 
     * @param {string} url href to the playlist
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

    return {
        getPlaylist
    }
}