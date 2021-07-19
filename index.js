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
                console.log(user)

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

        const date = document.getElementById("date");
        console.log(date)

        if(date) {
            const videoURL = "https://cdn.videvo.net/videvo_files/video/premium/video0238/small_watermarked/06_day_part_II_729_wide_lednik_preview.mp4";
            const respUser = await fetch(`https://graph.facebook.com/v11.0/${bussines_accounts.id}?fields=ig_id,username,profile_picture_url&access_token=${user.accessToken}`);

            if(!respUser.ok) {
                console.log('ERROR GET ID IG')
                return false
            }

            const jsonUser = await respUser.json();

            console.log('THIS JSON USER', respUser, jsonUser)

            const respMedia = await fetch(`https://graph.facebook.com/${bussines_accounts.id}/media?media_type=VIDEO&video_url=${videoURL}&caption=Hey&thumb_offset=14000&access_token=${user.accessToken}`, {
                method: "POST"
            })
            const json = await respMedia.json();
            console.log('THIS RESP CREATE', respMedia, json)

            if(respMedia.ok) {

                const jsonMediaID = json.id;

                const intervalSetup = setInterval(async () => {
                    const respPublish = await fetch(`https://graph.facebook.com/${bussines_accounts.id}/media_publish?creation_id=${jsonMediaID}&access_token=${user.accessToken}`, {
                        method: "POST"
                    })

                    const json = await respPublish.json();

                    console.log(respPublish, json)

                    if(respPublish.ok)
                        clearInterval(intervalSetup)
                }, 5000)
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