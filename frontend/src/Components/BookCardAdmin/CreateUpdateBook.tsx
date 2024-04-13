import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import {BookRequest} from "../../Services/forAdmin/books.tsx";
import Button from "react-bootstrap/Button";


interface Props {
    mode: Mode;
    values: Book;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateBook = ({mode, values, isModalOpen, handleCancel, handleCreate, handleUpdate}: Props) => {

    const [title, setTitle] = useState<string>("Default");
    const [author, setAuthor] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(1);
    const [quantity, setQuantity] = useState<number>(1);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        setTitle(values.title)
        setAuthor(values.author)
        setDescription(values.description)
        setPrice(values.price)
        setQuantity(values.quantity)
        setImage(values.image)
    }, [values])

    const handleOnOk = async () => {
        const bookRequest = {title, author, description, price, quantity, image};
        mode == Mode.Create
            ? handleCreate(bookRequest)
            : handleUpdate(values.bookId, bookRequest)
    }

    return (
        <Modal show={isModalOpen} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === Mode.Create ? "Add book" : "Edit book"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>
                    </Form.Group>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))}/>
                    </Form.Group>

                    {/*<Form.Group controlId="image">*/}
                    {/*    <Form.Label>Image</Form.Label>*/}
                    {/*    <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)}/>*/}
                    {/*</Form.Group>*/}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleOnOk}>
                    {mode === Mode.Create ? "Add" : "Save"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};