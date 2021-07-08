import React from 'react';
import FontAwesome from 'react-fontawesome';
import NoteService from '../../services/NoteService';
import { withState } from '../../note-context';
import { SET_ISUPDATE, SET_UPDATED_NOTES } from '../../store/actionTypes';
import './ListNotes.css';

class ListNotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        console.log(this.props.state.notes);
        this.setState({ notes: this.props.state.notes });
        this.props.dispatch({ type: SET_ISUPDATE });
    }

    componentDidUpdate() {
        if (this.props.state.isUpdated) {
            this.setState({ notes: this.props.state.notes });
            this.props.dispatch({ type: SET_ISUPDATE });
        }
    }


    editHandler = (id) => {
        this.props.click(id);
    };

    deleteHandler = (id) => {
        NoteService.deleteNote(id, this.props.state.user.id)
            .then(res => {
                console.log(res);
                this.props.dispatch({ type: SET_UPDATED_NOTES, notes: res })
            }).catch(err => { console.log(err); })
    };

    render() {
        const { notes } = this.state;
        const row = notes.length > 0 && notes.map((note, index) => {
            return (
                <tr key={index}>
                    <td>{note.id}</td>
                    <td>{note.description}</td>
                    <td>{note.createdAt}</td>
                    <td>{note.updatedAt}</td>
                    <td className="d-flex flex-row p-4">
                        <div onClick={() => this.editHandler(note.id)}><FontAwesome name="editHandler" className="fas fa-edit m-2" /></div>
                        <div onClick={() => this.deleteHandler(note.id)}><FontAwesome name="deleteHandler" className="fas fa-trash m-2" /></div>
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

export default withState(ListNotes);