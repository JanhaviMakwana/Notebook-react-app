import React from 'react';
import FontAwesome from 'react-fontawesome';
import NoteService from '../../services/NoteService';
import './ListNotes.css';

class ListNotes extends React.Component {

    editHandler = (id) => {
        this.props.click(id);
    };

    deleteHandler = (id) => {
        NoteService.deleteNote(id)
            .then(res => {
                this.props.setData();
            }).catch(err => { console.log(err); })
    };

    render() {
        const notes = this.props.notes;
        const row = notes.map((note, index) => {
            return (
                <tr key={index}>
                    <td>{note.id}</td>
                    <td>{note.note}</td>
                    <td>{note.createdAt}</td>
                    <td>{note.updatedAt}</td>
                    <td className="d-flex flex-row p-4">
                        <div onClick={() => this.editHandler(note.id)}><FontAwesome className="fas fa-edit m-2" /></div>
                        <div onClick={() => this.deleteHandler(note.id)}><FontAwesome className="fas fa-trash m-2" /></div>
                    </td>
                </tr>
            );
        })

        return (
            <div className="notes-list m-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>notes</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>update</th>
                        </tr>
                        {row}
                    </thead>
                </table>
            </div>
        );
    }

};

export default ListNotes;