import React, { useEffect, useState } from 'react';
import { getBooks, createBook, deleteBook } from '../services/bookService';
import { toast } from 'react-toastify';
import { 
  Box, 
  TextField, 
  Button, 
  CircularProgress, 
  Grid, 
  Card, 
  CardContent, 
  Typography 
} from '@mui/material';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form alanları
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    publishedDate: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  // Kitapları API'den çek
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Kitapları yüklerken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Yeni Kitap Ekle
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await createBook(newBook);
      if (response.status === 201) {
        toast.success('Kitap başarıyla eklendi');
        // Listeyi güncelle
        fetchBooks();
        // Formu sıfırla
        setNewBook({
          title: '',
          author: '',
          description: '',
          publishedDate: ''
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Kitap eklenirken bir hata oluştu');
    }
  };

  // Kitap Sil
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      toast.info('Kitap silindi');
      fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error('Kitap silinirken bir hata oluştu');
    }
  };

  // Form inputlarını yönet
  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Kitapları arama terimine göre filtrele
  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>Kitap Listesi</Typography>

      <TextField 
        label="Kitap Ara (Başlık/Yazar)" 
        variant="outlined" 
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                    {book.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Yayın Tarihi: {new Date(book.publishedDate).toLocaleDateString()}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small" 
                    sx={{ mt: 2 }}
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Sil
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="h5" mb={2}>Yeni Kitap Ekle</Typography>
      <Box 
        component="form"
        onSubmit={handleAddBook}
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          maxWidth: '400px' 
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={newBook.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Author"
          variant="outlined"
          name="author"
          value={newBook.author}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={newBook.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Published Date"
          variant="outlined"
          name="publishedDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newBook.publishedDate}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Ekle
        </Button>
      </Box>
    </Box>
  );
}

export default BookList;
