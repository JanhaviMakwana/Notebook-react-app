import React from "react";
import NoteService from '../../services/NoteService';
import FontAwesome from 'react-fontawesome';

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
        this.setState({ note: this.props.note.note, tags: this.props.note.tags });
    }

    noteInputHandler = (event) => {
        this.setState({ note: event.target.value });
    };

    tagHandler = (event) => {
        this.setState({ currentTag: event.target.value });
    };

    addTagHandler = (event) => {
        event.preventDefault();
        let tags = this.state.tags.slice()
        tags.push(this.state.currentTag);
        this.setState({ tags: tags, currentTag: '' })
    };

    removeTagHadler = (tag) => {
        let tags = [];
        const filteredTags = this.state.tags.filter(x => x !== tag)
        if (filteredTags.length !== 0) {
            tags.push(filteredTags);
            this.setState({ tags: tags })
        } else {
            this.setState({ tags: [] })
        }
    };

    submitHandler = (event) => {
        event.preventDefault();
        const tags = this.state.tags.slice()
        const note = this.state.note.slice();
        const data = { note: note, tags: tags, createdAt: new Date(), updatedAt: new Date() }
        NoteService.updateNote(data, this.props.note.id)
            .then(res => { console.log(res); })
            .catch(err => { console.log(err); })
        this.props.updated();
        this.setState({ tags: [], note: '', currentTag: '' })
    };

    render() {
        const { currentTag, note, tags } = this.state;
        const showTags = tags.length !== 0 && tags.map((tag) => {
            return <li className="list-group-item">{tag}<FontAwesome className="fas fa-times" onClick={() => this.removeTagHadler(tag)} /></li>
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
export default UpdateNote;