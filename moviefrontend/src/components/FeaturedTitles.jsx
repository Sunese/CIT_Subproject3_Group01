import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Title = ({ title, plot, poster }) =>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={poster} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{plot}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>

export default Title;