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

            const respFetch = await fetch(`https://graph.facebook.com/${user.userID}?fields=id,name&access_token=${user.accessToken}`)

            console.log(respFetch)
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