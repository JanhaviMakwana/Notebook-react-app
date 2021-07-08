import React from 'react';
import AddNote from '../AddNote/AddNote';
import UpdateNote from '../UpdateNote/UpdateNote';
import Search from '../Search/Search';
import NoteService from '../../services/NoteService';
import { withState } from '../../note-context';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            note: null,
            update: false
        }
    }

    upateNotesHandler = (noteId) => {
        NoteService.getNoteById(this.props.state.user.id, noteId)
            .then(res => {
                this.setState({ note: res, update: true })
            })
            .catch(err => {
                console.log(err);
            })
    }

    updateCloseHandler = () => {
        this.setState({ note: null, update: false});
    }

    render() {
        return (
            <div className="d-flex flex-row p-5">
                {!this.state.update
                    ? <AddNote />
                    : <UpdateNote note={this.state.note} updated={() => this.updateCloseHandler()} />}
                <Search
                    click={(id) => this.upateNotesHandler(id)}
                    notesUpdated={() => { this.setState({ updated: false }) }}
                />
            </div>
        );
    }
};

export default withState(Home);