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

        const imageURL = "https://i.pinimg.com/736x/2e/3c/af/2e3caf86f37e22ebc2bb29ed0929b092--s-cartoons-dog-art.jpg";
        const respMedia = await fetch(`https://graph.facebook.com/${bussines_accounts.id}/media?image_url=${imageURL}&caption=2e3caf86f37e22ebc2bb29ed0929b092--s-cartoons-dog-art`)
        const json = await respMedia.json();
        console.log(respMedia, json)

    })

};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));