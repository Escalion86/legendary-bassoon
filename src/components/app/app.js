import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        });
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>               
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <Button
                                    color="info"
                                    onClick={this.toggleRandomChar} >
                                    toggleRandomChar
                                </Button>
                            </Col>
                        </Row>

                        <Route path="/characters" component={CharacterPage} />                    
                        <Route path="/houses" component={HousesPage} />
                        <Route path="/books" exact component={BooksPage} />
                        <Route path="/books/:id" render={
                            ({match}) => {
                                const {id} = match.params;
                            return <BooksItem bookId={id} />}
                        } />
                    </Container>
                </div>
            </Router>
        );
    }
};