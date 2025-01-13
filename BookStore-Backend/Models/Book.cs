namespace BookStore_API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }

        // PublishedDate'in UTC olarak kaydedilmesini zorunlu kılın
        private DateTime _publishedDate;
        public DateTime PublishedDate
        {
            get => _publishedDate;
            set => _publishedDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
    }
}
