async function renderFaq(){
    const response = await fetch("api/faq.php", {
        method: 'GET',
        body: new FormData(formRegister)
    });
    const faqs = await response.json();
    console.log(user);
    toast(user.type, user.message);

}