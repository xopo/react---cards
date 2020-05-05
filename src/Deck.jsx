import React, { Component } from 'react';
import axios from "axios";
import Card from './Card';
import styled from 'styled-components';

const DeckArea = styled.div`
    margin-top: 80px;
`;

const Game = styled.div`
    background: #17181c;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    h1 {
        color: azure;
        font-size: 40px;
        letter-spacing: 4.5px
    }

    button {
        background: none;
        outline: none;
        font: inherit;
        margin: 0.5em;
        padding: 1em 2em;
        color: #009688;
        border: 2px solid;
        transition: 0.25s;
    }

    button:hover {
        color: white;
        border-color: #4caf50;
    }

    button:active {
        box-shadow: inset 0 0 0 2em #4caf50;
    }
`;


const API_URL = 'https://deckofcardsapi.com/api/deck'

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = {
            deck: null,
            cards: [],
            endGame: false,
            fetching: false
        }
        this.getCard = this.getCard.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    async componentDidMount() {
        const newDeckUrl = `${API_URL}/new/shuffle`;
        const { data } = await axios.get(newDeckUrl);
        this.setState({deck: data})
    }

    getTransform = () => {
        const angle = Math.random() * 90 - 45;
        const xPos = Math.random() * 40 - 20;
        const yPos = Math.random() * 40 - 20;
        return `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    }

    async addCard() {
        console.log('get card');
        const { deck: { deck_id: id } } = this.state;
        const getCardUrl = `${API_URL}/${id}/draw`;
        const { data: { cards: [ card ], remaining } } = await axios.get(getCardUrl);
        card.transform = this.getTransform()
        this.setState(({ cards }) => {
            return {
                cards: [...cards, card],
                endGame: !Boolean(remaining),
                fetching: false
            }
        });
    }

    getCard() {
        console.log('set fetching to true and get card');
        this.setState({fetching: true}, this.addCard);
    }

    render() {
        const { cards, endGame, fetching } = this.state;
        const mapCards = cards.map( card => <Card key={card.code} {...card} />)
        return (
            <Game>
                <h1>Card Dealer</h1>
                <button disabled={endGame || fetching} onClick={this.getCard}>Get Card</button>
                <DeckArea>
                    {mapCards}
                </DeckArea>
            </Game>
        );
    }
}

export default Deck;
