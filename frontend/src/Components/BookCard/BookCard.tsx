import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import defaultImage from '/src/Images/DefaultImg.jpg';
import {useState} from "react";
import {DeleteConfirmationModal} from "../DeleteConfirmation.tsx";
interface AdminBookCardProps {
    book: Book;
    handleDelete: (id: string) => void; // Функция для удаления книги
    handleOpen: (book: Book) => void; // Функция для открытия модального окна редактирования книги
}

export const AdminBookCard = ({book, handleDelete, handleOpen} : AdminBookCardProps) => {
    const imageUrl = book.image ? book.image : defaultImage;

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleDeleteConfirmation = () => {
        setShowConfirmationModal(true);
    };

    const handleDeleteConfirmed = () => {
        handleDelete(book.bookId);
        setShowConfirmationModal(false);
    };
    return (
        <Card style={{width: '18rem'}} key={book.bookId}>
            <div style={{width: '100%', height: '250px', overflow: 'hidden'}}>
                <Card.Img variant="top" src={imageUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <strong>Author:</strong> {book.author}<br/>
                    <strong>Description:</strong> {book.description}<br/>
                    <strong>Price:</strong> ${book.price}<br/>
                    <strong>Quantity:</strong> {book.quantity}<br/>
                </Card.Text>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <Button variant="primary" onClick={() => handleOpen(book)}>Edit</Button>
                    <Button variant="danger" onClick={handleDeleteConfirmation}>
                        Delete
                    </Button>
                    <DeleteConfirmationModal
                        show={showConfirmationModal}
                        onHide={() => setShowConfirmationModal(false)}
                        onConfirm={handleDeleteConfirmed}
                        />
                </div>
            </Card.Body>
        </Card>
    );
}
