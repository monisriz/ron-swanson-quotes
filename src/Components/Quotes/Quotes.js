import { Row, Col } from 'react-bootstrap';
import Quote from '../Quote/Quote';

function Quotes(props) {
    return (
        <Row>
            <Col>
                {props.quotes.map((quote, id) => (
                    <Quote
                        quote={quote}
                        key={id}
                        id={id+1}
                        totalVotes={props.totalVotes}
                        setTotalVotes={props.setTotalVotes}
                        darkModeToggle={props.darkModeToggle}
                        darkMode={props.darkMode}
                    />
                ))}
            </Col>
        </Row>
        );
    }
    
    export default Quotes;