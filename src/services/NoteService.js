import axios from '../aixos';

const NoteService = {
    getAllNotes: () => {
        return axios.get('/notes')
            .then(({ data }) => {
                return data;
            })
            .catch(err => {

            });
    },
    getNoteById: (id) => {
        return axios.get(`/notes/${id}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {

            });
    },
    addNote: (data) => {
        return axios.post('/notes', data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {

            });
    },
    updateNote: (data, id) => {
        return axios.put(`/notes/${id}/`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {

            });
    },
    searchNote: (param) => {
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
    }
}

export default NoteService;