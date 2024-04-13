import Card from 'react-bootstrap/Card';

interface UserOrderCardProps {
    order: Orders;
}

export const UserOrderCard = ({order}: UserOrderCardProps) => {
    return (
        <Card style={{width: '18rem'}} key={order.orderId}>
            <Card.Body>
                <Card.Title>User ID: {order.userId}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {order.orderDate.toString()}<br/>
                    <strong>Total Amount:</strong> {order.totalAmount}<br/>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
