import * as types from './types'

export const getRecommendations = (token = '') => async dispatch => {
    try {
        // Make API call here
        dispatch({
            type: types.SET_RECOMMENDATIONS,
            payload: {
                recommendations: [{
                    id: 0,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXzkSaMzIqe1iHjeQn6Acdvv6yMN6vqWHuPw&usqp=CAU',
                    numOfTracks: 12,
                    name: 'Beta 1',
                    artistName: 'Seal'
                }, {
                    id: 1,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTw0GgzqopGoHKyTDnlZRr5Nuo21TSmWYzINg&usqp=CAU',
                    numOfTracks: 22,
                    name: 'Beta 2',
                    artistName: 'Van Halen'
                }, {
                    id: 2,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXzkSaMzIqe1iHjeQn6Acdvv6yMN6vqWHuPw&usqp=CAU',
                    numOfTracks: 31,
                    name: 'Beta 3',
                    artistName: 'Seal'
                }, {
                    id: 3,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTw0GgzqopGoHKyTDnlZRr5Nuo21TSmWYzINg&usqp=CAU',
                    numOfTracks: 1,
                    name: 'Beta 2',
                    artistName: 'Van Halen'
                }]
            }
        })
    } catch (e) {
        throw new Error(e)
    }
}