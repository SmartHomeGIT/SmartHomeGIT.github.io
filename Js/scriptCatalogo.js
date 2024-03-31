 document.addEventListener("DOMContentLoaded", function () {
            const dropdownBtn = document.querySelector(".dropdown-btn");
            const dropdownContent = document.querySelector(".dropdown-content");
            const productContainer = document.querySelector(".product-container");

            dropdownBtn.addEventListener("click", function () {
                dropdownContent.classList.toggle("show");
            });

            dropdownContent.addEventListener("click", function (event) {
                if (event.target.tagName === "A") {
                    const sortType = event.target.getAttribute("data-sort");
                    sortProducts(sortType);
                    dropdownContent.classList.remove("show");
                }
            });

            function sortProducts(sortType) {
                const products = Array.from(productContainer.querySelectorAll(".product-data"));
                switch (sortType) {
                    case "price-low-to-high":
                        products.sort((a, b) => {
                            const priceA = parseFloat(a.querySelector("[data-price]").getAttribute("data-price").replace(",", ""));
                            const priceB = parseFloat(b.querySelector("[data-price]").getAttribute("data-price").replace(",", ""));
                            return priceA - priceB;
                        });
                        break;
                    case "price-high-to-low":
                        products.sort((a, b) => {
                            const priceA = parseFloat(a.querySelector("[data-price]").getAttribute("data-price").replace(",", ""));
                            const priceB = parseFloat(b.querySelector("[data-price]").getAttribute("data-price").replace(",", ""));
                            return priceB - priceA;
                        });
                        break;
                    case "name-a-to-z":
                        products.sort((a, b) => {
                            const nameA = a.querySelector("h3").textContent.trim().toLowerCase();
                            const nameB = b.querySelector("h3").textContent.trim().toLowerCase();
                            return nameA.localeCompare(nameB);
                        });
                        break;
                    case "name-z-to-a":
                        products.sort((a, b) => {
                            const nameA = a.querySelector("h3").textContent.trim().toLowerCase();
                            const nameB = b.querySelector("h3").textContent.trim().toLowerCase();
                            return nameB.localeCompare(nameA);
                        });
                        break;
                    default:
                        break;
                }

                // Recorrer y agregar productos ordenados al contenedor
                products.forEach((product) => {
                    productContainer.appendChild(product);
                });
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            const precioInput = document.getElementById('precio');
            const precioValor = document.getElementById('precio-valor');
            const productBoxes = document.querySelectorAll('.product-box');

            precioValor.textContent = precioInput.value;

            precioInput.addEventListener('input', function() {
                precioValor.textContent = precioInput.value;
                const precioMaximo = parseFloat(precioInput.value); // Obtener el valor del input

                // Recorrer cada producto y mostrar/ocultar según el precio
                productBoxes.forEach(function(productBox) {
                    const precioProducto = parseFloat(productBox.querySelector('p').getAttribute('data-price').replace(',', ''));

                    if (precioProducto > precioMaximo) {
                        productBox.style.display = 'none'; // Ocultar producto si excede el precio máximo
                    } else {
                        productBox.style.display = 'block'; // Mostrar producto si está dentro del rango de precios
                    }
                });
            });
        });