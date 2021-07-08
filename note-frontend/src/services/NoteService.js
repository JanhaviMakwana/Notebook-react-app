import axios from '../aixos';

const NoteService = {
    getNotes: (query, userId) => {
        return axios.get(`/get-notes/${userId}/${query}`)
            .then(({ data }) => {
                console.log(data);
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    getNoteById: (userId, noteId) => {
        return axios.get(`/get-note/${userId}/${noteId}`)
            .then(({ data }) => {
                console.log(data);
                return data;
            })
            .catch(err => {

            });
    },
    addNote: (note, userId) => {
        
        return axios.post(`/add-note/${userId}`, note)
            .then(({ data }) => {
                console.log(data);
                return data;
            })
            .catch(err => {

            });
    },
    updateNote: (noteId, note, userId) => {
        
        return axios.post(`/update-note/${userId}/${noteId}`, note)
        
            .then(({ data }) => {
                console.log(data);
                return data;
            })
            .catch(err => {

            });
    },
    deleteNote: (noteId, userId) => {
        
        return axios.get(`/delete-note/${userId}/${noteId}`)
            .then(({ data }) => {
                console.log(data);
                return data;
            })
            .catch(err => {

            });
    }
    /* searchNote: (param) => {
        return axios.get(`/notes?q=${param}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {

            });
    },
    deleteNote: (id) => {
        return axios.delete(`/notes/${id}/`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {

            });
    } */
}

export default NoteService;