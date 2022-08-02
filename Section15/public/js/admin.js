const deleteProduct = (btn) => {
    // console.log("CLICK");
    // console.log(btn.parentNode.querySelector("[name=productId]").value);
    const productId = btn.parentNode.querySelector("[name=productId]").value
    const csrfToken = btn.parentNode.querySelector("[name=_csrf]").value
    console.log({productId, csrfToken});


}