import React from 'react';
import ListNotes from '../ListNotes/ListNotes';
import NoteService from '../../services/NoteService';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            notes: []
        }
    }

    componentDidMount() {
        this.setDataHandler();
    }

   setDataHandler = () => {
    const keyword = this.state.keyword;
        NoteService.searchNote(keyword)
            .then(res => {
                this.setState({ notes: res })
            })
            .catch(err => {
                console.log(err);
            })
    }

    searchKeywordHandler = (event) => {
        this.setState({ keyword: event.target.value });
    }

    searchHandler = (event) => {
        event.preventDefault();
        const keyword = this.state.keyword;
        NoteService.searchNote(keyword)
            .then(res => {
                this.setState({ notes: res })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        console.log(this.state);
        const { keyword, notes } = this.state;
        return (
            <div>
                <div style={{ margin: '0 auto', width: '400px' }}>
                    <form onSubmit={this.searchHandler}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                value={keyword}
                                onChange={this.searchKeywordHandler}
                                placeholder="search by tag"
                            />
                        </div>
                    </form>
                </div>
                <ListNotes setData={this.setDataHandler} notes={notes} click={(id) => this.props.click(id)} />
            </div>
        );
    }
}

export default Search;