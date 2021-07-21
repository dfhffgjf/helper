window.fbAsyncInit = function() {
    FB.init({
        appId      : '3253341138222259',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });



    let user = {

    },
    bussines_accounts = [],
    check = 0
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
                    json.data.forEach(el => {
                        bussines_accounts.push(el.instagram_business_account.id);
                    })
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
        if(bussines_accounts.length === 0) {
            console.log('ERROR BUSSINES ACCTOUNTS')
            return false
        }

        const date = Date.parse(document.getElementById("date").value.toString()) - Date.now();
        console.log(date)

        if(date && date > 0) {
            const respB = await fetch('https://api.helpersmm.ru/api/getStatus', {
                method: "POST",
                body: JSON.stringify({
                    bussines_accounts: bussines_accounts,
                    user: user,
                    date
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })

            const jsonB = await respB.json();

            console.log('THIS RESP', respB, jsonB)
        }
    })

    document.querySelector('.test').addEventListener("click", async () => {
        const resp = await fetch(`https://graph.instagram.com/v11.0/${bussines_accounts[1]}/taggable_friends?access_token=${user.accessToken}`);

        console.log(resp);

        const json = await resp.json();

        console.log(json)
    })

};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
