import {useEffect, useState} from "react";
import {getAllBooks} from "../Services/forAdmin/books.tsx";
import Card from "react-bootstrap/Card";
import defaultImage from "/src/Images/DefaultImg.jpg";
import Button from "react-bootstrap/Button";
import {addToCart} from "../Services/order.tsx";
import {extractUserIdFromToken} from "../Services/extractUserIdFromToken.ts";
import Modal from "react-bootstrap/Modal";

export const BooksPage = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState<{ [bookId: string]: number }>({});


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await getAllBooks();
                setBooks(books);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка получения списка книг:', error);
            }
        };

        fetchBooks();
    }, []);


    const [selectedBook, setSelectedBook] = useState<{ bookId: string, quantity: number } | null>(null);

    const handleAddToCart = async (bookId: string, quantity: number) => {
        try {
            const token = localStorage.getItem('token');
            const userId = token ? extractUserIdFromToken(token) : null;
            if (!userId) {
                throw new Error('Идентификатор пользователя не найден в токене');
            }
            await addToCart(userId, bookId, quantity); // Предполагая, что quantity всегда 1
            console.log(`Товар с ID ${bookId} добавлен в корзину`);
        } catch (error) {
            console.error('Ошибка добавления товара в корзину:', error);
        }
    };

    const handleIncrement = (bookId: string) => {
        const maxQuantity = books.find(book => book.bookId === bookId)?.quantity ?? 1;
        setCartItems(prevState => ({
            ...prevState,
            [bookId]: Math.min((prevState[bookId] ?? 0) + 1, maxQuantity)
        }));
    };

    const handleDecrement = (bookId: string) => {
        setCartItems(prevState => ({
            ...prevState,
            [bookId]: Math.max((prevState[bookId] ?? 1) - 1, 1)
        }));
    };
    // const handleAddToCartClick = (bookId: string) => {
    //     const quantity = cartItems[bookId] ?? 0;
    //     handleAddToCart(bookId, quantity);
    // };


    const handleAddToCartClick = (bookId: string, quantity: number) => {
        setSelectedBook({ bookId, quantity });
    };

    const handleConfirmAddToCart = async () => {
        try {
            if (selectedBook) {
                const { bookId, quantity } = selectedBook;
                await handleAddToCart(bookId, quantity);
                // Закрыть модальное окно после добавления книги в корзину
                setSelectedBook(null);
            }
        } catch (error) {
            console.error('Ошибка добавления товара в корзину:', error);
        }
    };

    const handleCancelAddToCart = () => {
        // Закрыть модальное окно без добавления книги в корзину
        setSelectedBook(null);
    };


    return (
        <div className={"text-light"}>
            <h1>Магазин книг</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center"}}>
                    {books.map(book => (

                        <div key={book.bookId}>
                            <Card style={{width: '18rem'}} key={book.bookId}>
                                <div style={{width: '100%', height: '250px', overflow: 'hidden'}}>
                                    <Card.Img variant="top" src={book.image || defaultImage}
                                              style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                </div>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text
                                        style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                                        <strong>Author:</strong> {book.author}<br/>
                                        <strong>Description:</strong> {book.description}<br/>
                                        <strong>Price:</strong> ${book.price}<br/>
                                    </Card.Text>
                                    <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                                        <div>
                                            <Button variant="primary" onClick={() => handleAddToCartClick(book.bookId, cartItems[book.bookId] ?? 1)}>
                                                Add to Cart
                                            </Button>
                                            <div style={{display: "flex", justifyContent: "center", marginTop:"10px", gap: "10px"}}>
                                                <Button variant="danger" onClick={() => handleDecrement(book.bookId)}>
                                                    -
                                                </Button>
                                                <div>{cartItems[book.bookId] ?? 1}</div>
                                                <Button variant="success" onClick={() => handleIncrement(book.bookId)}>
                                                    +
                                                </Button>
                                            </div>
                                            <Modal show={selectedBook !== null} onHide={handleCancelAddToCart}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Подтвердить добавление в корзину</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Вы уверены, что хотите добавить выбранную книгу в корзину?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCancelAddToCart}>
                                                        Отмена
                                                    </Button>
                                                    <Button variant="primary" onClick={handleConfirmAddToCart}>
                                                        Подтвердить
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

