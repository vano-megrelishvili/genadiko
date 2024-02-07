
const CATEGORIES_URL = "https://dummyjson.com/products/categories";
const PRODUCTS_URL = "https://dummyjson.com/products?limit=100";
const PRODUCT_URL = "https://dummyjson.com/products/";
const title = document.querySelector(".every_categories");

fetch(CATEGORIES_URL)
    .then((res) => res.json())
    .then((res) => {
        res.forEach((product) => {
            const list = document.createElement("li");

            list.classList.add('lists');
            list.innerHTML = product;

            const unorderd_list = document.querySelector(".categories_list");
            unorderd_list.append(list);

            list.addEventListener('click', () => {
                title.innerHTML = list.innerHTML;

                const main_div = document.querySelector(".grid_container")
                const items = Array.from(main_div.children);

                for (let i of items) {
                    i.style.display = 'block';
                }

                for (let i of items) {
                    const category = i.childNodes[1].childNodes[2].innerHTML;

                    if (category != title.innerHTML) {
                        i.style.display = 'none';
                    }
                }
            })
        });
    });

fetch(PRODUCTS_URL)
    .then((res) => res.json())
    .then((res) => {
        function get_items(element) {
            const items_div = document.createElement("div");
            items_div.classList.add("grid_items");

            const container = document.querySelector(".grid_container");
            container.append(items_div);

            const for_images = document.createElement("div");
            for_images.classList.add("for_images");
            items_div.append(for_images);

            const for_discount = document.createElement("div");
            for_discount.classList.add("for_discount");
            for_images.append(for_discount);

            const discount = document.createElement("h3");
            discount.classList.add("discount");
            for_discount.append(discount);
            discount.innerHTML = `-${element.discountPercentage}%`;

            const img = document.createElement("img");
            img.classList.add("images");
            for_images.append(img);

            const image = element.images[0];
            img.src = image;

            const for_titles = document.createElement("div");
            for_titles.classList.add("for_titles");
            items_div.append(for_titles);

            const for_stars = document.createElement("div");
            for_stars.classList.add("for_stars");
            for_titles.append(for_stars);

            for (let i = 0; i < Math.ceil(element.rating); i++) {
                const star = document.createElement("img");
                star.classList.add("star_img");
                for_stars.append(star);
                star.src = "./images/star-solid.svg";
            }

            const text = document.createElement("h2");
            text.classList.add("product_title");
            for_titles.append(text);
            text.innerHTML = element.title;

            const cat = document.createElement("h3");
            cat.classList.add("categ");
            for_titles.append(cat);
            cat.innerHTML = element.category;

            const prices_div = document.createElement("div");
            prices_div.classList.add("for_prices");
            for_titles.append(prices_div);

            const first_price = document.createElement("h3")
            first_price.classList.add("firstprice");
            first_price.innerHTML = `$${element.price}.00`;

            const second_price = document.createElement("h3");
            second_price.classList.add("secondprice");

            prices_div.append(first_price);
            prices_div.append(second_price);

            const first_variable = element.discountPercentage / 100;
            const second_variable = 1 - first_variable;
            const third_variable = element.price / second_variable;

            second_price.innerHTML = `$${Math.round(third_variable * 100) / 100}`;

            const cart_button = document.createElement("button");
            cart_button.classList.add("cart_button");
            for_images.append(cart_button);
            cart_button.innerHTML = "Add to cart";

            const rating = document.createElement("h3");
            rating.classList.add("rating");
            rating.innerHTML = element.rating;
            prices_div.append(rating);

            const field = document.querySelector(".grid_container");
            const li = Array.from(field.children);
            const select = document.getElementById("sort");
            const ar = [];

            for (let i of li) {
                ar.push(i);
            }

            select.onchange = sortingValue;

            function sortingValue() {
                if (this.value === 'Default') {
                    while (field.firstChild) {
                        field.removeChild(field.firstChild);
                    }
                    field.append(...ar);
                }
                if (this.value === 'Price') {
                    sortElem(field, li);
                }

                if (this.value === 'Rating') {
                    sortelem1(field, li);
                }
            }

            function sortelem1(field, li) {
                let sort;

                sort = li.sort((a, b) => {
                    let ax = a.querySelector(".rating").innerHTML;
                    let new_ax = parseFloat(ax);
                    let bx = b.querySelector(".rating").innerHTML;
                    let new_bx = parseFloat(bx);

                    return new_ax - new_bx;
                });

                while (field.firstChild) {
                    field.removeChild(field.firstChild);
                }

                field.append(...sort);
            }

            function sortElem(field, li) {
                let sortli;

                sortli = li.sort((a, b) => {
                    let ax = a.querySelector(".firstprice").innerHTML.slice(1);
                    let new_a = parseFloat(ax);
                    let bx = b.querySelector(".firstprice").innerHTML.slice(1);
                    let new_bx = parseFloat(bx);

                    return new_a - new_bx;
                });

                while (field.firstChild) {
                    field.removeChild(field.firstChild);
                }

                field.append(...sortli);
            }

            for_images.addEventListener("click", () => {
                const popup = document.querySelector(".popup");
                popup.style.display = "block";

                current_post(element.id);
            })

            const toolbar2 = document.querySelector(".img2");
            const toolbar1 = document.querySelector(".img1");

            let x = 1;
            const paragraph = document.createElement("p");
            const new_button = document.createElement("button");
            let y = 0;

            toolbar2.addEventListener("click", () => {
                y = 1;

                if (x === 1) {
                    container.style.gridTemplateColumns = "auto";
                    items_div.style.display = 'flex';
                    items_div.style.flexDirection = 'row';
                    for_titles.style.marginLeft = "300px";
                    for_titles.style.marginTop = "20px";
                    second_price.style.display = "none";
                    text.style.width = "150px";

                    paragraph.classList.add("paragr");
                    for_titles.append(paragraph);
                    paragraph.innerHTML = element.description;
                    paragraph.style.marginTop = "15px";
                    paragraph.style.marginBottom = "15px";

                    cart_button.style.display = 'none';

                    new_button.classList.add("new_butt");
                    for_titles.append(new_button);
                    new_button.innerHTML = "Add to Cart";

                    x = x + 1;
                } else if (x === 2) {
                    container.style.gridTemplateColumns = "auto";
                    items_div.style.display = 'flex';
                    for_titles.style.marginLeft = "300px";
                    for_titles.style.marginTop = "20px";
                    new_button.style.display = 'block';
                    second_price.style.display = "none";
                    paragraph.style.display = 'block';
                }
            })

            toolbar1.addEventListener("click", () => {
                if (y === 1) {
                    items_div.addEventListener("mouseenter", () => {
                        cart_button.style.display = 'block';
                    })

                    items_div.addEventListener("mouseleave", () => {
                        cart_button.style.display = 'none';
                    })

                    container.style.gridTemplateColumns = "auto auto auto";

                    text.style.width = "250px";
                    for_titles.style.marginLeft = "0px"
                    for_titles.style.marginTop = "10px"
                    items_div.style.display = 'block'
                    paragraph.style.display = 'none'
                    new_button.style.display = 'none'
                    second_price.style.display = 'block'
                    x = 2
                }
            })

        }

        function current_post(id) {
            fetch(`${PRODUCT_URL}${id}`)
                .then(res => res.json())
                .then((res => {
                    let mainimage = document.querySelector(".main_image")
                    mainimage.src = res.images[0]

                    let image1 = document.querySelector(".image1")
                    let image2 = document.querySelector(".image2")
                    let image3 = document.querySelector(".image3")

                    image1.src = res.images[1]
                    image2.src = res.images[2]
                    image3.src = res.images[3]


                    let div_stars = document.querySelector(".for_stars1")

                    if (div_stars.childNodes.length === 1) {
                        for (let i = 0; i < Math.ceil(res.rating); i++) {
                            let star_image = document.createElement("img")
                            star_image.classList.add("star_img")
                            star_image.src = "./images/star-solid.svg"
                            div_stars.append(star_image)
                        }
                    }

                    let maintitle = document.querySelector(".main_title")
                    maintitle.innerHTML = res.title

                    let descrip = document.getElementById("decript")
                    descrip.innerHTML = res.description

                    let price1 = document.getElementById("discountedprice")
                    price1.innerHTML = `$${res.price}.00`

                    let price2 = document.getElementById("price1")
                    let first_variable = res.discountPercentage / 100
                    let second_variable = 1 - first_variable
                    let third_variable = res.price / second_variable
                    price2.innerHTML = `$${Math.round(third_variable * 100) / 100}`

                    let category = document.querySelector(".category1")
                    category.innerHTML = res.category

                    let popup = document.querySelector(".popup")

                    document.addEventListener('click', function (event) {
                        popup = document.querySelector('.popup');

                        if (!popup.contains(event.target)) {

                            popup.style.display = 'none';
                        }
                    });

                    popup.style.display = 'block';


                }))


        }


        let first_number = 0
        let second_number = 9
        let array = res.products.slice(first_number, second_number)
        let show_button = document.querySelector(".show_more")


        show_button.addEventListener("click", () => {
            let select = document.getElementById("sort")
            select.value = "Default"

            first_number = second_number
            second_number = second_number + 9
            array = res.products.slice(first_number, second_number)

            array.forEach(element => {
                get_items(element)
            });
        });

        array.forEach(element => {
            get_items(element)
        });
    })



