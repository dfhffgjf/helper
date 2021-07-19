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
                console.log(user)

                const respFetch = await fetch(`https://graph.facebook.com/v11.0/me/accounts?fields=instagram_business_account&access_token=${user.accessToken}`)

                if(respFetch.ok) {
                    const json = await respFetch.json();
                    json.data.forEach(el => {
                        bussines_accounts.push(instagram_business_account.id);
                    })
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
        if(!bussines_accounts.length === 0) {
            console.log('ERROR BUSSINES ACCTOUNTS')
            return false
        }

        const date = Date.parse(document.getElementById("date").value.toString()) - Date.now();
        console.log(date)

        if(date && date > 0) {
            const awaitTime = setInterval(async () => {
                const videoURL = "https://cdn.videvo.net/videvo_files/video/premium/video0238/small_watermarked/06_day_part_II_729_wide_lednik_preview.mp4";
                const imageUrl = "https://vistapointe.net/images/catdog-5.jpg";

                bussines_accounts.map(async id => {
                    let respMedia, json;

                    if(check === 0) {
                        respMedia = await fetch(`https://graph.facebook.com/${id}/media?media_type=VIDEO&video_url=${videoURL}&caption=Hey&thumb_offset=14000&access_token=${user.accessToken}`, {
                            method: "POST"
                        })
                        json = await respMedia.json();
                        console.log('THIS RESP CREATE', respMedia, json)
                        check++;
                    } else {
                        respMedia = await fetch(`https://graph.facebook.com/${id}/media?&image_url=${imageUrl}&caption=Hey&access_token=${user.accessToken}`, {
                            method: "POST"
                        })
                        json = await respMedia.json();
                        console.log('THIS RESP CREATE', respMedia, json)
                    }

                    if(respMedia.ok) {

                        const jsonMediaID = json.id;


                        clearInterval(awaitTime)
                        const intervalSetup = setInterval(async () => {
                            const respPublish = await fetch(`https://graph.facebook.com/${id}/media_publish?creation_id=${jsonMediaID}&access_token=${user.accessToken}`, {
                                method: "POST"
                            })

                            const json = await respPublish.json();

                            console.log(respPublish, json)

                            if(respPublish.ok)
                                clearInterval(intervalSetup)
                        }, 5000)

                    }
                })
            }, date)
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