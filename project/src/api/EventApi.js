import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5102"

export async function getEvents(userId) {
    const response = await axios.get(`/Event/${userId}`)
    console.log("Events in function:" + response.data.value)
    return response.data.value
}

export async function addEvent(event) {
    axios.post('/Event', event)
        .then((response) => {
            console.log(response)
            return response.data.statusCode
        })
        .catch((e) => {
            console.log(e)
            return 0
        })
}

export async function deleteEvent(event) {
    axios.delete(`/Event/${event.eventId}`)
        .then((response) => {
            return response.data.statusCode
        })
        .catch((e) => {
            console.log(e)
        })
}