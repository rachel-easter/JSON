  var editingIndex = -1; // Indicates if we are currently editing a product

        // Function to add or update a product
        function addOrUpdateProduct() {
            var productName = document.getElementById("productName").value;
            var productPrice = document.getElementById("productPrice").value;

            // Validate inputs
            if (!productName || !productPrice) {
                alert("Please enter both product name and price.");
                return;
            }

            // Create a new product object
            var product = {
                name: productName,
                price: parseFloat(productPrice)
            };

            // Get existing products from local storage or initialize an empty array
            var products = JSON.parse(localStorage.getItem("products")) || [];

            if (editingIndex === -1) {
                // Adding a new product
                products.push(product);
            } else {
                // Updating an existing product
                products[editingIndex] = product;
                editingIndex = -1; // Reset editingIndex after updating
            }

            // Save the updated array back to local storage
            localStorage.setItem("products", JSON.stringify(products));

            // Clear the form
            document.getElementById("productName").value = "";
            document.getElementById("productPrice").value = "";

            // Change button text back to "Add Product"
            document.getElementById("addUpdateButton").innerHTML = "Add Product";

            // Show "Cancel" button and hide it when adding a new product
            document.getElementById("cancelUpdateButton").style.display = "none";

            // Refresh the product list
            displayProducts();
        }

        // Function to populate the form for editing
        function editProduct(index) {
            var products = JSON.parse(localStorage.getItem("products")) || [];
            var productToEdit = products[index];

            // Populate the form with the details of the selected product
            document.getElementById("productName").value = productToEdit.name;
            document.getElementById("productPrice").value = productToEdit.price;

            // Change button text to "Update"
            document.getElementById("addUpdateButton").innerHTML = "Update";

            // Show "Cancel" button
            document.getElementById("cancelUpdateButton").style.display = "inline-block";

            // Set the editing index
            editingIndex = index;
        }

        // Function to cancel the update and clear the form
        function cancelUpdate() {
            // Clear the form
            document.getElementById("productName").value = "";
            document.getElementById("productPrice").value = "";

            // Change button text back to "Add Product"
            document.getElementById("addUpdateButton").innerHTML = "Add Product";

            // Hide "Cancel" button
            document.getElementById("cancelUpdateButton").style.display = "none";

            // Reset the editing index
            editingIndex = -1;
        }

        // Function to display products in the table
        function displayProducts() {
            var productList = document.getElementById("productList");
            productList.innerHTML = "";

            // Get the list of products from local storage
            var products = JSON.parse(localStorage.getItem("products")) || [];

            // Populate the table with product data
            products.forEach(function(product, index) {
                var row = productList.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = product.name;
                cell2.innerHTML = product.price.toFixed(2);

                // Add "Edit" and "Delete" buttons for each product
                var editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                editButton.onclick = function() {
                    editProduct(index);
                };
                cell3.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function() {
                    deleteProduct(index);
                };
                cell3.appendChild(deleteButton);
            });
        }

        // Function to delete a product
        function deleteProduct(index) {
            // Get the list of products from local storage
            var products = JSON.parse(localStorage.getItem("products")) || [];

            // Remove the product at the specified index
            products.splice(index, 1);

            // Save the updated array back to local storage
            localStorage.setItem("products", JSON.stringify(products));

            // Refresh the product list
            displayProducts();
        }

        // Display products when the page loads
        displayProducts();
