import { useState } from 'react';
import { Row, Col, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

function Quote(props) {
    let existingData = localStorage.getItem('quotesData');
    let localQuote = existingData ? JSON.parse(existingData).find(item => item.quote === props.quote) : null;
    const [quoteVotes, setQuoteVotes] = useState(localQuote?.votes || 0);

    let quoteVotesChangeHandler = (event, quoteObj) => {
        event.target.classList.contains("thumbs-up") || event.target.parentElement.classList.contains("thumbs-up") ? updateLocalStorage("increment", quoteObj) : updateLocalStorage("decrement", quoteObj) ;
        event.target.classList.contains("thumbs-up") || event.target.parentElement.classList.contains("thumbs-up") ? props.setTotalVotes(props.totalVotes + 1) : props.setTotalVotes(props.totalVotes - 1);
    }

    const updateLocalStorage = (action, quoteObj) => {
        setQuoteVotes(action === "increment" ? quoteVotes+1:quoteVotes-1);

        const quoteDataObj = (quoteObj) => {
            let newObj = {
                quote: quoteObj.quote,
                id: quoteObj.id,
                votes: 0
            };
            return newObj;
        }
        if (!existingData) {
            existingData = [];
            let newData = quoteDataObj(quoteObj);
            newData.votes = action === "increment" ? newData.votes + 1: newData.votes -1;
            existingData.push(newData);
            localStorage.setItem('quotesData', JSON.stringify(existingData));
            localStorage.setItem('totalVotes', action === "increment" ? props.totalVotes + 1 : props.totalVotes - 1);
        } else {
            if (localQuote) {
                let localQuoteIdx = JSON.parse(existingData).findIndex(item => item.quote === quoteObj.quote);
                let newData = JSON.parse(existingData);
                newData[localQuoteIdx].votes = action === "increment" ? quoteVotes+1:quoteVotes-1;
                localStorage.setItem('quotesData', JSON.stringify(newData));
                localStorage.setItem('totalVotes', action === "increment" ? props.totalVotes + 1 : props.totalVotes - 1);
            } else {
                let newData = quoteDataObj(quoteObj);
                console.log("before",newData);
                newData.votes = action === "increment" ? newData.votes + 1: newData.votes -1;
                console.log(JSON.parse(existingData));
                console.log("after",newData);
                let existingDataArr = JSON.parse(existingData);
                existingDataArr.push(newData);
                console.log("existingDataArr", existingDataArr);
                localStorage.setItem('quotesData', JSON.stringify(existingDataArr));
                localStorage.setItem('totalVotes', action === "increment" ? props.totalVotes + 1 : props.totalVotes - 1);
            }
        }
    }

    return (
        <ListGroupItem className={'border border-secondary rounded px-2 py-2 ' + (props.darkMode ? 'dark' : '')}>
            <Row className="mx-0 my-0">
                <Col md={3} xs={12} lg={2} className="align-self-center px-2 py-2">
                    <Row className="mx-0 my-0">
                        <Col className='px-0 py-0 text-center thumbs-up' onClick={(e)=>quoteVotesChangeHandler(e, props)}>
                            <FontAwesomeIcon icon={faThumbsUp} className="border border-secondary rounded fa-3x px-2 py-2 thumbs-up" style={{'color': quoteVotes > 0 ? 'blue':null}}/>
                        </Col>
                        <Col className='px-0 py-0 text-center align-self-center '>
                            <span><strong>{quoteVotes}</strong></span>
                        </Col>
                        <Col className='px-0 py-0 text-center thumbs-down' onClick={(e)=>quoteVotesChangeHandler(e, props)}>
                            <FontAwesomeIcon icon={faThumbsDown} className="border border-secondary rounded fa-3x px-2 py-2 thumbs-down" style={{'color': quoteVotes < 0 ? '#990000':null}}/>
                        </Col>
                    </Row>
                </Col>
                <Col md={9} xs={12} lg={10} className="align-self-center">
                    <span className={props.darkMode ? "dark" : ''}>{props.quote}</span>
                </Col>
            </Row>
        </ListGroupItem>
        );
    }
    
    export default Quote;