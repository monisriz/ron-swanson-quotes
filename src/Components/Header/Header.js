import { Row, Col, Button } from 'react-bootstrap';

function Header(props) {

return (
      <Row className="border border-secondary rounded py-3">
        <Col className="align-self-center text-center page-heading" lg={6} md={12} xs={12}>
          <h2 className="my-0 page-title">Ron Swanson Quote Voter</h2>
        </Col>
        <Col className="align-self-center pr-0" lg={4} md={6} xs={8}>
          <span><em>"Vote for your favorite quote!"</em></span>
        </Col>
        <Col className="align-self-center pl-0" lg={2} md={6} xs={4}>
            <span className="float-right">Total Votes: <strong>{props.totalVotes}</strong></span><br/>
            <Button className={"btn float-right " + (!props.darkMode ? "btn-dark" : "btn-light")} size="sm" onClick={e => props.darkModeToggle(e)}>{!props.darkMode ? "Dark Mode" : "Light Mode"}</Button>
        </Col>
      </Row>
    );
}

export default Header;