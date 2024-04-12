import Button from "react-bootstrap/Button";
import {CreateUpdateBook, Mode} from "../Components/BookCard/CreateUpdateBook.tsx";
import {AdminBookCard} from "../Components/BookCard/BookCard.tsx";
import {useEffect, useState} from "react";
import {BookRequest, createBook, deleteBook, getAllBooks, updateBook} from "../Services/forAdmin/books.tsx";


export default function BooksPage() {
    const defaultValues = {
        title: "Default",
        author: "",
        description: "",
        price: 1,
        quantity: 1,
        image: ""
    } as Book;

    const [values, setValues] = useState<Book>(defaultValues);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getBooks = async () => {
            const books = await getAllBooks();
            setLoading(false);
            setBooks(books);
        };

        getBooks();
    }, []);

    const handleCreateBook = async (request: BookRequest) => {
        await createBook(request);
        closeModal();
        const books = await getAllBooks();
        setBooks(books);
    };

    const handleUpdateBook = async (id: string, request: BookRequest) => {
        await updateBook(id, request);
        closeModal();
        const books = await getAllBooks();
        setBooks(books);
    };

    const handleDeleteBook = async (id: string) => {
        await deleteBook(id);
        closeModal();
        const books = await getAllBooks();
        setBooks(books);
    };

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (book: Book) => {
        setMode(Mode.Edit);
        setValues(book);
        setIsModalOpen(true);
    };

    return (
        <div style={{margin: '10px'}}>
            <Button
                variant="primary"
                style={{marginBlock: "10px"}}
                size="lg"
                onClick={openModal}
            >
                Add book
            </Button>

            <CreateUpdateBook mode={mode}
                              values={values}
                              isModalOpen={isModalOpen}
                              handleCancel={closeModal}
                              handleCreate={handleCreateBook}
                              handleUpdate={handleUpdateBook}/>

            {loading ? (<h1>Loading . . .</h1>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center"}}>
                    {books.map((book: Book) => (
                        <div key={book.bookId} >
                            <AdminBookCard book={book} handleDelete={handleDeleteBook}
                                           handleOpen={openEditModal}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}
