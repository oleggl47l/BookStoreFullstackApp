import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


interface UserCardProps {
    user: User;
    handleOpen: (user: User) => void;
}

export const UserProfileCard = ({user, handleOpen}: UserCardProps) => {

    return (
        <Card style={{width: '18rem'}} key={user.userId}>
            <Card.Body>
                <Card.Title>User ID: {user.userId}</Card.Title>
                <Card.Text>
                    <strong>First Name:</strong> {user.firstName}<br/>
                    <strong>Last Name:</strong> {user.lastName}<br/>
                    <strong>Email:</strong> {user.email}<br/>
                </Card.Text>
                <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                    <Button variant="primary" onClick={() => handleOpen(user)}>Edit</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
