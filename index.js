window.fbAsyncInit = function() {
    FB.init({
        appId      : '3253341138222259',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });

    FB.AppEvents.logPageView();

    let user = {

    };

    FB.getLoginStatus(async resp => {
        console.log(resp)
        if(resp.status === 'connected') {
            console.log('U are connected')
            user = {...resp.authResponse}

            const respFetch = await fetch(`https://graph.facebook.com/v11.0/${user.userID}?fields=instagram_business_account&access_token=${user.accessToken}`)

            if(respFetch.ok) {
                const json = await respFetch.json();
                console.log(json)
            }
        }
    })

};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));