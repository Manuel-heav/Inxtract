using Backend.Controllers;

namespace Backend.Services
{
    public class DocsService
    {
        internal async Task<bool> CreateDocAsync(CreateDocModel createDocModel)
        {
            // make an API call to Google Docs to get a list of documents
            // var documents = await GetDocumentsAsync();

            // check if the document already exists in the list
            // if (documents.Contains(docsModel))
            {
                return false;
            }

            // create the document using the Google Docs API
            // var createdDocument = await CreateDocumentAsync(docsModel);

            return true;
        }

        private async Task CreateDocumentAsync(string documentName)
        {
            throw new NotImplementedException();
        }

        private async Task GetDocumentsAsync()
        {
            throw new NotImplementedException();
        }
    }
}