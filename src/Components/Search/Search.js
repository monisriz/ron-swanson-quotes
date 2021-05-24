import { useState } from 'react';
import { Row, Col, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';

function Search(props) {

  const [input, setInput] = useState("");


  let quoteQtyChangeHandler = (qty) => {
    props.setSearchTerm(null);
    props.setQuoteQty(qty);
  }

  function submitHandler(e){
    e.preventDefault();
    props.setSearchTerm(input);
  }



return (
      <Row className="border border-secondary rounded py-3">
        <Col className="align-self-center pb-2" lg={6} md={12} xs={12}>
          <form onSubmit={e => submitHandler(e)}>
            <Row className="w-100 mx-0">
              <Col lg={10} md={10} xs={9} className="px-0">
                <input className="form-control search-input w-100" type="search" placeholder="Search" aria-label="Search" onChange={e => setInput(e.target.value)} />
              </Col>
              <Col lg={2} md={2} xs={3} className="px-0">
                <Button variant="primary" type="submit" disabled={input?false:true}>Search</Button>
              </Col>
            </Row>
          </form>
        </Col>
        <Col className="align-self-center pb-2" lg={6} md={12} xs={12}>
          <ToggleButtonGroup type="radio" name="options" className="w-100">
            <ToggleButton value={10} variant="secondary" className="mx-0 w-100 qty-btn" onClick={(e)=>quoteQtyChangeHandler(10)}>Random 10</ToggleButton>
            <ToggleButton value={20} variant="secondary" className="mx-0 w-100 qty-btn" onClick={(e)=>quoteQtyChangeHandler(20)}>Random 20</ToggleButton>
            <ToggleButton value={1} variant="secondary" className="mx-0 w-100 qty-btn" onClick={(e)=>quoteQtyChangeHandler(1)}>Surprise</ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
    );
}

export default Search;



