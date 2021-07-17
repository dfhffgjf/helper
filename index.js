window.fbAsyncInit = function() {
    FB.init({
        appId      : '3253341138222259',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });



    let user = {

    },
    bussines_accounts = {

    }
    ;

    document.querySelector('.login-status').addEventListener("click", () => {
        FB.getLoginStatus(async resp => {
            console.log(resp)
            if(resp.status === 'connected') {
                console.log('U are connected')
                user = {...resp.authResponse}

                const respFetch = await fetch(`https://graph.facebook.com/v11.0/me/accounts?fields=instagram_business_account&access_token=${user.accessToken}`)

                if(respFetch.ok) {
                    const json = await respFetch.json();
                    console.log(json)
                    bussines_accounts = {
                        id: json.data[0].instagram_business_account.id
                    }
                }
            }
        })
    })

    document.querySelector('.log-out').addEventListener("click", () => {
        FB.logout(resp => {
            console.log('Log out')
        })
    })

    document.querySelector('.create-post').addEventListener("click", async () => {
        if(!bussines_accounts?.id) {
            console.log('ERROR BUSSINES ACCTOUNTS')
            return false
        }

        const imageURL = "https://ua.all.biz/img/ua/catalog/more/37396303_kurtka_luxurious_dog.jpeg";
        const respUser = await fetch(`https://graph.facebook.com/v11.0/${bussines_accounts.id}?fields=ig_id,username,profile_picture_url&access_token=${user.accessToken}`);

        if(!respUser.ok) {
            console.log('ERROR GET ID IG')
            return false
        }

        const jsonUser = await respUser.json();

        console.log('THIS JSON USER', respUser, jsonUser)

        const respMedia = await fetch(`https://graph.facebook.com/${bussines_accounts.id}/media?image_url=${imageURL}`, {
            method: "POST"
        })
        const json = await respMedia.json();
        console.log('THIS RESP CREATE', respMedia, json)

    })

};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));