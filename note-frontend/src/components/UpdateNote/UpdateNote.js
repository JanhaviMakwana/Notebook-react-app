import React from "react";
import NoteService from '../../services/NoteService';
import FontAwesome from 'react-fontawesome';
import { SET_UPDATED_NOTES } from '../../store/actionTypes';
import {withState} from '../../note-context';

class UpdateNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            note: '',
            currentTag: ''
        }
    }

    componentDidMount() {

        let fetchedTags = this.state.tags.slice();
        this.props.note.tags.map(tag => {
            return fetchedTags.push(tag.desc);
        });

        this.setState({ note: this.props.note.description, tags: fetchedTags });
    };

    noteInputHandler = (event) => {
        this.setState({ note: event.target.value });
    };

    tagHandler = (event) => {
        this.setState({ currentTag: event.target.value });
    };

    addTagHandler = (event) => {
        event.preventDefault();
        let tags = this.state.tags.slice();
        tags.push(this.state.currentTag);
        this.setState({ tags: tags, currentTag: '' })
    };

    removeTagHadler = (tag) => {
        let tags = [];
        this.state.tags.filter(x => x !== tag).map(tag => {
            return tags.push(tag);
        });

        if (tags.length > 0) {
            this.setState({ tags: tags })
        } else {
            this.setState({ tags: [] })
        }
    };

    submitHandler = (event) => {
        event.preventDefault();
        const tags = this.state.tags.slice();
        const note = this.state.note.slice();
        const data = { note: note, tags: tags }
        NoteService
            .updateNote(this.props.note.id, data, this.props.state.user.id)
            .then(res => {
                this.props.dispatch({ type: SET_UPDATED_NOTES, notes: res });
                this.props.updated();
            })
            .catch(err => {
                console.log(err);
            })

        this.setState({ tags: [], note: '', currentTag: '' })
    };

    render() {
        const { currentTag, note, tags } = this.state;
        const showTags = tags.length !== 0 && tags.map((tag, index) => {
            return <li key={index} className="list-group-item">{tag}<FontAwesome className="fas fa-times" onClick={() => this.removeTagHadler(tag)} /></li>
        })
        return (
            <div style={{ width: '45%' }}>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="write something..."
                            value={note}
                            onChange={this.noteInputHandler}
                        /><br></br>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="tag"
                            onChange={this.tagHandler}
                            value={currentTag}
                        /><br></br>
                        <button
                            className="btn btn-outline-secondary "
                            onClick={this.addTagHandler}
                        >
                            ADD TAG
                        </button>
                    </div><br></br>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>ADD NOTE</button>
                </form>
                <div>
                    <br></br>
                    <p>tags:</p>
                    <ul className="list-group">
                        {showTags}
                    </ul>
                </div>
            </div>
        );
    }
};
export default withState(UpdateNote);