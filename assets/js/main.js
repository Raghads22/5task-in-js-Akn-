
//بجيب الداتا 
const getCategories = async () => {
    
    const {data} = await axios.get('https://dummyjson.com/products/category-list');

    return data;
}

//بعرض الداتا
const displayCategories = async () => {

    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
    const categories = await getCategories();

    const result = categories.map( (category) => {
        return `<div class="category">
            <h2>${category}</h2>
            <a href='categoryDetails.html?category=${category}'>Details</a>
        </div>`;
    } ).join(' ');

    document.querySelector(".categories .row").innerHTML = result;
}catch(error){
    document.querySelector(".categories .row").innerHTML = "<p>error loading categories</p>";
}finally{
    loader.classList.remove("active");
}
}
   

const getProducts = async(page)=>{
    const skip = ( page - 1 ) * 10 ;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}` );
    console.log(data);
    return data;
}

const displayProducts = async ( page = 1 ) =>{

    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
    const data = await getProducts(page);
    const numberOfPages = Math.ceil(data.total / 10);

    const result = data.products.map( (product) => {
        return `<div class="product">
            <img src="${product.thumbnail}" alt="${product.description}" />
            <h3>${product.title}</h3>
        </div>`;
    } ).join(' ');

    document.querySelector(".products .row").innerHTML = result;
    let paginationLinks = ``;

    if(page == 1){
        paginationLinks+=`<li class="page-item"><a class="page-link" href="#" disabled>&laquo;</a></li>`;
    }else{
        paginationLinks+=`<li class="page-item"><button onclick=displayProducts('${page-1}') class="page-link">&laquo;</button></li>`;
    }


    for(let i=1; i<=numberOfPages;i++){
        paginationLinks += `<li class="page-item ${i == page ? 'active' : ''}"><button onclick="displayProducts('${i}')" class="page-link">${i}</button></li>`;
    }

    if(page == numberOfPages){
        paginationLinks+=`<li class="page-item"><button disabled class="page-link">&raquo;</button></li>`;
    }else{
        paginationLinks+=`<li class="page-item"><button onclick=displayProducts('${parseInt(page)+1}') class="page-link">&raquo;</button></li>`;
    }

    console.log(paginationLinks);

    document.querySelector(".pagination").innerHTML = paginationLinks;


}catch(error){
    document.querySelector(".products .row").innerHTML = "<p>error loading products</p>";
}finally{
    loader.classList.remove("active");
}
}


displayCategories();
displayProducts();