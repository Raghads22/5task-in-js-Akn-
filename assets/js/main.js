
//بجيب الداتا 
const getCategories = async () => {
    
    const {data} = await axios.get('https://dummyjson.com/products/category-list');

    return data;
}

//بعرض الداتا
const displayCategories = async () => {

    const categories = await getCategories();

    const result = categories.map( (category) => {
        return `<div class="category">
            <h2>${category}</h2>
            <a href='categoryDetails.html?category=${category}'>Details</a>
        </div>`;
    } ).join(' ');

    document.querySelector(".categories .row").innerHTML = result;
}
   

const getProducts = async()=>{
    const {data} = await axios.get('https://dummyjson.com/products');
    return data;
}

const displayProducts = async () =>{
    const data = await getProducts();
    console.log(data);

    const result = data.products.map( (product) => {
        return `<div class="product">
            <img src="${product.thumbnail}" alt="${product.description}" />
            <h3>${product.title}</h3>
        </div>`;
    } ).join(' ');

    document.querySelector(".products .row").innerHTML = result;
}


displayCategories();
displayProducts();