// module is an object that we have access to in every module file of the Node.js and it has a property exports in which we can assign the functio that we want to export. In this case we had exported the annonymous function.

module.exports = (temp, product) => {

    // Here, we are replacing all the placeholders with their real dynamic value for each of the element object
    let output =  temp.replace(/{%PRODUCTNAME%}/, product.productName);

    output = output.replace(/{%IMAGE%}/, product.image);

    output = output.replace(/{%PRICE%}/, product.price);

    output = output.replace(/{%QUANTITY%}/, product.quantity);

    output = output.replace(/{%FROM%}/, product.from);

    output = output.replace(/{%NUTRIENTS%}/, product.nutrients);

    output = output.replace(/{%DESCRIPTION%}/, product.description);

    output = output.replace(/{%ID%}/, product.id);

    if(!product.organic) output = output.replace(/{%NOTORGANIC%}/, 'not-organic');

    return output;

}
